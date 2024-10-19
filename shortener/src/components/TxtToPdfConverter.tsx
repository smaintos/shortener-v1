// src/components/TxtToPdfConverter.tsx

import React, { useState } from 'react';
import jsPDF from 'jspdf';

const TxtToPdfConverter: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    if (selectedFile && selectedFile.type === 'text/plain') {
      setFile(selectedFile);
      setError('');
    } else {
      setFile(null);
      setError('Veuillez sélectionner un fichier .txt valide.');
    }
  };

  const handleConvert = () => {
    if (!file) {
      setError('Aucun fichier sélectionné.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const textContent = e.target?.result;
      if (typeof textContent === 'string') {
        const doc = new jsPDF();
        doc.text(textContent, 10, 10);
        doc.save(`${file.name.replace('.txt', '')}.pdf`);
        setError('');
      } else {
        setError('Erreur lors de la lecture du fichier.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-semibold mb-3 text-gray-800 text-center">
        Convertisseur TXT en PDF
      </h2>
      <div className="mb-3">
        <input
          type="file"
          accept=".txt"
          onChange={handleFileChange}
          className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-gray-800 text-sm"
        />
      </div>
      <button
        onClick={handleConvert}
        className="w-full p-2 bg-red-500 text-white font-medium rounded hover:bg-red-600 transition-colors duration-200 mb-3"
        disabled={!file}
      >
        Convertir en PDF
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default TxtToPdfConverter;
