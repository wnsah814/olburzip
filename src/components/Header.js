import styles from "./Header.module.css";

import Navigator from "components/Navigator";
import { Link } from "react-router-dom";
const Header = () => {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <Link to="/">URBUR</Link>
            </div>
            <div className={styles.navi}>
                <Navigator />
            </div>
        </div>
    );
};

export default Header;
