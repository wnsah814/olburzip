import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/i18n/ko-kr";

import { useEffect, useRef } from "react";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { dbService } from "fbase";
// import { useNavigate } from "react-router-dom";

import styles from "./Updator.module.css";
const Updator = ({ articleId, originalTitle, originalContent, updateThis }) => {
  const titleRef = useRef();
  const editorRef = useRef();
  // const navigator = useNavigate();

  useEffect(() => {
    titleRef.current.value = originalTitle;
  }, []);

  const onSubmit = async () => {
    if (
      titleRef.current.value === "" ||
      editorRef.current.getInstance().getHTML() === "<p><br></p>"
    ) {
      alert("모든 칸을 채워주세요");
      return;
    }
    const blogObj = {
      title: titleRef.current.value,
      content: editorRef.current.getInstance().getMarkdown(),
      lastUpdate: serverTimestamp(),
    };
    await updateDoc(doc(dbService, "blogs", articleId), blogObj);
    // navigator(`/blog/${articleId}`);
    // navigator(`/blog`);
    // updateThis();
    window.location.reload();
  };
  return (
    <>
      <div className={styles.header}>
        <input
          className={styles.title}
          ref={titleRef}
          type={"text"}
          placeholder="제목을 입력해주세요"
        />
        <button className={styles.button} onClick={onSubmit}>
          저장
        </button>
      </div>
      <Editor
        ref={editorRef}
        initialValue={originalContent}
        previewStyle="vertical"
        height="600px"
        initialEditType="markdown"
        hideModeSwitch={true}
        useCommandShortcut={false}
        plugins={[colorSyntax]}
        language="ko-KR"
      />
    </>
  );
};
export default Updator;
