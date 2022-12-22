import AppRouter from "components/AppRouter";
import styles from "./Contents.module.css";
const Contents = ({ userObj }) => {
    return (
        <div className={styles.container}>
            <AppRouter userObj={userObj} />
        </div>
    );
};

export default Contents;
