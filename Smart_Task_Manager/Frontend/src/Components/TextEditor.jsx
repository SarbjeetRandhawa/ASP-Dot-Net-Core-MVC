import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { useEffect } from "react";

const RichTextEditor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  if (!editor) return null;

  const buttonClass =
    "px-2 py-1 text-sm border rounded hover:bg-gray-100";

  return (
    <div className="border rounded-lg bg-white shadow-sm">
      
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 p-2 border-b bg-gray-50">
        
        <button className={buttonClass} onClick={() => editor.chain().focus().toggleBold().run()}>
          <b>B</b>
        </button>

        <button className={buttonClass} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <i>I</i>
        </button>

        <button className={buttonClass} onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <u>U</u>
        </button>

        <button className={buttonClass} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
          H1
        </button>

        <button className={buttonClass} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          H2
        </button>

        <button className={buttonClass} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          • List
        </button>

        <button className={buttonClass} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          1. List
        </button>

        <button className={buttonClass} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
          {"</>"}
        </button>

        <button
          className={buttonClass}
          onClick={() => {
            const url = prompt("Enter URL");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
        >
          🔗 Link
        </button>
      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="p-3 min-h-[180px] focus:outline-none"
      />

      {/* Placeholder */}
      {!value && (
        <p className="absolute mt-[-140px] ml-4 text-gray-400 text-sm pointer-events-none">
          Describe the task in detail. What needs to be done?...
        </p>
      )}
    </div>
  );
};

export default RichTextEditor;