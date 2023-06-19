import React, { useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storageService } from "@/api/fbase";

type EditorProps = {
    editorRef: any;
    originalContents?: any;
};

const TinyMceEditor = ({ editorRef, originalContents }: EditorProps) => {
    useEffect(() => {
        console.log("ori", originalContents);
    });
    const showContents = (e: any) => {
        console.log(editorRef.current.getContent());
    };

    // const tinymcePlugins = ['link', 'lists', 'autoresize'];
    // const tinymceToolbar =
    //   'blocks fontfamily |' +
    //   'bold italic underline strikethrough forecolor backcolor |' +
    //   'alignleft aligncenter alignright alignjustify |' +
    //   'bullist numlist blockquote link';

    // return (
    //   	<Editor
    //       apiKey='gx9emo0o1tah27fya81nhe1rwvkeuymknmbdfrosh9vh808i'
    //       onInit={(e, editor) => (editorRef.current = editor)}
    //       init={{
    //         plugins: tinymcePlugins,
    //         toolbar: tinymceToolbar,
    //         min_height: 500,
    //         menubar: false,
    //         branding: false,
    //         statusbar: false,
    //         block_formats: '제목1=h2;제목2=h3;제목3=h4;본문=p;'
    //       }}
    //     />
    //   );

    let plugins = [
        "advlist",
        "autolink",
        "lists",
        "link",
        "image",
        "charmap",
        "preview",
        "anchor",
        "searchreplace",
        "visualblocks",
        "code",
        "fullscreen",
        "insertdatetime",
        "media",
        "table",
        "code",
        "help",
        "wordcount",
        "save",
    ];
    let edit_toolbar =
        "formatselect fontselect fontsizeselect |" +
        " forecolor backcolor |" +
        " bold italic underline strikethrough |" +
        " alignjustify alignleft aligncenter alignright |" +
        " bullist numlist |" +
        " table tabledelete |" +
        " link image imageupload";
    return (
        <>
            <Editor
                id="tinyEditor"
                apiKey="gx9emo0o1tah27fya81nhe1rwvkeuymknmbdfrosh9vh808i"
                onInit={(e, editor) => (editorRef.current = editor)}
                initialValue={originalContents}
                init={{
                    language: "ko_KR", //한글판으로 변경
                    height: 500,
                    menubar: false,
                    plugins: plugins,
                    toolbar: edit_toolbar,
                    branding: false,

                    // file_picker_types: 'file image media',
                    // imagetools_cors_hosts: ['urbur.icu', 'localhost'],

                    /*** image upload ***/
                    image_title: true,
                    // /* enable automatic uploads of images represented by blob or data URIs*/
                    automatic_uploads: true,
                    /*
                        URL of our upload handler (for more details check: https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_url)
                        images_upload_url: 'postAcceptor.php',
                        here we add custom filepicker only to Image dialog
                    */
                    file_picker_types: "image",
                    // /* and here's our custom image picker*/
                    file_picker_callback: function (cb, value, meta) {
                        let input = document.createElement("input");

                        input.setAttribute("type", "file");
                        input.setAttribute("accept", "image/*");

                        input.onchange = async function () {
                            let file: any;

                            if (input.files) file = input.files[0];
                            else return;

                            const attachmentRef = ref(
                                storageService,
                                `images/${file.name}`
                            );
                            const response = await uploadBytes(
                                attachmentRef,
                                file
                            );
                            const attachmentUrl = await getDownloadURL(
                                response.ref
                            );

                            cb(attachmentUrl, { title: file.name });
                        };
                        input.click();
                    },

                    // file_picker_callback: function (cb, value, meta) {
                    //     let input = document.createElement('input');
                    //     // input.setAttribute('type', 'file');
                    //     input.setAttribute('accept', 'image/*');

                    //     /*
                    //     Note: In modern browsers input[type="file"] is functional without
                    //     even adding it to the DOM, but that might not be the case in some older
                    //     or quirky browsers like IE, so you might want to add it to the DOM
                    //     just in case, and visually hide it. And do not forget do remove it
                    //     once you do not need it anymore.
                    //     */

                    //     input.onchange = async function () {
                    //         let file:any;

                    //         if (input.files)
                    //             file = input.files[0];
                    //         else
                    //             return;

                    //         const attachmentRef = ref(storageService, "images");
                    //         const response = await uploadString(
                    //             attachmentRef,
                    //             attachment,
                    //             "data_url"
                    //         );

                    //         const attachmentUrl = await getDownloadURL(response.ref);

                    //         let reader = new FileReader();
                    //         reader.onloadend = (finishedEvent) => {
                    //             const {
                    //                 currentTarget: { result },
                    //             } = finishedEvent;
                    //             console.log(result);
                    //             console.log(typeof result);
                    //             setAttachment(result);

                    //             cb(attachmentUrl, {title: "title"});
                    //         };
                    //         // reader.onload = function () {
                    //         //     /*
                    //         //     Note: Now we need to register the blob in TinyMCEs image blob
                    //         //     registry. In the next release this part hopefully won't be
                    //         //     necessary, as we are looking to handle it internally.
                    //         //     */
                    //         //     let id = 'blobid' + (new Date()).getTime();
                    //         //     let blobCache =  tinymce.activeEditor.editorUpload.blobCache;
                    //         //     let base64 = reader.result.split(',')[1];
                    //         //     let blobInfo = blobCache.create(id, file, base64);
                    //         //     blobCache.add(blobInfo);

                    //         //     /* call the callback and populate the Title field with the file name */
                    //         //     cb(blobInfo.blobUri(), { title: file.name });
                    //         // };
                    //         reader.readAsDataURL(file);
                    //     };
                    //     input.click();
                    // },
                    /*** image upload ***/
                    content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
            />
        </>
    );
};

export default TinyMceEditor;
