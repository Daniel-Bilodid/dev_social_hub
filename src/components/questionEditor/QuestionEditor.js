"use client";

import { useState } from "react";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import {
  ParagraphNode,
  TextNode,
  $getRoot,
  $createParagraphNode,
  $createTextNode,
} from "lexical";
import { CodeNode, CodeHighlightNode } from "@lexical/code";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import ExampleTheme from "./ExampleTheme";
import ToolbarPlugin from "../plugins/ToolbarPlugin";
import { parseAllowedColor, parseAllowedFontSize } from "./styleConfig";
import OnChangePlugin from "../plugins/OnChangePlugin";
import { useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const placeholder = "Enter some rich text...";

const InsertCodeButton = () => {
  const [editor] = useLexicalComposerContext();

  const insertCodeBlock = () => {
    editor.update(() => {
      const root = $getRoot();
      const codeNode = new CodeNode();
      const paragraph = $createParagraphNode();
      paragraph.append($createTextNode("Now you can type some code!"));
      codeNode.append(paragraph);
      root.append(codeNode);
    });
    const editorState = editor.getEditorState().toJSON();
    console.log("Editor state after inserting code block:", editorState);
  };

  return (
    <button
      className="bg-blue-500 text-white px-3 py-1 rounded-md mt-2 hover:bg-blue-600"
      onClick={insertCodeBlock}
    >
      Insert Code Block
    </button>
  );
};

const editorConfig = {
  namespace: "React.js Demo",
  nodes: [ParagraphNode, TextNode, CodeNode, CodeHighlightNode],
  onError: (error) => {
    console.error("Lexical Editor Error:", error);
  },
  theme: ExampleTheme,
};

const QuestionEditor = ({ postId }) => {
  const db = getFirestore();
  const { userId } = useAuth();
  const { user } = useUser();
  const [editorContent, setEditorContent] = useState("");

  const handleEditorChange = (content) => {
    setEditorContent(content);
    console.log("Editor content:", content);
  };

  const handleSubmit = async () => {
    console.log("Submitted content:", editorContent);
    console.log("UserID", userId);
    console.log("Username", user?.username);
    console.log("Image", user?.imageUrl);
    console.log("PostID", postId);

    if (!userId) {
      console.log("User is not signed in.");
      return;
    }

    try {
      const postsRef = collection(db, "posts", postId, "responses");

      await addDoc(postsRef, {
        content: editorContent,
        userId: userId,
        username: user?.username,
        imageUrl: user?.imageUrl,
        createdAt: new Date(),
      });
      console.log("Question added successfully");
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="editor-input"
                aria-placeholder={placeholder}
                placeholder={
                  <div className="editor-placeholder">{placeholder}</div>
                }
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <OnChangePlugin onChange={handleEditorChange} />
        </div>

        {/* Insert Code Button */}
        <InsertCodeButton />

        <button
          className="cursor-pointer text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </LexicalComposer>
  );
};

export default QuestionEditor;
