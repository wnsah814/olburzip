import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRef } from "react";
import styles from "./Apply.module.css";
import { dbService } from "fbase";

const Apply = () => {
    const nameRef = useRef();
    const idRef = useRef();
    const phoneRef = useRef();
    const introRef = useRef();
    const apply = async (e) => {
        const nameData = nameRef.current.value;
        const idData = idRef.current.value;
        const phoneData = phoneRef.current.value;
        const introData = introRef.current.value;

        if (
            nameData === "" ||
            idData === "" ||
            phoneData === "" ||
            introData === ""
        ) {
            alert("모든 칸을 채워주세요");
            return;
        }

        const applyObj = {
            name: nameData,
            studentId: idData,
            phoneNumber: phoneData,
            introduce: introData,
            createdAt: serverTimestamp(),
        };

        await addDoc(collection(dbService, "2023applied"), applyObj);
        nameRef.current.value = "";
        idRef.current.value = "";
        phoneRef.current.value = "";
        introRef.current.value = "";
    };
    return (
        <>
            <div className={styles.container}>
                <div className={styles.formWrapper}>
                    <h2 className={styles.title}>얼벌 지원하기</h2>

                    <div className={styles.form}>
                        <input
                            ref={nameRef}
                            className={styles.input}
                            type="text"
                            placeholder="이름"
                        />
                        <input
                            ref={idRef}
                            className={styles.input}
                            type="number"
                            placeholder="학번"
                        />
                        <input
                            ref={phoneRef}
                            className={styles.input}
                            type="number"
                            placeholder="전화번호(-없이 번호만 입력해주세요)"
                        />
                        <textarea
                            ref={introRef}
                            className={styles.input}
                            placeholder="간략한 자기소개"
                        />

                        <button
                            onClick={apply}
                            className={[styles.input, styles.button].join(" ")}
                        >
                            지원하기
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Apply;
