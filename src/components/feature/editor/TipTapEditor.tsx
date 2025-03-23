import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import Toolbar from "@/components/feature/editor/toolbar";

interface TipTapEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const TipTapEditor = ({ value, onChange }: TipTapEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit, TextStyle, Underline],
    content: value,
    editorProps: {
      attributes: {
        class: "content-editor",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="w-full mx-auto">
      <div className="border rounded-md bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        {editor && <Toolbar editor={editor} />}
      </div>
      <EditorContent
        editor={editor}
        className="min-h-[300px] border rounded-lg p-4 mt-2"
      />
    </div>
  );
};

export default TipTapEditor;
