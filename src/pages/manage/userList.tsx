import {
    collection,
    doc,
    onSnapshot,
    query,
    updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import styles from "@/styles/UserList.module.css";
import { dbService } from "@/api/fbase";

const UserList = () => {
    const [users, setUsers] = useState<any>([]);

    useEffect(() => {
        const q = query(collection(dbService, "users"));
        onSnapshot(q, (snapshot) => {
            const userArr = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUsers(userArr);
        });
    }, []);

    const onLevelChange = async (e) => {
        const userId = e.target.attributes[0].nodeValue;
        const newLevel = e.target.value;
        if (newLevel === 0) return;
        await updateDoc(doc(dbService, "users", userId), {
            userLevel: newLevel,
        });
    };
    return (
        <>
            <br />
            <div>
                <h2>유저 목록</h2>
            </div>
            <br />
            {/* <div>
                <input type={"text"} />
                <button>검색</button>
            </div> */}
            <div>
                {users.map((v, i) => (
                    <div key={i} className={styles.user}>
                        <span>{i}</span>
                        {/* <p>{v.id}</p> */}
                        <span>{v.userName}</span>
                        <span>{v.userEmail}</span>
                        <select onChange={onLevelChange} data-uid={v.id}>
                            {/* <option>{v.userLevel}</option> */}
                            <option selected={v.userLevel === "회장"}>
                                회장
                            </option>
                            <option selected={v.userLevel === "부회장"}>
                                부회장
                            </option>
                            <option selected={v.userLevel === "총무"}>
                                총무
                            </option>
                            <option selected={v.userLevel === "와꾸대장"}>
                                와꾸대장
                            </option>
                            <option selected={v.userLevel === "홍보실장"}>
                                홍보실장
                            </option>
                            <option selected={v.userLevel === "일반"}>
                                일반
                            </option>
                        </select>
                    </div>
                ))}
            </div>
        </>
    );
};
export default UserList;
