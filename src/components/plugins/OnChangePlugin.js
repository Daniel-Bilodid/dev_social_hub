import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import {
  $isTextNode,
  $getRoot,
  $isParagraphNode,
  IS_BOLD,
  IS_ITALIC,
  IS_UNDERLINE,
  IS_STRIKETHROUGH,
} from "lexical";

const parseFormat = (format) => ({
  bold: (format & IS_BOLD) !== 0,
  italic: (format & IS_ITALIC) !== 0,
  underline: (format & IS_UNDERLINE) !== 0,
  strikethrough: (format & IS_STRIKETHROUGH) !== 0,
});

export default function OnChangePlugin({ onChange }) {
  const [editor] = useLexicalComposerContext();

  const processNode = (node) => {
    const segments = [];
    if ($isTextNode(node)) {
      segments.push({
        text: node.getTextContent(),
        format: parseFormat(node.getFormat()),
      });
    } else if ($isParagraphNode(node)) {
      node.getChildren().forEach((child) => {
        if ($isTextNode(child)) {
          segments.push({
            text: child.getTextContent(),
            format: parseFormat(child.getFormat()),
          });
        }
      });
    }
    return segments;
  };

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const root = $getRoot();
        const nodes = root.getChildren();
        let content = [];

        nodes.forEach((node) => {
          if ($isParagraphNode(node) || $isTextNode(node)) {
            const segments = processNode(node);

            content.push({
              type: node.getType(),
              segments,
              alignment: node.getStyle?.() || "left",
            });
          }
        });
        onChange(content);
      });
    });
  }, [editor, onChange]);

  return null;
}
