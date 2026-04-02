"use client";

import {
  useEditor,
  EditorContent,
  Editor,
  useEditorState,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import { Toggle } from "./ui/toggle.jsx";
import CodeBlock from "@tiptap/extension-code-block";

import {
  BoldIcon,
  BrushIcon,
  CodeIcon,
  HighlighterIcon,
  Icon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  Quote,
  RedoIcon,
  StrikethroughIcon,
  UnderlineIcon,
  UndoIcon,
  UnlinkIcon,
} from "lucide-react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ReactNode, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { BubbleMenu as TiptapBubbleMenu } from "@tiptap/react/menus";
import { FloatingMenu as TiptapFloatingMenu } from "@tiptap/react/menus";
import Placeholder from "@tiptap/extension-placeholder";

// editorProps lets me customize the HTML element that Tiptap creates for the editor.
// I add Tailwind’s prose classes so my editor text looks beautiful — with proper heading sizes, spacing, lists, blockquotes, and typography. Without this, the editor looks plain and unstyled

const Tiptap = ({ onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight.configure({ multicolor: true }),
      Placeholder.configure({
        placeholder: `Describe the task in detail. What needs to be done? Any specific requirements or acceptance criteria?
        `,
        showOnlyWhenEditable: true,
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm sm:prose-base focus:outline-none max-w-none",
      },
    },

    onUpdate: ({ editor }) => {
      onChange?.({ html: editor.getHTML(), text: editor.getText() });
    },
    immediatelyRender: false,
  });

  return (
    <div className="bg-background rounded-md relative   ">
      {editor && (
        <>
          <ToolBar editor={editor} />
          {/* <BubbleMenu editor={editor} />
          <FloatingMenu editor={editor} /> */}
        </>
      )}
      <EditorContent
        editor={editor}
        className=" min-h-[80px] max-h-[400px] rounded-md overflow-y-scroll px-4 py-3"
      />
    </div>
  );
};

export default Tiptap;

function LinkComponent({ editor, children }) {
  const [linkUrl, setLinkUrl] = useState("");
  const [isLinkPopoverOpen, setIsLinkPopoverOpen] = useState(false);

  const handleSetLink = () => {
    let Url = linkUrl.trim();
    if (Url) {
      if (!Url.startsWith("http://") && !Url.startsWith("https://" + Url)) {
        Url = "https://" + Url;
      }
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: Url, target: "_blank" })
        .run();
    } else {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    }
    setIsLinkPopoverOpen(false);
    setLinkUrl("");
  };

  return (
    <Popover open={isLinkPopoverOpen} onOpenChange={setIsLinkPopoverOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      {/* // this is the main */}
      {/* trigger point */}
      <PopoverContent className="w-80 p-4 bg-white">
        <div className="flex flex-col gap-4">
          <h3 className="font-medium">Insert Link</h3>
          <Input
            placeholder="https://example.com"
            type="url"
            value={linkUrl}
            className="px-3 py-1"
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSetLink();
              }
            }}
          />
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setIsLinkPopoverOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSetLink}>Save</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

const ToolBar = ({ editor }) => {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold") ?? false,
        isItalic: ctx.editor.isActive("italic") ?? false,
        iamThapa: ctx.editor.isActive("underline") ?? false,
        isStrike: ctx.editor.isActive("strike") ?? false,
        isCode: ctx.editor.isActive("code") ?? false,
        isHighlight: ctx.editor.isActive("highlight") ?? false,
        isBulletList: ctx.editor.isActive("bulletList") ?? false,
        isOrderedList: ctx.editor.isActive("orderedList") ?? false,
        isBlockquote: ctx.editor.isActive("blockquote") ?? false,
        isLink: ctx.editor.isActive("link") ?? false,
        canRedo: editor.can().redo(),
        canUndo: editor.can().undo(),
        isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
        isHeading4: ctx.editor.isActive("heading", { level: 4 }) ?? false,
        isParagraph: ctx.editor.isActive("paragraph") ?? false,
      };
    },
  });

  const handleHeadingChange = (value) => {
    if (value === "paragraph") {
      editor.chain().focus().setParagraph().run();
    } else {
      const level = Number.parseInt(value.replace("heading", ""));
      editor.chain().focus().setHeading({ level }).run();
    }
  };

  return (
    <div
      className={
        "bg-background rounded-md bg-white sticky top-0 z-10 flex flex-wrap items-center gap-1 border-b p-2 "
      }
    >
      <Select
        onValueChange={handleHeadingChange}
        value={
          editorState.isHeading1
            ? "heading1"
            : editorState.isHeading2
              ? "heading2"
              : editorState.isHeading3
                ? "heading3"
                : editorState.isHeading4
                  ? "heading4"
                  : "paragraph"
        }
      >
        <SelectTrigger className="md:w-[180px] w-[100px] text-[11px] md:text-[15px]">
          <SelectValue placeholder="Paragraph" />
        </SelectTrigger>
        <SelectContent className="bg-white ">
          <SelectItem value="paragraph" className="text-[11px] md:text-[15px]">
            Paragraph
          </SelectItem>
          <SelectItem
            value="heading1"
            className="text-[11px] md:text-[14px] font-extrabold"
          >
            Heading 1
          </SelectItem>
          <SelectItem
            value="heading2"
            className="text-[10px] md:text-[13px] font-extrabold"
          >
            Heading 2
          </SelectItem>
          <SelectItem
            value="heading3"
            className="text-[9px] md:text-[12px] font-extrabold"
          >
            Heading 3
          </SelectItem>
          <SelectItem
            value="heading4"
            className="text-[8px] md:text-[11px] font-extrabold"
          >
            Heading 4
          </SelectItem>
        </SelectContent>
      </Select>

      <Toggle
        size="sm"
        pressed={editorState.isBold}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        aria-label="Toggle bold"
      >
        <BoldIcon />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isItalic}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        aria-label="Toggle bold"
      >
        <ItalicIcon />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.iamThapa}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
        aria-label="Toggle underline"
      >
        <UnderlineIcon />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isStrike}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        aria-label="Toggle strikethrough"
      >
        <StrikethroughIcon />
      </Toggle>

      <HighlightPicker editor={editor} />

      <Toggle
        size="sm"
        pressed={editorState.isCode}
        onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
        aria-label="Toggle code"
      >
        <CodeIcon />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isBulletList}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        aria-label="Toggle bullet list"
      >
        <ListIcon />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isOrderedList}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
        aria-label="Toggle ordered list"
      >
        <ListOrderedIcon />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editorState.isBlockquote}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
        aria-label="Toggle blockquote"
      >
        <Quote />
      </Toggle>

      <div className="bg-border mx-1 h-6 w-px" />

      {editorState.isLink ? (
        <Toggle
          pressed
          onPressedChange={() =>
            editor.chain().focus().extendMarkRange("link").unsetLink().run()
          }
        >
          <UnlinkIcon />
        </Toggle>
      ) : (
        <LinkComponent editor={editor}>
          <Toggle size="sm" aria-label="Toggle link">
            <LinkIcon />
          </Toggle>
        </LinkComponent>
      )}

      <div className="bg-border mx-1 h-6 w-px" />

      <div className="bg-border mx-1 h-6 w-px" />

      <Button
        type="button"
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editorState.canUndo}
        aria-label="Undo"
      >
        <UndoIcon />
      </Button>

      <Button
        type="button"
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editorState.canRedo}
        aria-label="Redo"
      >
        <RedoIcon />
      </Button>
    </div>
  );
};

const HighlightPicker = ({ editor }) => {
  const [open, setOpen] = useState(false);

  if (!editor) return null;

  const highlightColors = [
    { name: "yellow", color: "#fef08a" },
    { name: "Green", color: "#bbf7d0" },
    { name: "Blue", color: "#bfdbfe" },
    { name: "Red", color: "#fecaca" },
    { name: "Purple", color: "#e9d5ff" },
    { name: "Gray", color: "#e5e7eb" },
  ];

  return (
    <div className="relative">
      {/* Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="px-2 py-1  rounded"
      >
        <HighlighterIcon className="h-4 w-4" />
      </button>

      {/* Popup */}
      {open && (
        <div className="absolute top-10 left-0 bg-white shadow-lg border rounded p-2 flex gap-2 z-50">
          {highlightColors.map((item) => (
            <button
              type="button"
              key={item.color}
              onClick={() => {
                editor
                  .chain()
                  .focus()
                  .toggleHighlight({ color: item.color })
                  .run();
                setOpen(false);
              }}
              className="w-6 h-6 rounded"
              style={{ backgroundColor: item.color }}
            />
          ))}

          {/* Remove highlight */}
          <button
            type="button"
            onClick={() => {
              editor.chain().focus().unsetHighlight().run();
              setOpen(false);
            }}
            className="px-2 text-sm"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};
