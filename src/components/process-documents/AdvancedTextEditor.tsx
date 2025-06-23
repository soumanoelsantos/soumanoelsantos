
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Bold, Italic, List, ListOrdered, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

interface AdvancedTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

const AdvancedTextEditor = ({ value, onChange, placeholder, rows = 12 }: AdvancedTextEditorProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertText = (beforeText: string, afterText: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    const newText = value.substring(0, start) + beforeText + selectedText + afterText + value.substring(end);
    onChange(newText);

    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + beforeText.length, end + beforeText.length);
    }, 0);
  };

  const formatBold = () => insertText('**', '**');
  const formatItalic = () => insertText('*', '*');
  const insertBulletList = () => {
    const lines = value.split('\n');
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const lineStart = value.lastIndexOf('\n', start - 1) + 1;
    const lineEnd = value.indexOf('\n', start);
    const currentLine = lineEnd === -1 ? value.substring(lineStart) : value.substring(lineStart, lineEnd);
    
    if (!currentLine.trim().startsWith('• ')) {
      insertText('• ');
    }
  };

  const insertNumberedList = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const lineStart = value.lastIndexOf('\n', start - 1) + 1;
    insertText('1. ');
  };

  const insertHeading = () => insertText('## ');

  return (
    <div className="space-y-2">
      <div className="flex gap-1 p-2 border rounded-lg bg-gray-50">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={formatBold}
          title="Negrito"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={formatItalic}
          title="Itálico"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={insertBulletList}
          title="Lista com marcadores"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={insertNumberedList}
          title="Lista numerada"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={insertHeading}
          title="Título"
        >
          <strong>H</strong>
        </Button>
      </div>
      
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="min-h-[300px] font-mono text-sm"
      />
      
      <div className="text-xs text-gray-500 space-y-1">
        <p><strong>Dicas de formatação:</strong></p>
        <p>• **texto** para <strong>negrito</strong></p>
        <p>• *texto* para <em>itálico</em></p>
        <p>• ## Título para criar títulos</p>
        <p>• • Item para listas com marcadores</p>
        <p>• 1. Item para listas numeradas</p>
      </div>
    </div>
  );
};

export default AdvancedTextEditor;
