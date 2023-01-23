import { Viewer } from "@toast-ui/react-editor";
import styles from "@/styles/Viewer.module.css";
interface ViewerProps {
    content: any;
}

const PostViewer = ({ content }: ViewerProps) => {
    return (
        <>
            <div className={styles.blog}>
                <Viewer
                    initialValue={content}
                    customHTMLRenderer={{
                        htmlBlock: {
                            iframe(node: any) {
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
            </div>
        </>
    );
};

export default PostViewer;
