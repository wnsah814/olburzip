import { dbService } from "@/api/fbase";
import Seo from "@/components/Base/Seo";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useRef } from "react";
const PostEditor = dynamic(() => import("@/components/ToastUI/Editor"), {
    ssr: false,
});

const NewBlogEditor = () => {
    const titleRef = useRef<any>();
    const editorRef = useRef<any>();

    const router = useRouter();
    const submitUpdate = async () => {
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
            createdAt: serverTimestamp(),
        };
        const data = await addDoc(collection(dbService, "blogs"), blogObj);
        router.push(`/blog/${data.id}`);
    };

    return (
        <>
            <Seo title="New Blog" />
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
            <PostEditor editorRef={editorRef} />
            <style jsx>
                {`
                    .header {
                        display: flex;
                    }

                    .title {
                        border: 1px solid #7c8fc7;
                        flex: 1;
                        padding: 1rem;
                        margin-bottom: 0.5rem;
                    }

                    .button {
                        background-color: #562b08;
                        border: none;
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
export default NewBlogEditor;
