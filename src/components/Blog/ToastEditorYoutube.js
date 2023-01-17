import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

export function ToastEditorYoutube() {
    return (
        <div>
            <Editor
                previewStyle="tab"
                initialEditType="markdown"
                toolbarItems={[["bold", "italic", "strike"]]}
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
                                { type: "html", content: node.childrenHTML },
                                {
                                    type: "closeTag",
                                    tagName: "iframe",
                                    outerNewLine: true,
                                },
                            ];
                        },
                    },
                }}
            ></Editor>
        </div>
    );
}
