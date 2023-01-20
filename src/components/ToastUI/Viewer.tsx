import { Viewer } from "@toast-ui/react-editor";

interface ViewerProps {
    content: any;
}

const PostViewer = ({ content }: ViewerProps) => {
    return (
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
    );
};

export default PostViewer;
