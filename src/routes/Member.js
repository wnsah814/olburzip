import PageTitle from "components/Common/PageTitle";
import styles from "./Member.module.css";
const Member = ({ userObj }) => {
    return (
        <>
            <div className={styles.container}>
                <PageTitle title={"운영진"} />
            </div>
        </>
    );
};

export default Member;
