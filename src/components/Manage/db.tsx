import { dbService } from "@/api/fbase";
import Button from "@/components/Common/Button";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import ManagersDB from "./managersDB";

const DB = () => {
    const yearRef = useRef<any>();
    const allowRef = useRef<any>();

    const saveSettings = async () => {
        const isAllow = allowRef.current.value === "true" ? true : false;

        const applyObj = {
            applyYear: yearRef.current.value,
            applyAllow: isAllow,
        };

        await setDoc(doc(dbService, "settings", "apply"), applyObj);
        alert("설정을 저장했습니다.");
    };

    useEffect(() => {
        const getSettings = async () => {
            const docRef = await getDoc(doc(dbService, "settings", "apply"));
            const settings = docRef.data();
            console.log(settings?.applyYear);
            yearRef.current.value = settings?.applyYear;
            allowRef.current.value = settings?.applyAllow ? "true" : "false";
        };
        getSettings();
    }, []);
    return (
        <div>
            <div>
                <h2>DB관리</h2>
            </div>
            <div className="container">
                <div>
                    <h3>지원DB</h3>
                    <Button onClick={saveSettings}>저장</Button>
                </div>

                <div className="part">
                    <label htmlFor="applyYear">지원 시기</label>
                    <input
                        ref={yearRef}
                        id="applyYear"
                        type={"number"}
                        placeholder="년도를 입력해주세요"
                    />
                </div>

                <div className="part">
                    <label htmlFor="applyAllow">지원 허락</label>
                    <select ref={allowRef} name="" id="applyAllow">
                        <option value={"true"}>true</option>
                        <option value={"false"}>false</option>
                    </select>
                </div>
            </div>

            <div className="container">
                <ManagersDB />
            </div>

            <style jsx>
                {`
                    label {
                        font-size: 1rem;
                        margin-right: 1rem;
                    }

                    .container {
                        padding: 1rem;
                        box-shadow: 0 2px 4px #aaa;
                        margin: 1rem 0;
                    }

                    .part {
                        margin-bottom: 1rem;
                    }

                    input,
                    select {
                        padding: 0.3rem;
                    }

                    button {
                        display: flex;
                        padding: 0.7rem;
                        border-radius: 0.3rem;
                        border: none;
                        background-color: var(--color-brown);
                        color: var(--color-white);
                        margin-bottom: 1rem;
                    }
                `}
            </style>
        </div>
    );
};

export default DB;
