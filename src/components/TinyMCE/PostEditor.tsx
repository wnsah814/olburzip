import { dbService } from "@/api/fbase";
import TinyMceEditor from "@/components/TinyMCE/TinyMceEditor";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

interface props {
  modeObj: any;
}

const PostEditor = ({ modeObj }: props) => {
  const titleRef = useRef<any>();
  const editorRef = useRef<any>();

  useEffect(() => {
    console.log(modeObj);
  });

  useEffect(() => {
    if (modeObj.title == undefined) return;
    titleRef.current.value = modeObj.title;
  }, [titleRef]);

  const router = useRouter();

  const submitUpdate = async () => {
    if (
      titleRef.current.value === "" ||
      editorRef.current.getContent() === ""
    ) {
      alert("모든 칸을 채워주세요");
      return;
    }

    let data;
    if (modeObj.mode === 1) {
      const blogObj = {
        title: titleRef.current.value,
        content: editorRef.current.getContent(),
        // authorId: "author",
        createdAt: serverTimestamp(),
      };
      data = await addDoc(collection(dbService, "blogs"), blogObj);
    } else if (modeObj.mode === 2) {
      const blogObj = {
        title: titleRef.current.value,
        content: editorRef.current.getContent(),
        lastUpdate: serverTimestamp(),
      };
      await updateDoc(doc(dbService, "blogs", modeObj.blogId), blogObj);
      window.location.reload();
      // modeObj.toggleUpdateMode();
    }
    if (data === undefined) return;
    router.push(`/blog/${data.id}`);
  };

  return (
    <>
      <div className={"header"}>
        <input
          className={"title"}
          ref={titleRef}
          type={"text"}
          placeholder="제목을 입력해주세요"
        />
        <button className={"button"} onClick={submitUpdate}>
          저장
        </button>
      </div>
      <TinyMceEditor editorRef={editorRef} originalContents={modeObj.content} />
      <style jsx>
        {`
          .header {
            display: flex;
          }

          .title {
            border: 2px solid #eeeeee;
            border-radius: 0.5rem;
            flex: 1;
            padding: 1rem;
            margin-bottom: 0.5rem;
          }

          .button {
            background-color: #562b08;
            border: none;
            border-radius: 0.5rem;

            color: white;
            margin-left: 0.5rem;
            width: 10rem;
            height: 3rem;
            padding: 1rem;
          }
        `}
      </style>
    </>
  );
};
export default PostEditor;
