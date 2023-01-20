import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import React, { forwardRef, useEffect, useState } from "react";

type EditorProps = {
    editorRef: any;
    oriContent?: any;
};

const PostEditor = ({ editorRef, oriContent }: EditorProps) => {
    return (
        <Editor
            ref={editorRef}
            previewStyle="vertical"
            initialEditType="markdown"
            toolbarItems={[["bold", "italic", "strike"]]}
            initialValue={oriContent ? oriContent : " "}
            hideModeSwitch={true}
            useCommandShortcut={false}
            plugins={[colorSyntax]}
            language="ko-KR"
            height="50rem"
            // 유튜브 삽입 및 미리보기 를 위한 설정(iframe)
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
                                outerNewLine: true,
                            },
                        ];
                    },
                },
            }}
        ></Editor>
    );
};
export default PostEditor;
