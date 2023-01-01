import { dbService } from "fbase";
import {
    collection,
    doc,
    onSnapshot,
    query,
    updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import styles from "./UserList.module.css";
const UserList = () => {
    const [users, setUsers] = useState([]);

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
        // console.log(newLevel);
        if (newLevel === 0) return;
        await updateDoc(doc(dbService, "users", userId), {
            userLevel: newLevel,
        });
    };
    return (
        <>
            <div>
                <h2>유저 목록</h2>
            </div>
            {/* <div>
                <input type={"text"} />
                <button>검색</button>
            </div> */}
            <div>
                {users.map((v, i) => (
                    <div key={i} className={styles.user}>
                        <p>{i}</p>
                        {/* <p>{v.id}</p> */}
                        <p>{v.userName}</p>
                        <p>{v.userEmail}</p>
                        <select onChange={onLevelChange} data-uid={v.id}>
                            <option>{v.userLevel}</option>
                            <option>회장</option>
                            <option>부회장</option>
                            <option>총무</option>
                            <option>와꾸대장</option>
                            <option>홍보실장</option>
                            <option>일반</option>
                        </select>
                    </div>
                ))}
            </div>
        </>
    );
};
export default UserList;
