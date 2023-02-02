import { dbService } from "@/api/fbase";
import { useUser } from "@/store/useUser";
import styles from "@/styles/Profile.module.css";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const Profile = () => {
    const { data } = useUser();
    console.log(data);
    const [level, setLevel] = useState<number>(0);

    const levelArr = [
        "일반",
        "얼벌인",
        "관리자",
        "홍보실장",
        "와꾸대장",
        "총무",
        "부회장",
        "회장",
    ];

    const requestLevelUp = async () => {
        if (typeof data?.uid !== "undefined") {
            const reqObj = {
                createdAt: serverTimestamp(),
                name: data.displayName,
            };
            await setDoc(doc(dbService, "levelRequests", data?.uid), reqObj);
            alert("얼벌인을 신청했습니다. 관리자의 승인을 기다려주세요.");
        }
    };

    useEffect(() => {
        const getUserData = async () => {
            if (typeof data?.uid !== "undefined") {
                const docSnap = await getDoc(doc(dbService, "users", data.uid));
                if (docSnap.exists()) {
                    console.log(docSnap.data().userLevel);
                    setLevel(parseInt(docSnap.data().userLevel));
                }
            }
        };
        getUserData();
    }, [data]);

    return (
        <div className={styles.wrapper}>
            {/* <div className={styles.header}>
                <h2>내 프로필</h2>
            </div> */}

            <div
                data-aos="fade-up"
                data-aos-delay="600"
                className={styles.card}
            >
                <div className={styles.dot}></div>

                <div className={styles.imgContainer}>
                    <img
                        className={styles.profileImg}
                        src={data?.photoURL}
                        alt="profile_img"
                    />
                </div>

                <div>
                    <div className={styles.desc}>
                        <span className={styles.title}>UID</span>
                        <span>{data?.uid}</span>
                    </div>
                    <div className={styles.desc}>
                        <span className={styles.title}>이름</span>
                        <span>{data?.displayName}</span>
                    </div>
                    <div className={styles.desc}>
                        <span className={styles.title}>등급</span>
                        <span>
                            {levelArr[level]}
                            {level === 0 && (
                                <span
                                    className={styles.applyBtn}
                                    onClick={requestLevelUp}
                                >
                                    얼벌인 신청
                                </span>
                            )}
                        </span>
                    </div>
                </div>

                <div>
                    <img
                        id={styles.backLogo}
                        src="/assets/img/logo.svg"
                        alt="logo"
                    />
                </div>
            </div>
        </div>
    );
};

export default Profile;
