// src/components/QrCodeGenerator.tsx

import React, { useState } from 'react';
import QRCode from 'react-qr-code'; 
import { FaCopy } from 'react-icons/fa';

const QrCodeGenerator: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [showQrCode, setShowQrCode] = useState<boolean>(false);

  const handleGenerate = () => {
    if (text.trim() !== '') {
      setShowQrCode(true);
    }
  };

  const copyToClipboard = () => {
    if (text) {
      navigator.clipboard.writeText(text);
      alert('Texte copié dans le presse-papiers !');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-semibold mb-3 text-slate-100 text-center">
        Générateur de QR Code
      </h2>
      <div className="mb-3">
        <input
          type="text"
          className="w-full p-2 border border-slate-600 rounded bg-slate-700 text-slate-100 text-sm"
          placeholder="Entrez le texte ou l'URL à convertir en QR Code"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <button
        onClick={handleGenerate}
        className="w-full p-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors duration-200 mb-3"
      >
        Générer le QR Code
      </button>
      {showQrCode && (
        <div className="flex flex-col items-center justify-center mt-4">
          <QRCode value={text} size={128} fgColor="#FFFFFF" bgColor="#1E293B" />
          <button
            onClick={copyToClipboard}
            className="mt-3 p-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors duration-200 flex items-center gap-2"
          >
            <FaCopy /> Copier le Texte
          </button>
        </div>
      )}
    </div>
  );
};

export default QrCodeGenerator;
