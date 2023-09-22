import { dbService } from "@/api/fbase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import Button from "../Common/Button";
import Switch from "../Common/Switch";
import registerToXls from "@/api/registerToXls";

interface Student {
  name: string;
  year: number;
  phone: number;
  paid: boolean;
  time: string; // 가입 시기
}

const RegisterList = () => {
  const [aYear, setAYear] = useState<number>(0);
  const [aSem, setASem] = useState<number>(0);
  const [data, setData] = useState<any>([]);
  const [paidCnt, setPaidCnt] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const docRef = await getDoc(doc(dbService, "settings", "apply"));
      if (!docRef.exists()) return;
      setAYear(docRef.data().applyYear);
      setASem(docRef.data().applySemester);
    })();
  }, []);

  useEffect(() => {
    if (aYear === 0) return;
    const q = query(
      collection(dbService, `members`),
      where("year", "==", aYear),
      where("semester", "==", aSem),
      orderBy("name", "asc")
    );
    onSnapshot(q, (snapshot) => {
      let cnt = 0;
      snapshot.forEach((v) => {
        if (v.data().paid === true) {
          cnt++;
        }
      });
      setPaidCnt(cnt);
      const dataArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(dataArr);
    });
  }, [aYear, aSem]);

  const nameRef = useRef<any>();
  const sidRef = useRef<any>();
  const phoneRef = useRef<any>();

  const addMember = async () => {
    if (
      nameRef.current.value === "" ||
      phoneRef.current.value === "" ||
      sidRef.current.value === ""
    ) {
      alert("모든 칸을 채워주세요");
      return;
    }
    const memberObj = {
      name: nameRef.current.value,
      phoneNumber: phoneRef.current.value,
      studentId: sidRef.current.value,
      paid: false,
      year: aYear,
      semester: aSem,
      createdAt: serverTimestamp(),
    };
    await addDoc(collection(dbService, `members`), memberObj);
    nameRef.current.value = "";
    sidRef.current.value = "";
    phoneRef.current.value = "";
  };

  const banMember = async (e: any) => {
    console.log(e);
    console.log(e.target);
    alert(`${e.target.dataset.name}을 추방했습니다!`);
    await deleteDoc(doc(dbService, `members`, e.target.dataset.id));
  };

  const dupAllToNextSem = async () => {
    const docs = await getDocs(
      query(
        collection(dbService, "members"),
        where("year", "==", aYear),
        where("semester", "==", aSem)
      )
    );

    let nY = aYear;
    let nS = aSem;
    if (aSem * 1 === 1) {
      nS = 2;
    } else if (aSem * 1 === 2) {
      nY = aYear + 1;
      nS = 1;
    }

    docs.forEach(async (v) => {
      console.log(v.id, v.data());
      await addDoc(collection(dbService, "members"), {
        ...v.data(),
        year: nY.toString(),
        semester: nS.toString(),
        paid: false,
        createdAt: serverTimestamp(),
      });
    });
  };

  const downloadCsv = () => {
    const txtHeader =
      "Name,Given Name,Group Membership,Phone 1 - type,Phone 1 - Value\n";
    let result = txtHeader;
    for (let i = 0; i < data.length; i++) {
      result += `${
        data[i].studentId.length > 2
          ? `${data[i].studentId.slice(2, 4)}`
          : `${data[i].studentId}`
      } ${data[i].name},${
        data[i].studentId.length > 2
          ? `${data[i].studentId.slice(2, 4)}`
          : `${data[i].studentId}`
      } ${data[i].name},URBUR2023 ::: * myContacts,Mobile,${
        data[i].phoneNumber
      }\n`;
    }
    const downloadLink = document.createElement("a");
    const blob = new Blob([result], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = "contacts.csv";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <>
      {/* <div>
                <h2>어리버리 {year} 명부</h2>
            </div>
            <div>
                년도 설정
                <input type={"number"} placeholder="년도를 입력해주세요" />
                <Button>설정</Button>
            </div>
            <div>
                <input type={"text"} placeholder="이름" />
                <input type={"text"} placeholder="학번" />
                <input type={"text"} placeholder="전화번호" />
                <Button>추가</Button>
            </div> */}
      <div>
        <div>
          <h3 className="title">직접 추가하기</h3>
        </div>
        <div className="row">
          <input ref={nameRef} type={"text"} placeholder="이름" />
          <input ref={sidRef} type={"text"} placeholder="학번" />
          <input ref={phoneRef} type={"text"} placeholder="전화번호" />
          <Button onClick={addMember}>추가</Button>
        </div>
      </div>

      <div className="buttons">
        <Button onClick={downloadCsv}>연락처 다운로드</Button>
        <Button onClick={registerToXls}>명부 다운로드</Button>
        <Button onClick={dupAllToNextSem}>다음학기로 명부 복제</Button>
      </div>
      <div id="list">
        <div id="thead" className="tr">
          <div>순번</div>
          <div>이름</div>
          <div>학번</div>
          <div>연락처</div>
          <div>회비납부({`${paidCnt}/${data.length}`})</div>
          <div>탈퇴</div>
        </div>
        {data.map((v: any, i: number) => (
          <div className="tr" key={i}>
            <div>{i}</div>
            <div>{v.name}</div>
            <div>
              {v.studentId.length > 2 ? v.studentId.slice(2, 4) : v.studentId}
            </div>
            <div>
              {v.phoneNumber.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)}
            </div>
            <div>
              <Switch docId={v.id} isPaid={v.paid} />
            </div>
            <div
              className="delete-button"
              data-id={v.id}
              data-name={v.name}
              onClick={banMember}
            >
              <svg
                data-id={v.id}
                data-name={v.name}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  data-id={v.id}
                  data-name={v.name}
                  d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
      <style jsx>
        {`
          .title {
            margin-bottom: 0.5rem;
          }
          .row {
            display: flex;
          }

          input[type="text"] {
            width: 10rem;
            padding: 0.5rem;
            height: 2.5rem;
            margin-right: 0.5rem;
          }

          #list {
            width: 100%;
            overflow-x: scroll;
          }

          #thead {
            display: flex;
            background-color: var(--color-gray-bright);
            height: 2.5em;
            align-items: center;
            font-weight: bold;
          }

          .tr {
            display: flex;
            align-items: center;
            height: 2.5rem;
          }

          .tr:nth-child(odd) {
            background-color: var(--color-gray-bright);
          }

          .tr div {
            flex: 1;
            flex-wrap: nowrap;
            text-align: center;
          }

          #thead div:nth-child(4),
          .tr div:nth-child(4) {
            flex: 2;
          }

          .buttons {
            display: flex;
          }

          .delete-button:hover {
            cursor: pointer;
          }
        `}
      </style>
    </>
  );
};

export default RegisterList;
