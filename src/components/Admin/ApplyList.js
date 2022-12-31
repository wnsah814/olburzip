import { dbService } from "fbase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import styles from "./ApplyList.module.css";

const ApplyList = () => {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const q = query(
            collection(dbService, "2023applied"),
            orderBy("createdAt", "asc")
        );
        onSnapshot(q, (snapshot) => {
            const memArr = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMembers(memArr);
        });
    }, []);
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <h2>2023 지원 현황</h2>
            </div>
            <div className={styles.content}>
                <div className={styles.container}>
                    <p className={styles.col}>이름</p>
                    <p className={styles.col}>학번</p>
                    <p className={styles.col}>연락처</p>
                    <p className={styles.introduce}>자기소개</p>
                </div>
                <div>
                    {members.map((v, i) => (
                        <div key={i} className={styles.container}>
                            <p className={styles.col}>{v?.name}</p>
                            <p className={styles.col}>{v?.studentId}</p>
                            <p className={styles.col}>{v?.phoneNumber}</p>
                            <p className={styles.introduce}>{v?.introduce}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default ApplyList;
