import { dbService } from "@/api/fbase";
import { deleteDoc, doc, getDoc } from "firebase/firestore";

interface Props {
  aid: string;
}

const ApplyListDelete = ({ aid }: Props) => {
  const deleteApply = async () => {
    const res = confirm("정말 삭제하겠습니까?");
    if (res) {
      await deleteDoc(doc(dbService, "applies", aid));
    }
    console.log(aid);
  };
  return (
    <>
      <div className="button" onClick={deleteApply}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
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
export default ApplyListDelete;
