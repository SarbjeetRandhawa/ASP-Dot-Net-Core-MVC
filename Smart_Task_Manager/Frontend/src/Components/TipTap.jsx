import "./TipTapstyles.css";
import { TextStyleKit } from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import { MenuBar } from "./MenuBar.jsx";

const TipTap = () => {
  const extensions = [TextStyleKit, StarterKit];
  const editor = useEditor({
    extensions,
    content: `hello`,
  
  });

  return (
    <>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
};

export default TipTap;
