"use client";

import { useState } from "react";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ParagraphNode, TextNode } from "lexical";

import { CodeNode, CodeHighlightPlugin } from "@lexical/code";

import ExampleTheme from "./ExampleTheme";
import ToolbarPlugin from "../plugins/ToolbarPlugin";
import { parseAllowedColor, parseAllowedFontSize } from "./styleConfig";
import OnChangePlugin from "../plugins/OnChangePlugin";
import { useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";
import { getFirestore, collection, addDoc, doc } from "firebase/firestore";

const placeholder = "Enter some rich text...";

const removeStylesExportDOM = (editor, target) => {
  const output = target.exportDOM(editor);
  if (output && output.element instanceof HTMLElement) {
    for (const el of [
      output.element,
      ...output.element.querySelectorAll('[style],[class],[dir="ltr"]'),
    ]) {
      el.removeAttribute("class");
      el.removeAttribute("style");
      if (el.getAttribute("dir") === "ltr") {
        el.removeAttribute("dir");
      }
    }
  }
  return output;
};

const exportMap = new Map([
  [ParagraphNode, removeStylesExportDOM],
  [TextNode, removeStylesExportDOM],
]);

const getExtraStyles = (element) => {
  let extraStyles = "";
  const fontSize = parseAllowedFontSize(element.style.fontSize);
  const backgroundColor = parseAllowedColor(element.style.backgroundColor);
  const color = parseAllowedColor(element.style.color);
  if (fontSize !== "" && fontSize !== "15px") {
    extraStyles += `font-size: ${fontSize};`;
  }
  if (backgroundColor !== "" && backgroundColor !== "rgb(255, 255, 255)") {
    extraStyles += `background-color: ${backgroundColor};`;
  }
  if (color !== "" && color !== "rgb(0, 0, 0)") {
    extraStyles += `color: ${color};`;
  }
  return extraStyles;
};

const constructImportMap = () => {
  const importMap = {};
  for (const [tag, fn] of Object.entries(TextNode.importDOM() || {})) {
    importMap[tag] = (importNode) => {
      const importer = fn(importNode);
      if (!importer) {
        return null;
      }
      return {
        ...importer,
        conversion: (element) => {
          const output = importer.conversion(element);
          if (
            output === null ||
            output.forChild === undefined ||
            output.after !== undefined ||
            output.node !== null
          ) {
            return output;
          }
          const extraStyles = getExtraStyles(element);
          if (extraStyles) {
            const { forChild } = output;
            return {
              ...output,
              forChild: (child, parent) => {
                const textNode = forChild(child, parent);
                if (textNode instanceof TextNode) {
                  textNode.setStyle(textNode.getStyle() + extraStyles);
                }
                return textNode;
              },
            };
          }
          return output;
        },
      };
    };
  }
  return importMap;
};

const editorConfig = {
  html: {
    export: exportMap,
    import: constructImportMap(),
  },
  namespace: "React.js Demo",

  nodes: [ParagraphNode, TextNode, CodeNode],
  onError: (error) => {
    throw error;
  },
  theme: ExampleTheme,
};

const QuestionEditor = ({ postId }) => {
  const db = getFirestore();
  const { userId } = useAuth();
  const { user } = useUser();
  const [editorContent, setEditorContent] = useState([]);

  const handleEditorChange = (content) => {
    setEditorContent(content);
    console.log("Editor content:", content);
  };

  const handleSubmit = async () => {
    console.log("Submitted content:", editorContent);
    console.log("UserID", userId);
    console.log("username", user.username);
    console.log("image", user.imageUrl);
    console.log("postId", postId);

    if (!userId) {
      console.log("User is not signed in.");
      return;
    }
    try {
      const postsRef = collection(db, "posts", postId, "responses");

      await addDoc(postsRef, {
        content: editorContent,
        userId: userId,
        username: user.username,
        imageUrl: user.imageUrl,
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
