// Toast 뷰어 임포트
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";

export default function ToastViewerYoutube({ content }) {
    return (
        <div>
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
                                { type: "html", content: node.childrenHTML },
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
    );
}
