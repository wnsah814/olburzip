import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TinyMceViewer = () => {

  var plugins = [
    "advlist", "autolink", "lists", "link", "image", "imagetools", "imageupload", "charmap", "print", "preview", "anchor",
    "searchreplace", "visualblocks", "code", "fullscreen", "insertdatetime", "media", "table",
    "paste", "code", "help", "wordcount", "save"
    ];
    var edit_toolbar = 'formatselect fontselect fontsizeselect |'
        + ' forecolor backcolor |'
        + ' bold italic underline strikethrough |'
        + ' alignjustify alignleft aligncenter alignright |'
        + ' bullist numlist |'
        + ' table tabledelete |'
        + ' link image imageupload';
    return (
        <>

        </>
    )
};

export default TinyMceViewer;