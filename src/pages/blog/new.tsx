import Seo from "@/components/Base/Seo";
import PostEditor from "@/components/TinyMCE/PostEditor";

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
