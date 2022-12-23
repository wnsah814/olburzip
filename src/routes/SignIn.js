import { Link } from "react-router-dom";
import styles from "./SignIn.module.css";
const SignIn = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>어리버리 로그인</div>
            <div className={styles.form}>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="email"
                />
                <input
                    className={styles.input}
                    type="password"
                    placeholder="password"
                />
                <button className={styles.btn} type="submit">
                    입장
                </button>
            </div>

            <div className={styles.googleForm}>
                <button className={styles.btn}>Sign with Google</button>
            </div>

            <div className={styles.signUpForm}>
                <Link to="/signup">
                    <button className={styles.btn}>회원가입 하기</button>
                </Link>
            </div>
        </div>
    );
};

export default SignIn;