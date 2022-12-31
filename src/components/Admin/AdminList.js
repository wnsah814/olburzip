import { dbService } from "fbase";
import {
    addDoc,
    collection,
    doc,
    serverTimestamp,
    setDoc,
} from "firebase/firestore";
import { useRef } from "react";
import styles from "./AdminList.module.css";
const AdminList = ({ adList }) => {
    const nameRef = useRef();
    const emailRef = useRef();
    const yearRef = useRef();
    const levelRef = useRef();

    const onSubmit = async () => {
        const nameData = nameRef.current.value;
        const emailData = emailRef.current.value;
        const yearData = yearRef.current.value;
        const levelData = levelRef.current.value;
        if (
            nameData === "" ||
            emailData === "" ||
            yearData === "" ||
            levelData === ""
        ) {
            alert("모든 칸을 채워주세요");
            return;
        }

        const adminObj = {
            name: nameData,
            email: emailData,
            year: yearData,
            level: levelData,
            createdAt: serverTimestamp(),
        };

        await addDoc(collection(dbService, "admins"), adminObj);

        // await setDoc(doc(dbService, "user", userId), {
        //     userLevel: levelData,
        // });

        nameRef.current.value = "";
        emailRef.current.value = "";
        yearRef.current.value = "";
        levelRef.current.value = "회장";
    };
    return (
        <div className={styles.container}>
            <h2>관리자 목록</h2>
            <div className={styles.header}>
                <div className={styles.tr}>
                    <p className={styles.col}>이름</p>
                    <p className={styles.col}>이메일</p>
                    <p className={styles.col}>기타</p>
                </div>
            </div>
            <div className={styles.body}>
                {adList.map((v, i) => (
                    <div className={styles.tr} key={i}>
                        <p className={styles.col}>{v.name}</p>
                        <p className={styles.col}>{v.email}</p>
                        <p className={styles.col}>{v.level}</p>
                    </div>
                ))}
            </div>

            <div className={styles.form}>
                <input
                    className={styles.input}
                    ref={nameRef}
                    type="text"
                    placeholder="이름"
                />
                <input
                    className={styles.input}
                    ref={emailRef}
                    type="text"
                    placeholder="이메일"
                />
                <input
                    className={styles.input}
                    ref={yearRef}
                    type="number"
                    placeholder="기수"
                />
                <select className={styles.input} ref={levelRef}>
                    <option>회장</option>
                    <option>부회장</option>
                    <option>총무</option>
                    <option>와꾸대장</option>
                    <option>홍보실장</option>
                </select>
                <button className={styles.button} onClick={onSubmit}>
                    추가
                </button>
            </div>
        </div>
    );
};

export default AdminList;
