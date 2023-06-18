import { dbService } from "@/api/fbase";
import Seo from "@/components/Base/Seo";
import PostEditor from "@/components/TinyMCE/PostEditor";
import TinyMceEditor from "@/components/TinyMCE/TinyMceEditor";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useRef } from "react";

// const PostEditor = dynamic(() => import("@/components/ToastUI/Editor"), {
//     ssr: false,
// });

const NewBlogEditor = () => {
    const modeObj = {
        mode: 1,
    };
    return (
        <>
            <Seo title="New Blog" />
            <PostEditor modeObj={modeObj} />
        </>
    );
};
export default NewBlogEditor;
