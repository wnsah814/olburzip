import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { dbService } from "fbase";
import Updator from "./Updator";

import styles from "./ContentsViewer.module.css";
const ContentsViewer = ({ userObj }) => {
    const param = useParams();
    const navigator = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [editMode, setEditMode] = useState(false);

    const deleteThis = async () => {
        await deleteDoc(doc(dbService, "blogs", param.id));
        navigator("/blog");
    };

    const updateThis = async () => {
        setEditMode((prev) => !prev);
    };

    useEffect(() => {
        const getBlog = async () => {
            const docRef = doc(dbService, "blogs", param.id);
            const docSnap = await getDoc(docRef);
            setTitle(docSnap.data().title);
            setContent(docSnap.data().content);
        };
        getBlog();
    }, []);
    return (
        <div>
            {editMode ? (
                <Updator
                    articleId={param.id}
                    originalContent={content}
                    originalTitle={title}
                    updateThis={updateThis}
                />
            ) : (
                <div className={styles.wrapper}>
                    <div className={styles.header}>
                        <div className={styles.title}>
                            <h2>{title}</h2>
                        </div>
                        {userObj?.isAd && (
                            <div>
                                <button
                                    className={styles.button}
                                    onClick={() => navigator("/blog")}
                                >
                                    목록
                                </button>
                                <button
                                    className={styles.button}
                                    onClick={deleteThis}
                                >
                                    삭제
                                </button>
                                <button
                                    className={styles.button}
                                    onClick={updateThis}
                                >
                                    수정
                                </button>
                            </div>
                        )}
                    </div>
                    <div className={styles.content}>
                        {content && (
                            <Viewer
                                // prop으로 받은 content에는 youtube iframe 태그가 포함되어 있다.
                                initialValue={content}
                                // 유튜브 삽입 및 미리보기 를 위한 설정(iframe)
                                customHTMLRenderer={{
                                    htmlBlock: {
                                        iframe(node) {
                                            return [
                                                {
                                                    type: "openTag",
                                                    tagName: "iframe",
                                                    outerNewLine: true,
                                                    attributes: node.attrs,
                                                },
                                                {
                                                    type: "html",
                                                    content: node.childrenHTML,
                                                },
                                                {
                                                    type: "closeTag",
                                                    tagName: "iframe",
                                                    outerNewLine: false,
                                                },
                                            ];
                                        },
                                    },
                                }}
                            ></Viewer>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContentsViewer;
