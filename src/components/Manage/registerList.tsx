import { dbService } from "@/api/fbase";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
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
    const [year, setYear] = useState<number>(2023);
    const [data, setData] = useState<any>([]);
    const [paidCnt, setPaidCnt] = useState<number>(0);
    useEffect(() => {
        const q = query(
            collection(dbService, "2023registered"),
            orderBy("name", "asc")
        );
        onSnapshot(q, (snapshot) => {
            let cnt = 0;
            snapshot.forEach((v) => {
                if (v.data().paid === true) {
                    cnt++;
                }
            });
            console.log(cnt);
            setPaidCnt(cnt);
            const dataArr = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setData(dataArr);
        });
    }, []);

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
            createdAt: serverTimestamp(),
        };
        await addDoc(collection(dbService, "2023registered"), memberObj);
        nameRef.current.value = "";
        sidRef.current.value = "";
        phoneRef.current.value = "";
    };

    const banMember = async (e: any) => {
        console.log(e);
        alert(`${e.target.dataset.name}을 추방했습니다!`);
        await deleteDoc(doc(dbService, "2023registered", e.target.dataset.id));
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
        console.log(result);
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
                    <input
                        ref={phoneRef}
                        type={"text"}
                        placeholder="전화번호"
                    />
                    <Button onClick={addMember}>추가</Button>
                </div>
            </div>

            <div className="buttons">
                <Button onClick={downloadCsv}>Download contacts.csv</Button>
                <Button onClick={registerToXls}>Download urbur2023.xlsx</Button>
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
                            {v.studentId.length > 2
                                ? v.studentId.slice(2, 4)
                                : v.studentId}
                        </div>
                        <div>
                            {v.phoneNumber.replace(
                                /^(\d{2,3})(\d{3,4})(\d{4})$/,
                                `$1-$2-$3`
                            )}
                        </div>
                        <div>
                            <Switch docId={v.id} isPaid={v.paid} />
                        </div>
                        <div onClick={banMember}>
                            <i id="deleteIcon">
                                <svg
                                    data-id={v.id}
                                    data-name={v.name}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                </svg>
                            </i>
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

                    #deleteIcon:hover {
                        cursor: pointer;
                    }
                `}
            </style>
        </>
    );
};

export default RegisterList;
