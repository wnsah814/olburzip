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

    const onLevelChange = async (e: any) => {
        const userId = e.target.attributes[0].nodeValue;
        const newLevel = e.target.value;
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
            <br />
            {/* <div>
                <input type={"text"} />
                <button>검색</button>
            </div> */}
            <div>
                {users.map((v: any, i: number) => (
                    <div key={i} className={styles.user}>
                        <span>{i}</span>
                        <span>{v.userName}</span>
                        <span>{v.userEmail}</span>
                        <select onChange={onLevelChange} data-uid={v.id}>
                            <option value={7} selected={v.userLevel === 7}>
                                회장
                            </option>
                            <option value={6} selected={v.userLevel === 6}>
                                부회장
                            </option>
                            <option value={5} selected={v.userLevel === 5}>
                                총무
                            </option>
                            <option value={4} selected={v.userLevel === 4}>
                                와꾸대장
                            </option>
                            <option value={3} selected={v.userLevel === 3}>
                                홍보실장
                            </option>
                            <option value={2} selected={v.userLevel === 2}>
                                관리자
                            </option>
                            <option value={1} selected={v.userLevel === 1}>
                                얼벌
                            </option>
                            <option value={0} selected={v.userLevel === 0}>
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
