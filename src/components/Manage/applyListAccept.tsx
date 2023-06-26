import { dbService } from "@/api/fbase";
import {
    deleteDoc,
    doc,
    serverTimestamp,
    setDoc,
    updateDoc,
} from "firebase/firestore";

interface Props {
    data: any;
}

const ApplyListAccept = ({ data }: Props) => {
    const acceptApply = async () => {
        const res = confirm("수락하겠습니까?");
        if (res) {
            updateDoc(doc(dbService, "2023applied", data.id), {
                allowed: true,
            });
            setDoc(doc(dbService, "2023registered", data.id), {
                name: data.name,
                studentId: data.studentId,
                phoneNumber: data.phoneNumber,
                paid: false,
                createdAt: serverTimestamp(),
            });
        }
    };
    return (
        <>
            <div className="button" onClick={acceptApply}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                >
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                </svg>
            </div>
            <style jsx>{`
                .button {
                    cursor: pointer;
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                }
            `}</style>
        </>
    );
};
export default ApplyListAccept;
