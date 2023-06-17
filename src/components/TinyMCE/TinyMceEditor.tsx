import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TinyMceEditor = () => {
	const editorRef = useRef<any>(null);

  const tinymcePlugins = ['link', 'lists', 'autoresize'];
  const tinymceToolbar =
    'blocks fontfamily |' +
    'bold italic underline strikethrough forecolor backcolor |' +
    'alignleft aligncenter alignright alignjustify |' +
    'bullist numlist blockquote link';
    
	return (
    	<Editor
        apiKey='gx9emo0o1tah27fya81nhe1rwvkeuymknmbdfrosh9vh808i'
        onInit={(e, editor) => (editorRef.current = editor)}
        init={{
          plugins: tinymcePlugins,
          toolbar: tinymceToolbar,
          min_height: 500,
          menubar: false,
          branding: false,
          statusbar: false,
          block_formats: '제목1=h2;제목2=h3;제목3=h4;본문=p;'
        }}
      />
    );
};

export default TinyMceEditor;