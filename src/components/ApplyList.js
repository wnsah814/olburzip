import { dbService } from "fbase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import styles from "./ApplyList.module.css";
import ApplyOne from "./ApplyOne";
const ApplyList = () => {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const q = query(
            collection(dbService, "2023applied"),
            orderBy("createdAt", "asc")
        );
        onSnapshot(q, (snapshot) => {
            const mweetArr = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMembers(mweetArr);
            console.log(mweetArr);
        });
    }, []);
    return (
        <div>
            <div className={styles.title}>2023 지원 현황</div>
            <div className={styles.content}>
                <div>이름 학번 연락처 자기소개</div>
                {members.map((v) => (
                    <ApplyOne key={v.id} applyObj={v} />
                ))}
            </div>
        </div>
    );
};
export default ApplyList;
