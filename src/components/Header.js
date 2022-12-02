import styles from "./Header.module.css";

import Navigator from "components/Navigator";
import { Link } from "react-router-dom";

import headerImg from "../asset/img/header_logo.png";

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link to="/">
          <img src={headerImg} id={styles.headerImg} />
        </Link>
      </div>
      <div className={styles.navi}>
        <Navigator />
      </div>
    </div>
  );
};

export default Header;
