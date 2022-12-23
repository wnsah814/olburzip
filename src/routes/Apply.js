import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRef } from "react";
import styles from "./Apply.module.css";
import { dbService } from "fbase";

const Apply = () => {
    const nameRef = useRef();
    const idRef = useRef();
    const introRef = useRef();
    const apply = async (e) => {
        console.log("applying");
        const nameData = nameRef.current.value;
        const idData = idRef.current.value;
        const introData = introRef.current.value;

        console.log("log", nameData, idData, introData);
        e.preventDefault();

        const applyObj = {
            name: nameData,
            studentId: idData,
            introduce: introData,
            createdAt: serverTimestamp(),
        };
        console.log(applyObj);
        const docRef = await addDoc(
            collection(dbService, "2022applied"),
            applyObj
        );
        console.log(docRef.id);
    };
    return (
        <div className={styles.wrapper}>
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
        </div>
    );
};
export default Apply;
