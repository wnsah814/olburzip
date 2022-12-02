import styles from "./Apply.module.css";

const Apply = () => {
  const apply = (e) => {
    e.preventDefault();
    alert("신청기간이 아닙니다");
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <h2 className={styles.title}>얼벌 지원하기</h2>

          <form className={styles.form}>
            <input className={styles.input} type="text" placeholder="이름" />
            <input className={styles.input} type="number" placeholder="학번" />
            <input
              className={styles.input}
              type="text"
              placeholder="간략한 자기소개"
            />

            <button
              onClick={apply}
              className={[styles.input, styles.button].join(" ")}
            >
              지원하기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Apply;
