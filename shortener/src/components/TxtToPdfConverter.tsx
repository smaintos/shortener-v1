// src/components/TxtToPdfConverter.tsx
import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

const TxtToPdfConverter: React.FC = () => {
  const [textContent, setTextContent] = useState('');
  const [fileName, setFileName] = useState('document.pdf');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        if (typeof text === 'string') {
          setTextContent(text);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleGeneratePdf = () => {
    const doc = new jsPDF();
    const lines = doc.splitTextToSize(textContent, 180);
    doc.text(lines, 10, 10);
    doc.save(fileName);
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-center text-slate-100">
        Convertisseur TXT en PDF
      </h2>
      <div className="mb-4">
        <input
          type="file"
          accept=".txt"
          onChange={handleFileChange}
          className="w-full p-2 border border-slate-600 rounded bg-slate-700 text-slate-100"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="w-full p-2 border border-slate-600 rounded bg-slate-700 text-slate-100"
          placeholder="Nom du fichier PDF"
        />
      </div>
      <button
        onClick={handleGeneratePdf}
        className="w-full p-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
        disabled={!textContent}
      >
        Générer le PDF
      </button>
    </div>
  );
};

export default TxtToPdfConverter;
