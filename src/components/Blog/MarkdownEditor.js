import Editor from "@toast-ui/editor";
import axios from "axios";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import youtubeLogo from "asset/img/youtube_logo.png";

const EditorContainer = styled.div`
    .video-container {
        position: relative;
        padding-bottom: 56.25%;
        padding-top: 30px;
        height: 0;
        overflow: hidden;
    }
    .video-container iframe,
    .video-container object,
    .video-container embed {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: none;
    }
`;

export default function MarkdownEditor({ initialValue }) {
    // const editorRef = useRef < Editor > null;
    const editorRef = useRef();

    useEffect(() => {
        editorRef.current
            ?.getInstance()
            .addCommand(
                "markdown",
                "addYoutube",
                (payload, state, dispatch, view) => {
                    let url = prompt(
                        "추가할 youtube 영상의 주소창 url을 담아주세요!"
                    );
                    if (!url) return false;
                    url = url?.split("=").at(-1) ?? "";
                    const str = `
        <div class="video-container">
          <iframe src="https://www.youtube.com/embed/${url}" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      `;
                    editorRef.current?.getInstance().insertText(str);
                    return true;
                }
            );

        editorRef.current?.getInstance().insertToolbarItem(
            { groupIndex: 3, itemIndex: 3 },
            {
                name: "youtube",
                tooltip: "youtube",
                className: "toastui-editor-toolbar-icons",
                style: {
                    backgroundImage: `url(${youtubeLogo})`,
                    backgroundSize: "25px",
                    color: "red",
                },
                command: "addYoutube",
            }
        );
        editorRef.current?.getInstance().removeHook("addImageBlobHook");
        editorRef.current
            ?.getInstance()
            .addHook("addImageBlobHook", async (file) => {
                const formData = new FormData();
                formData.append("multipartFile", file);

                await axios({
                    method: "post",
                    url: "/file?fileType=IMAGE",
                    data: formData,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                    .then(({ data }) => {
                        editorRef.current
                            ?.getInstance()
                            .insertText(`<img src="${data.url}" alt=""/>`);
                        editorRef.current
                            ?.getInstance()
                            .eventEmitter.emit("closePopup");
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            });
    }, []);

    return (
        <EditorContainer>
            <Editor
                previewStyle="vertical"
                height="700px"
                ref={editorRef}
                initialValue={initialValue}
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
                                    content: node.childrenHTML ?? "",
                                },
                                {
                                    type: "closeTag",
                                    tagName: "iframe",
                                    outerNewLine: true,
                                },
                            ];
                        },
                        div(node) {
                            return [
                                {
                                    type: "openTag",
                                    tagName: "div",
                                    outerNewLine: true,
                                    attributes: node.attrs,
                                },
                                {
                                    type: "html",
                                    content: node.childrenHTML ?? "",
                                },
                                {
                                    type: "closeTag",
                                    tagName: "div",
                                    outerNewLine: true,
                                },
                            ];
                        },
                    },
                    htmlInline: {
                        big(node, { entering }) {
                            return entering
                                ? {
                                      type: "openTag",
                                      tagName: "big",
                                      attributes: node.attrs,
                                  }
                                : { type: "closeTag", tagName: "big" };
                        },
                    },
                }}
            />
        </EditorContainer>
    );
}
