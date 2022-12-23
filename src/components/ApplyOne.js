import styles from "./ApplyOne.module.css";
const ApplyOne = ({ applyObj }) => {
    return (
        <div className={styles.container}>
            {/* <div>{applyObj.id}</div> */}
            <span>{applyObj?.name}</span>
            <span>{applyObj?.studentId}</span>
            <span>{applyObj?.phoneNumber}</span>
            <span>{applyObj?.introduce}</span>
        </div>
    );
};
export default ApplyOne;
