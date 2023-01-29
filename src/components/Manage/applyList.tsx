import { dbService } from "@/api/fbase";
import {
    collection,
    doc,
    getDoc,
    onSnapshot,
    orderBy,
    query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import styles from "@/styles/ApplyList.module.css";
import applyToXlsx from "@/api/applyToXls";

const ApplyList = () => {
    const [members, setMembers] = useState<any>([]);
    const [year, setYear] = useState<number>(new Date().getFullYear());

    useEffect(() => {
        const q = query(
            collection(dbService, `${year}applied`),
            orderBy("createdAt", "asc")
        );
        onSnapshot(q, (snapshot) => {
            const memArr = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMembers(memArr);
        });
    }, [year]);

    useEffect(() => {
        (async () => {
            const docRef = await getDoc(doc(dbService, "settings", "apply"));
            if (!docRef.exists()) return;
            setYear(docRef.data().applyYear);
        })();
    }, []);
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <h2>{year} 지원 현황</h2>
            </div>
            <div>
                <button className="xlsxBtn" onClick={applyToXlsx}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        <path d="M5.884 6.68a.5.5 0 1 0-.768.64L7.349 10l-2.233 2.68a.5.5 0 0 0 .768.64L8 10.781l2.116 2.54a.5.5 0 0 0 .768-.641L8.651 10l2.233-2.68a.5.5 0 0 0-.768-.64L8 9.219l-2.116-2.54z" />
                        <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                    </svg>
                    <span>Download to xlsx</span>
                </button>
            </div>
            <div className={styles.content}>
                {members.map((v: any, i: number) => (
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
                            <div className={styles.card_column}>
                                <span className={styles.card_label}>
                                    연락처
                                </span>
                                <span className={styles.card_content}>
                                    {v?.phoneNumber}
                                </span>
                            </div>
                            <div className={styles.card_column}>
                                <span className={styles.card_label}>MBTI</span>
                                <span className={styles.card_content}>
                                    {v?.mbti}
                                </span>
                            </div>
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
            <style jsx>
                {`
                    .xlsxBtn {
                        display: flex;
                        padding: 0.7rem;
                        border-radius: 0.3rem;
                        border: none;
                        background-color: var(--color-brown);
                        color: var(--color-white);
                        margin-bottom: 1rem;
                    }

                    .xlsxBtn:hover {
                        cursor: pointer;
                    }

                    .xlsxBtn > span {
                        margin-left: 0.1rem;
                    }
                `}
            </style>
        </div>
    );
};

export default ApplyList;
