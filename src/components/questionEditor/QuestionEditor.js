"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useState } from "react";

const editorConfig = {
  namespace: "MyEditor",
  onError: (error) => console.error(error),
};

const QuestionEditor = () => {
  // Если нужно отслеживать состояние редактора, можно сохранить его здесь:
  const [editorState, setEditorState] = useState(null);

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
    // Можно преобразовать состояние в строку или сохранить его для дальнейшего использования
  };

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <RichTextPlugin
        contentEditable={<ContentEditable />}
        placeholder={<p>Start typing...</p>}
      />
      <OnChangePlugin onChange={handleEditorChange} />
    </LexicalComposer>
  );
};

export default QuestionEditor;
