import styles from "./Navigator.module.css";
import { Link } from "react-router-dom";

const Navigator = () => {
    return (
        <nav className={styles.navigation}>
            <div className={styles.nav}>
                <Link to="/music">Music</Link>
            </div>
            <div className={styles.nav}>
                <Link to="/dance">Dance</Link>
            </div>
            <div className={styles.nav}>
                <Link to="/blog">Blog</Link>
            </div>
            <div className={styles.nav}>
                <Link to="/about">About</Link>
            </div>
        </nav>
    );
};
export default Navigator;
