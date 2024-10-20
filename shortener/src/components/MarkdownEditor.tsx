// src/components/MarkdownEditor.tsx

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import TextareaAutosize from 'react-textarea-autosize';
import {FaCopy } from 'react-icons/fa';

const MarkdownEditor: React.FC = () => {
  const [markdownText, setMarkdownText] = useState<string>('');

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownText(event.target.value);
  };

  const handleDownload = () => {
    const blob = new Blob([markdownText], { type: 'text/markdown' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'markdown-content.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = () => {
    if (markdownText) {
      navigator.clipboard.writeText(markdownText);
      alert('Texte copié dans le presse-papiers !');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-semibold mb-3 text-slate-100 text-center">
        Markdown Editor
      </h2>
      <div className="mb-3">
        <TextareaAutosize
          minRows={5}
          className="w-full p-2 border border-slate-600 rounded bg-slate-700 text-slate-100 text-sm resize-none"
          placeholder="Entrez votre texte en Markdown..."
          value={markdownText}
          onChange={handleTextChange}
        />
      </div>
      <div className="flex justify-between mt-3">
        <button
          onClick={handleDownload}
          className="p-2 bg-green-600 text-white font-medium rounded hover:bg-green-700 transition-colors duration-200 flex items-center gap-2"
        >Download
        </button>
        <button
          onClick={copyToClipboard}
          className="p-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors duration-200 flex items-center gap-2"
        >
          <FaCopy /> Copy
        </button>
      </div>
      <div className="bg-slate-700 p-4 rounded mt-4">
        <h3 className="text-lg font-bold text-slate-100 mb-2">Markdown :</h3>
        <div className="bg-slate-800 p-3 rounded-md text-slate-100">
          <ReactMarkdown>{markdownText}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;
