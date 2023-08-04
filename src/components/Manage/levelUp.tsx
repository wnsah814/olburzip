import { dbService } from "@/api/fbase";
import { ClickEvent } from "@/types";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Button from "../Common/Button";
import styles from "./LevelUp.module.css";

const LevelUp = () => {
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    const q = query(
      collection(dbService, "levelRequests"),
      orderBy("createdAt")
    );
    onSnapshot(q, (snap) => {
      const userArr = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userArr);
      console.log(userArr);
    });
  }, []);

  const accept = async (id: string, e: ClickEvent) => {
    await updateDoc(doc(dbService, "users", id), { userLevel: 1 });
    await deleteDoc(doc(dbService, "levelRequests", id));
    alert("정상적으로 처리되었습니다");
  };

  return (
    <>
      <div>
        <h2>등업 신청</h2>
      </div>
      <div>
        {users.length === 0 ? (
          <p>등업 신청 목록이 비어있습니다.</p>
        ) : (
          users.map((v: any, i: number) => (
            <div className={styles.card} key={i}>
              <div>
                <span className={styles.desc}>UID</span>
                <span>{v.id}</span>
              </div>
              <div>
                <span className={styles.desc}>이름</span>
                <span>{v.name}</span>
              </div>
              <div className={styles.accBtn}>
                <Button onClick={(e) => accept(v.id, e)}>승인</Button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default LevelUp;
