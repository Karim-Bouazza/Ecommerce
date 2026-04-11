"use client";

import { useEffect, type ReactNode } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import {
  Eraser,
  Highlighter,
  List,
  ListOrdered,
  Strikethrough,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type TipTapEditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  invalid?: boolean;
};

type ToolbarButtonProps = {
  label: string;
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  ariaLabel?: string;
};

function ToolbarButton({
  label,
  onClick,
  isActive,
  disabled,
  icon,
  ariaLabel,
}: ToolbarButtonProps) {
  const accessibleLabel = ariaLabel ?? label;

  return (
    <Button
      type="button"
      size="sm"
      variant="outline"
      onMouseDown={(event) => {
        // Keep current text selection inside ProseMirror before executing commands.
        event.preventDefault();
      }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "h-8 min-w-8 gap-1.5 px-2 text-xs",
        isActive ? "border-primary bg-primary/10 text-primary" : undefined,
      )}
      title={accessibleLabel}
      aria-label={accessibleLabel}
    >
      {icon}
      {label ? label : null}
    </Button>
  );
}

export default function TipTapEditor({
  value,
  onChange,
  placeholder = "Décrivez le produit...",
  invalid,
}: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Highlight],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none min-h-56 w-full px-3 py-3 text-sm leading-6 focus:outline-none [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:text-lg [&_h3]:font-semibold [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-5",
      },
    },
    onUpdate({ editor: currentEditor }) {
      onChange(currentEditor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) {
      return;
    }

    const currentHtml = editor.getHTML();
    if (value !== currentHtml) {
      editor.commands.setContent(value || "<p></p>", { emitUpdate: false });
    }
  }, [editor, value]);

  return (
    <div
      className={cn(
        "rounded-md border bg-background",
        invalid ? "border-destructive" : "border-input",
      )}
    >
      <div className="border-b p-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <ToolbarButton
            label="H1"
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 1 }).run()
            }
            isActive={editor?.isActive("heading", { level: 1 })}
            disabled={!editor}
          />
          <ToolbarButton
            label="H2"
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 2 }).run()
            }
            isActive={editor?.isActive("heading", { level: 2 })}
            disabled={!editor}
          />
          <ToolbarButton
            label="H3"
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 3 }).run()
            }
            isActive={editor?.isActive("heading", { level: 3 })}
            disabled={!editor}
          />
          <ToolbarButton
            label="B"
            onClick={() => editor?.chain().focus().toggleBold().run()}
            isActive={editor?.isActive("bold")}
            disabled={!editor}
          />
          <ToolbarButton
            label="I"
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            isActive={editor?.isActive("italic")}
            disabled={!editor}
          />
          <ToolbarButton
            label=""
            ariaLabel="Barré"
            icon={<Strikethrough className="size-3.5" />}
            onClick={() => editor?.chain().focus().toggleStrike().run()}
            isActive={editor?.isActive("strike")}
            disabled={!editor}
          />
          <ToolbarButton
            label=""
            ariaLabel="Liste à puces"
            icon={<List className="size-3.5" />}
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            isActive={editor?.isActive("bulletList")}
            disabled={!editor}
          />
          <ToolbarButton
            label=""
            ariaLabel="Liste numérotée"
            icon={<ListOrdered className="size-3.5" />}
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            isActive={editor?.isActive("orderedList")}
            disabled={!editor}
          />
          <ToolbarButton
            label=""
            ariaLabel="Surligner"
            icon={<Highlighter className="size-3.5" />}
            onClick={() => editor?.chain().focus().toggleHighlight().run()}
            isActive={editor?.isActive("highlight")}
            disabled={!editor}
          />
          <ToolbarButton
            label=""
            ariaLabel="Effacer le formatage"
            icon={<Eraser className="size-3.5" />}
            onClick={() =>
              editor
                ?.chain()
                .focus()
                .unsetAllMarks()
                .clearNodes()
                .setParagraph()
                .run()
            }
            disabled={!editor}
          />
        </div>
      </div>

      <EditorContent editor={editor} className="rounded-b-md" />

      {!value || value === "<p></p>" ? (
        <p className="px-3 pb-3 text-xs text-muted-foreground">{placeholder}</p>
      ) : null}
    </div>
  );
}
