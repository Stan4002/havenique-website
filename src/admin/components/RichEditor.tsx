import React, { useRef } from 'react';
import { Bold, Italic, List, Link as LinkIcon } from 'lucide-react';
interface RichEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}
export function RichEditor({
  value,
  onChange,
  label = 'Content'
}: RichEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const insertTag = (openTag: string, closeTag: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    const newText =
    text.substring(0, start) +
    openTag +
    selectedText +
    closeTag +
    text.substring(end);
    onChange(newText);
    // Reset focus and selection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + openTag.length, end + openTag.length);
    }, 0);
  };
  return (
    <div className="admin-form-group">
      <label className="admin-label">{label}</label>

      <div
        style={{
          border: '1px solid var(--admin-border)',
          borderRadius: '6px',
          overflow: 'hidden'
        }}>
        
        {/* Toolbar */}
        <div
          style={{
            display: 'flex',
            gap: '4px',
            padding: '8px',
            backgroundColor: 'var(--admin-bg)',
            borderBottom: '1px solid var(--admin-border)'
          }}>
          
          <button
            type="button"
            onClick={() => insertTag('<strong>', '</strong>')}
            className="admin-btn admin-btn-secondary admin-btn-sm"
            title="Bold">
            
            <Bold size={16} />
          </button>
          <button
            type="button"
            onClick={() => insertTag('<em>', '</em>')}
            className="admin-btn admin-btn-secondary admin-btn-sm"
            title="Italic">
            
            <Italic size={16} />
          </button>
          <div
            style={{
              width: '1px',
              backgroundColor: 'var(--admin-border)',
              margin: '0 4px'
            }}>
          </div>
          <button
            type="button"
            onClick={() => insertTag('<h2>', '</h2>')}
            className="admin-btn admin-btn-secondary admin-btn-sm"
            title="Heading 2">
            
            <div size={16} />
          </button>
          <button
            type="button"
            onClick={() => insertTag('<ul>\n  <li>', '</li>\n</ul>')}
            className="admin-btn admin-btn-secondary admin-btn-sm"
            title="Bullet List">
            
            <List size={16} />
          </button>
          <button
            type="button"
            onClick={() => insertTag('<a href="URL_HERE">', '</a>')}
            className="admin-btn admin-btn-secondary admin-btn-sm"
            title="Link">
            
            <LinkIcon size={16} />
          </button>
        </div>

        {/* Editor */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="admin-textarea"
          style={{
            border: 'none',
            borderRadius: 0,
            minHeight: '300px',
            padding: '16px'
          }}
          placeholder="Write your content here... HTML tags are supported." />
        
      </div>
      <div
        style={{
          fontSize: '12px',
          color: 'var(--admin-text-light)',
          marginTop: '8px'
        }}>
        
        Basic HTML tags are supported (e.g., &lt;p&gt;, &lt;strong&gt;,
        &lt;h2&gt;).
      </div>
    </div>);

}