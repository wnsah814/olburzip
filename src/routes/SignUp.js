import styles from "./SignUp.module.css";
const SignUp = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>어리버리 회원가입</div>
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
                    가입하기
                </button>
            </div>
            <div className={styles.googleForm}>
                <button className={styles.btn}>Sign with Google</button>
            </div>
        </div>
    );
};

export default SignUp;
