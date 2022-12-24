import ApplyList from "components/ApplyList";
import { useEffect, useState } from "react";
import styles from "./Member.module.css";
const Member = ({ userObj }) => {
    // console.log(userObj);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (userObj?.email === "sjmskm@gmail.com") {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, [userObj]);
    const iamadmin = () => {
        setIsAdmin(true);
    };
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>얼벌 멤버</div>
            <div>
                <button onClick={iamadmin}>임시 관리자 되기 ^&^</button>
            </div>
            {isAdmin && <ApplyList />}
        </div>
    );
};

export default Member;
