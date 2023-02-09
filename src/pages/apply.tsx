import { dbService } from "@/api/fbase";
import {
    addDoc,
    collection,
    doc,
    getDoc,
    serverTimestamp,
} from "firebase/firestore";
import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import styles from "@/styles/Apply.module.css";
import { useRouter } from "next/router";
import Seo from "@/components/Base/Seo";

const Apply: NextPage = () => {
    const nameRef = useRef<any>();
    const idRef = useRef<any>();
    const phoneRef = useRef<any>();
    const mbtiRef = useRef<any>();
    const introRef = useRef<any>();

    const [allow, setAllow] = useState<boolean>(true);
    const router = useRouter();
    useEffect(() => {
        const getAllow = async () => {
            const docSnap = await getDoc(doc(dbService, "settings", "apply"));
            if (docSnap.exists()) {
                setAllow(docSnap.data().applyAllow);
            }
        };
        getAllow();
    }, []);
    const apply = async (e: any) => {
        e.preventDefault();
        const nameData = nameRef.current.value;
        const idData = idRef.current.value;
        const origianlPhoneData = phoneRef.current.value;
        const phoneData = origianlPhoneData.replace(/-/gi, "");
        // console.log(origianlPhoneData, phoneData);
        const introData = introRef.current.value;
        const mbtiData = mbtiRef.current.value;

        if (
            nameData === "" ||
            idData === "" ||
            phoneData === "" ||
            mbtiData === "" ||
            introData === ""
        ) {
            alert("모든 칸을 채워주세요");
            return;
        }

        const applyObj = {
            name: nameData,
            studentId: idData,
            phoneNumber: phoneData,
            mbti: mbtiData,
            introduce: introData,
            createdAt: serverTimestamp(),
        };
        const docRef = await getDoc(doc(dbService, "settings", "apply"));
        if (!docRef.exists()) return;
        const settings = docRef.data();
        await addDoc(
            collection(dbService, `${settings.applyYear}applied`),
            applyObj
        );
        nameRef.current.value = "";
        idRef.current.value = "";
        phoneRef.current.value = "";
        mbtiRef.current.value = "";
        introRef.current.value = "";
        alert("제출되었습니다!");
        router.push("/");
    };
    return (
        <>
            <Seo title="Apply" />
            <div className={styles.container}>
                <div className={styles.formWrapper}>
                    <h2 className={styles.title}>🐝얼벌 지원하기🐝</h2>
                    {allow ? (
                        <form className={styles.form}>
                            <div className="part">
                                <label htmlFor="name">이름</label>
                                <input
                                    id="name"
                                    ref={nameRef}
                                    className={styles.input}
                                    type="text"
                                    placeholder="이름을 입력해주세요"
                                />
                            </div>
                            <div className="part">
                                <label htmlFor="sid">
                                    학번 (ex.2023123456)
                                </label>
                                <input
                                    id="sid"
                                    ref={idRef}
                                    className={styles.input}
                                    type="number"
                                    placeholder="학번을 입력해주세요"
                                />
                            </div>
                            <div className="part">
                                <label htmlFor="phone">전화번호</label>
                                <input
                                    id="phone"
                                    ref={phoneRef}
                                    className={styles.input}
                                    type="tel"
                                    // pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                                    placeholder="전화번호를 입력해주세요"
                                />
                            </div>
                            <div className="part">
                                <label htmlFor="mbti">MBTI</label>
                                <input
                                    id="mbti"
                                    ref={mbtiRef}
                                    className={styles.input}
                                    type="text"
                                    placeholder="MBTI가 뭐예요~?"
                                />
                            </div>

                            <div className="part">
                                <label htmlFor={styles.introInput}>
                                    자기소개 / 각오
                                </label>
                                <textarea
                                    ref={introRef}
                                    id={styles.introInput}
                                    className={styles.input}
                                    placeholder="간략한 자기소개 또는 각오를 보여주세요!"
                                />
                            </div>

                            <button
                                onClick={apply}
                                className={[styles.input, styles.button].join(
                                    " "
                                )}
                            >
                                지원하기
                            </button>
                        </form>
                    ) : (
                        <div className="warning">
                            <span>아쉽지만 지금은 신청 기간이 아닙니다 !</span>
                        </div>
                    )}
                </div>
            </div>
            <style jsx>
                {`
                    .warning {
                        text-align: center;
                        color: var(--color-red);
                        margin-bottom: 1rem;
                    }
                    .part {
                        margin-bottom: 1rem;
                    }
                `}
            </style>
        </>
    );
};

export default Apply;
