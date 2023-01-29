import { auth, dbService } from "@/api/fbase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import styles from "@/styles/SignBtn.module.css";
import { useRouter } from "next/router";
import { ClickEvent } from "@/types";
import { useUser } from "@/store/useUser";

const SignBtn = () => {
    const { data } = useUser();
    const router = useRouter();

    const insertUser = async (
        userEmail: string,
        userId: string,
        userName: string
    ) => {
        const newUserObj = {
            userEmail,
            userName,
            userLevel: 0,
            createdAt: serverTimestamp(),
        };
        await setDoc(doc(dbService, "users", userId), newUserObj);
    };

    const onSocialClick = async (event: ClickEvent) => {
        console.log(typeof event);
        const data = await signInWithPopup(auth, new GoogleAuthProvider());
        const user = data.user;
        const docSnap = await getDoc(doc(dbService, "users", user.uid));

        if (!docSnap.exists()) {
            if (
                typeof user.email === "string" &&
                typeof user.displayName === "string"
            ) {
                insertUser(user.email, user.uid, user.displayName);
            }
        }
    };

    const onSignOut = () => {
        auth.signOut();
        alert("로그아웃 하셨습니다");
        router.push("/");
    };

    return (
        <>
            {!data?.isSignedIn ? (
                <button
                    className={styles.mobileSignBtn}
                    onClick={onSocialClick}
                    name="google"
                >
                    <svg
                        className={styles.mobileSignSvg}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z"
                        />
                        <path
                            fillRule="evenodd"
                            d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
                        />
                    </svg>
                </button>
            ) : (
                <button className={styles.mobileSignBtn} onClick={onSignOut}>
                    <svg
                        className={styles.mobileSignSvg}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                        />
                        <path
                            fillRule="evenodd"
                            d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                        />
                    </svg>
                </button>
            )}
        </>
    );
};

export default SignBtn;
