import styles from "./Navigator.module.css";
import { Link } from "react-router-dom";

const Navigator = () => {
  return (
    <nav className={styles.navigation}>
      <Link to="/music">
        <div className={styles.nav}>Music</div>
      </Link>
      <Link to="/dance">
        <div className={styles.nav}>Dance</div>
      </Link>
      <Link to="/blog">
        <div className={styles.nav}>Blog</div>
      </Link>
      <Link to="/about">
        <div className={styles.nav}>About</div>
      </Link>
    </nav>
  );
};
export default Navigator;
