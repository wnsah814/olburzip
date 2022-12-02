import { Link } from "react-router-dom";
import styles from "./Main.module.css";
import logo from "../asset/img/header_logo.png";
const Main = () => {
  return (
    <div className={styles.wrapper}>
      <img className={styles.logoImg} src={logo} />
      <h1>우주최강 율동패 어리버리</h1>
      <br />
      <Link to="apply">
        <button className={styles.applyBtn}>지원하기</button>
      </Link>
    </div>
  );
};
export default Main;
