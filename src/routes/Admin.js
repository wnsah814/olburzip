import AdminList from "components/Admin/AdminList";
import ApplyList from "components/Admin/ApplyList";
import { dbService } from "fbase";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import styles from "./Admin.module.css";

const Admin = ({ userObj }) => {
    const [admins, setAdmins] = useState([]);
    useEffect(() => {
        const q = query(collection(dbService, "admins"));
        onSnapshot(q, (snapshot) => {
            const adArr = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setAdmins(adArr);
        });
    }, [userObj]);

    return (
        <>
            {Boolean(userObj) ? (
                <>
                    {!userObj.isAd && (
                        <div>관리자만 접근할 수 있는 페이지입니다.</div>
                    )}
                    {userObj.isAd && <ApplyList />}
                    {userObj.isAd && <AdminList adList={admins} />}
                </>
            ) : (
                <div>로그인 후 사용가능합니다.</div>
            )}
        </>
    );
};
export default Admin;
