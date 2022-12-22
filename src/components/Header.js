import styles from "./Header.module.css";

import Navigator from "components/Navigator";
import { Link } from "react-router-dom";

// import headerImg from "../asset/img/header_logo.png";
import headerImg from "asset/img/logo.svg";

const Header = ({ userObj, isSignedIn }) => {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <Link to="/">
                    <img src={headerImg} id={styles.headerImg} alt="logo" />
                </Link>
            </div>
            <div className={styles.navi}>
                <Navigator userObj={userObj} isSignedIn={isSignedIn} />
            </div>
        </div>
    );
};

export default Header;
