import { dbService } from "@/api/fbase";
import Seo from "@/components/Base/Seo";
import { useUser } from "@/store/useUser";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PostEditor from "@/components/TinyMCE/PostEditor";

const BlogViewer = () => {
    const router = useRouter();
    const blogId = router.query.id;

    const { data } = useUser();

    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<any>("");
    const [editMode, setEditMode] = useState<boolean>(false);

    const deleteThis = async () => {
        if (typeof blogId === "string") {
            await deleteDoc(doc(dbService, "blogs", blogId));
            router.push("/blog");
        }
    };

    const updateThis = async () => {
        setEditMode((prev) => !prev);
    };

    let modeObj = {
        mode: 2,
        blogId: blogId,
        title,
        content,
        toggleUpdateMode: updateThis,
    };

    useEffect(() => {
        const getBlog = async () => {
            if (typeof blogId === "string") {
                const docRef = doc(dbService, "blogs", blogId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setTitle(docSnap.data().title);
                    setContent(docSnap.data().content);
                }
            }
        };
        getBlog();
    }, [blogId]);

    return (
        <>
            <Seo title="Blog" />
            {editMode ? (
                <PostEditor modeObj={modeObj} />
            ) : (
                <div className={"wrapper"}>
                    <div className={"header"}>
                        <div className={"title"}>
                            <h2>{title}</h2>
                        </div>
                        {data?.isAd && (
                            <div>
                                <button
                                    className={"button"}
                                    onClick={() => router.push("/blog")}
                                >
                                    목록
                                </button>
                                <button
                                    className={"button"}
                                    onClick={deleteThis}
                                >
                                    삭제
                                </button>
                                <button
                                    className={"button"}
                                    onClick={updateThis}
                                >
                                    수정
                                </button>
                            </div>
                        )}
                    </div>
                    <div
                        className={"blog_content"}
                        dangerouslySetInnerHTML={{ __html: content }}
                    ></div>
                </div>
            )}

            <style jsx>
                {`
                    .wrapper {
                        display: flex;
                        flex-direction: column;
                    }

                    .header {
                        display: flex;
                        height: 3rem;
                        line-height: 3rem;
                    }

                    .title {
                        flex: 1;
                    }

                    .button {
                        background-color: var(--color-brown);
                        border-radius: 0.5rem;
                        border: none;
                        margin-right: 0.5rem;
                        color: white;
                        width: 5rem;
                        padding: 0.8rem;
                        font-size: 1rem;
                    }

                    .button:hover {
                        cursor: pointer;
                    }

                    .content > * {
                        line-height: 2rem;
                        margin-bottom: 1rem;
                    }

                    @media screen and (max-width: 480px) {
                        .header {
                            flex-direction: column;
                            height: 100%;
                        }

                        .title {
                            width: 100%;
                        }
                    }
                `}
            </style>
        </>
    );
};
export default BlogViewer;
