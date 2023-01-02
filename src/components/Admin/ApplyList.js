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
                {members.map((v, i) => (
                    <div key={i} className={styles.card}>
                        <div className={styles.card_item}>
                            <div className={styles.card_column}>
                                <span className={styles.card_label}>이름</span>
                                <span className={styles.card_content}>
                                    {v?.name}
                                </span>
                            </div>
                            <div className={styles.card_column}>
                                <span className={styles.card_label}>학번</span>
                                <span className={styles.card_content}>
                                    {v?.studentId}
                                </span>
                            </div>
                        </div>
                        <div className={styles.card_item}>
                            <span className={styles.card_label}>연락처</span>
                            <span className={styles.card_content}>
                                {v?.phoneNumber}
                            </span>
                        </div>
                        <div className={styles.card_item}>
                            <span className={styles.card_label}>자기소개</span>
                            <span
                                className={`${styles.introduce} ${styles.card_content}`}
                            >
                                {v?.introduce}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default ApplyList;
