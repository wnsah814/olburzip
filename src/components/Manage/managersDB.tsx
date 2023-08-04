import { dbService } from "@/api/fbase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import Button from "../Common/Button";

interface Manager {
  id: string;
  name: string;
  image: string;
  level: string;
  desc: string;
  phone: string;
  email: string;
  order: number;
}

const ManagersDB = () => {
  const [managers, setManagers] = useState<Manager[]>();
  useEffect(() => {
    const getManagers = async () => {
      const docSnap = await getDocs(collection(dbService, "managers"));

      const mArr = docSnap.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        image: doc.data().image,
        level: doc.data().level,
        desc: doc.data().desc,
        phone: doc.data().phone,
        email: doc.data().email,
        order: doc.data().order,
      }));
      setManagers(mArr);
    };
    getManagers();
  }, []);
  const addManager = async () => {
    const managerObj = {
      name: "이규근",
      image: "/assets/img/1.png",
      level: "회장",
      desc: "안녕하세요, 파인애플 피자를 좋아하는 이규근입니다. 세상 모두가 파인애플 피자를 즐기는 그 날까지 잘 부탁드립니다.",
      phone: "010-2259-8146",
      email: "kyukun333@gmail.com",
      order: 0,
    };
    await addDoc(collection(dbService, "managers"), managerObj);
  };
  return (
    <div>
      <h3>임원 소개 DB</h3>
      <div>
        <form>
          <input type={"text"} placeholder="name" />
          <input type={"text"} placeholder="image" />
          <input type={"text"} placeholder="level" />
          <input type={"text"} placeholder="desc" />
          <input type={"text"} placeholder="phone" />
          <input type={"text"} placeholder="email" />
        </form>
        <Button onClick={addManager}>임원추가</Button>
      </div>
      <div>
        {managers?.map((v) => (
          <div key={v.id}>{v?.name}</div>
        ))}
      </div>
      <style jsx>
        {`
          input {
            padding: 0.5rem;
          }
        `}
      </style>
    </div>
  );
};

export default ManagersDB;
