import { useState } from "react";
import styles from "@/styles/ManagePage.module.css";
import UserList from "./userList";
import ApplyList from "./applyList";
import DB from "./db";
import LevelUp from "./levelUp";
import RegisterList from "./registerList";

const ManagePage = () => {
    const [menu, setMenu] = useState<number>(0);

    const obj: any = {
        0: <UserList />,
        1: <ApplyList />,
        2: <RegisterList />,
        3: <DB />,
        4: <LevelUp />,
    };

    const chgMenu = (e: any) => {
        setMenu(e.target.dataset.n);
        const menuArr = document.querySelectorAll(`.${styles.menu}`);
        menuArr.forEach((v) => (v.className = styles.menu));
        e.target.className = `${styles.menu} ${styles.active}`;
    };
    return (
        <div className={styles.wrapper}>
            <div>
                <div className={styles.menus}>
                    <div
                        className={`${styles.menu} ${styles.active}`}
                        data-n={0}
                        onClick={chgMenu}
                    >
                        유저 목록
                    </div>
                    <div className={styles.menu} data-n={1} onClick={chgMenu}>
                        지원 목록
                    </div>
                    <div className={styles.menu} data-n={2} onClick={chgMenu}>
                        명부 관리
                    </div>
                    <div className={styles.menu} data-n={3} onClick={chgMenu}>
                        DB 관리
                    </div>
                    <div className={styles.menu} data-n={4} onClick={chgMenu}>
                        등업 신청
                    </div>
                </div>
            </div>
            <div>{obj[menu]}</div>
        </div>
    );
};

export default ManagePage;
