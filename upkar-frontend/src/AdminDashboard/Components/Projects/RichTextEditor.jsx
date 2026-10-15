import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { TextStyle } from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import { Extension } from '@tiptap/core';

const FontSize = Extension.create({
  name: 'fontSize',
  addOptions() {
    return { types: ['textStyle'] };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (el) => el.style.fontSize || null,
            renderHTML: (attrs) =>
              attrs.fontSize ? { style: `font-size: ${attrs.fontSize}` } : {},
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontSize:
        (size) =>
        ({ chain }) =>
          chain().setMark('textStyle', { fontSize: size }).run(),
      unsetFontSize:
        () =>
        ({ chain }) =>
          chain()
            .setMark('textStyle', { fontSize: null })
            .removeEmptyTextStyle()
            .run(),
    };
  },
});

const FONT_FAMILIES = [
  { label: 'Sans Serif', value: '' },
  { label: 'Serif', value: 'Georgia, serif' },
  { label: 'Fixed Width', value: 'monospace' },
  { label: 'Wide', value: 'Arial Black, sans-serif' },
  { label: 'Narrow', value: 'Arial Narrow, sans-serif' },
  { label: 'Comic Sans MS', value: 'Comic Sans MS, cursive' },
  { label: 'Garamond', value: 'Garamond, serif' },
  { label: 'Georgia', value: 'Georgia, serif' },
  { label: 'Tahoma', value: 'Tahoma, sans-serif' },
  { label: 'Trebuchet MS', value: 'Trebuchet MS, sans-serif' },
  { label: 'Verdana', value: 'Verdana, sans-serif' },
];

const FONT_SIZES = [
  '10px',
  '12px',
  '14px',
  '16px',
  '18px',
  '20px',
  '24px',
  '28px',
  '32px',
  '36px',
];

const ToolbarButton = ({ onClick, active, children, title }) => (
  <button
    type="button"
    title={title}
    onMouseDown={(e) => {
      e.preventDefault();
      onClick();
    }}
    className={`px-2 py-1 rounded text-sm font-medium transition
      ${active ? 'bg-green-800 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
  >
    {children}
  </button>
);

export default function RichTextEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [StarterKit, Underline, TextStyle, FontFamily, FontSize],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  if (!editor) return null;

  const handleFontFamily = (e) => {
    const val = e.target.value;
    editor.commands.focus();
    if (val) {
      editor.chain().focus().setFontFamily(val).run();
    } else {
      editor.chain().focus().unsetFontFamily().run();
    }
  };

  const handleFontSize = (e) => {
    const val = e.target.value;
    editor.commands.focus();
    if (val) {
      editor.chain().focus().setFontSize(val).run();
    } else {
      editor.chain().focus().unsetFontSize().run();
    }
  };

  // Detect current font family
  const currentFont = (() => {
    const attrs = editor.getAttributes('textStyle');
    return attrs?.fontFamily || '';
  })();

  // Detect current font size
  const currentSize = (() => {
    const attrs = editor.getAttributes('textStyle');
    return attrs?.fontSize || '';
  })();

  return (
    // <div className="border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-green-800">
    <div className="border rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-gray-50">
        {/* Font Family Dropdown */}
        <select
          value={currentFont}
          onChange={handleFontFamily}
          className="border rounded px-2 py-1 text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-green-800 cursor-pointer"
        >
          {FONT_FAMILIES.map((f) => (
            <option
              key={f.label}
              value={f.value}
              style={{ fontFamily: f.value || 'inherit' }}
            >
              {f.label}
            </option>
          ))}
        </select>

        {/* Font Size Dropdown */}
        <select
          value={currentSize}
          onChange={handleFontSize}
          className="border rounded px-2 py-1 text-sm text-gray-700 bg-white w-20 focus:outline-none focus:ring-1 focus:ring-green-800 cursor-pointer"
        >
          <option value="">Size</option>
          {FONT_SIZES.map((s) => (
            <option key={s} value={s}>
              {s.replace('px', '')}
            </option>
          ))}
        </select>

        <div className="w-px h-5 bg-gray-300 mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
          title="Bold"
        >
          <b>B</b>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
          title="Italic"
        >
          <i>I</i>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive('underline')}
          title="Underline"
        >
          <u>U</u>
        </ToolbarButton>

        <div className="w-px h-5 bg-gray-300 mx-1" />

        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          active={editor.isActive('heading', { level: 2 })}
          title="Heading"
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          active={editor.isActive('heading', { level: 3 })}
          title="Subheading"
        >
          H3
        </ToolbarButton>

        <div className="w-px h-5 bg-gray-300 mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
          title="Bullet List"
        >
          • List
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
          title="Numbered List"
        >
          1. List
        </ToolbarButton>

        <div className="w-px h-5 bg-gray-300 mx-1" />

        <ToolbarButton
          onClick={() =>
            editor.chain().focus().unsetAllMarks().clearNodes().run()
          }
          active={false}
          title="Clear Formatting"
        >
          ✕ Clear
        </ToolbarButton>
      </div>

      {/* Editor Area */}
      <EditorContent
        editor={editor}
        // className="prose prose-sm max-w-none p-3 min-h-[120px] text-sm text-gray-800 focus:outline-none"
        className="prose prose-sm max-w-none p-3 min-h-[120px] text-sm text-gray-800 outline-none focus:outline-none focus:ring-0"
      />
    </div>
  );
}
