import { dbService } from "@/api/fbase";
import {
    addDoc,
    collection,
    doc,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
const PostEditor = dynamic(() => import("@/components/ToastUI/Editor"), {
    ssr: false,
});

interface Prop {
    blogId: any;
    oriTitle: any;
    oriContent: any;
    updateThis: any;
}

const BlogEditor = ({ blogId, oriTitle, oriContent, updateThis }: Prop) => {
    const titleRef = useRef<any>();
    const editorRef = useRef<any>();

    useEffect(() => {
        titleRef.current.value = oriTitle;
    }, [oriTitle]);

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
            lastUpdate: serverTimestamp(),
        };
        await updateDoc(doc(dbService, "blogs", blogId), blogObj);
        window.location.reload();
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
            <PostEditor editorRef={editorRef} oriContent={oriContent} />
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
export default BlogEditor;
