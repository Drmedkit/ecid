"use client";

import { useEffect, useRef, useState } from "react";
import { Editor, rootCtx, defaultValueCtx } from "@milkdown/core";
import { commonmark } from "@milkdown/preset-commonmark";
import { gfm } from "@milkdown/preset-gfm";
import { listener, listenerCtx } from "@milkdown/plugin-listener";
import { nord } from "@milkdown/theme-nord";
import "@milkdown/theme-nord/style.css";

interface MarkdownEditorProps {
  initialValue?: string;
  onChange?: (markdown: string) => void;
}

const toolbarButtons = [
  { label: "H1", syntax: "# ", tooltip: "Heading 1" },
  { label: "H2", syntax: "## ", tooltip: "Heading 2" },
  { label: "H3", syntax: "### ", tooltip: "Heading 3" },
  { label: "B", syntax: "**", wrap: true, tooltip: "Bold", style: "font-bold" },
  { label: "I", syntax: "_", wrap: true, tooltip: "Italic", style: "italic" },
  { label: "•", syntax: "- ", tooltip: "Bullet list" },
  { label: "1.", syntax: "1. ", tooltip: "Numbered list" },
  { label: ">", syntax: "> ", tooltip: "Quote" },
  { label: "</>", syntax: "`", wrap: true, tooltip: "Code" },
  { label: "---", syntax: "\n---\n", tooltip: "Divider" },
  { label: "🔗", syntax: "[text](url)", tooltip: "Link" },
];

export function MarkdownEditor({ initialValue = "", onChange }: MarkdownEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [mode, setMode] = useState<"visual" | "markdown">("visual");
  const [markdownContent, setMarkdownContent] = useState(initialValue);
  const editorInstance = useRef<Editor | null>(null);

  useEffect(() => {
    if (mode !== "visual" || !editorRef.current) return;

    const editor = Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, editorRef.current);
        ctx.set(defaultValueCtx, markdownContent);
        ctx.get(listenerCtx).markdownUpdated((_, markdown) => {
          setMarkdownContent(markdown);
          onChange?.(markdown);
        });
      })
      .config(nord)
      .use(commonmark)
      .use(gfm)
      .use(listener)
      .create();

    editor.then((e) => {
      editorInstance.current = e;
    });

    return () => {
      editorInstance.current?.destroy();
    };
  }, [mode]);

  const insertSyntax = (syntax: string, wrap?: boolean) => {
    if (mode === "markdown" && textareaRef.current) {
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = textarea.value;
      const selected = text.substring(start, end);

      let newText: string;
      let newCursor: number;

      if (wrap && selected) {
        newText = text.substring(0, start) + syntax + selected + syntax + text.substring(end);
        newCursor = end + syntax.length * 2;
      } else if (wrap) {
        newText = text.substring(0, start) + syntax + "text" + syntax + text.substring(end);
        newCursor = start + syntax.length;
      } else {
        newText = text.substring(0, start) + syntax + text.substring(end);
        newCursor = start + syntax.length;
      }

      setMarkdownContent(newText);
      onChange?.(newText);

      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(newCursor, newCursor);
      }, 0);
    }
  };

  const handleMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownContent(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-[#1a1a1a] border-b border-gray-700 px-3 py-2 flex items-center gap-1 flex-wrap">
        {toolbarButtons.map((btn, i) => (
          <button
            key={i}
            onClick={() => insertSyntax(btn.syntax, btn.wrap)}
            title={btn.tooltip}
            className={`px-3 py-1 text-sm text-gray-300 hover:bg-[#2a2a2a] hover:text-white rounded transition-colors ${btn.style || ""}`}
          >
            {btn.label}
          </button>
        ))}
        <div className="flex-1" />
        <div className="flex bg-[#2a2a2a] rounded overflow-hidden">
          <button
            onClick={() => setMode("visual")}
            className={`px-3 py-1 text-sm transition-colors ${
              mode === "visual" ? "bg-[#0EF0EB] text-black" : "text-gray-400 hover:text-white"
            }`}
          >
            Visual
          </button>
          <button
            onClick={() => setMode("markdown")}
            className={`px-3 py-1 text-sm transition-colors ${
              mode === "markdown" ? "bg-[#0EF0EB] text-black" : "text-gray-400 hover:text-white"
            }`}
          >
            Markdown
          </button>
        </div>
      </div>

      {/* Help text */}
      <div className="bg-[#0a0a0a] px-3 py-2 text-xs text-gray-500 border-b border-gray-800">
        💡 Tip: Use the buttons above to format text, or switch to Markdown mode for more control
      </div>

      {/* Editor */}
      {mode === "visual" ? (
        <div
          ref={editorRef}
          className="min-h-[400px] bg-[#1a1a1a] p-4 prose prose-invert max-w-none
            [&_.milkdown]:outline-none
            [&_.milkdown]:min-h-[350px]
            [&_h1]:text-[#0EF0EB]
            [&_h2]:text-[#0EF0EB]
            [&_h3]:text-[#0EF0EB]
            [&_a]:text-[#0EF0EB]
            [&_code]:bg-[#2a2a2a]
            [&_pre]:bg-[#2a2a2a]"
        />
      ) : (
        <textarea
          ref={textareaRef}
          value={markdownContent}
          onChange={handleMarkdownChange}
          className="w-full min-h-[400px] bg-[#1a1a1a] p-4 text-white font-mono text-sm outline-none resize-none"
          placeholder="Write your content here using Markdown..."
        />
      )}
    </div>
  );
}
