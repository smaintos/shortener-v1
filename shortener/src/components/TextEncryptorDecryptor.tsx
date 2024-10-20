import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

const TextEncryptorDecryptor: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [key, setKey] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleEncrypt = () => {
    if (text.trim() === '' || key.trim() === '') {
      setError('Le texte et la clé sont requis pour l\'encryptage.');
      return;
    }
    setError('');
    try {
      const encrypted = CryptoJS.AES.encrypt(text, key).toString();
      setResult(encrypted);
    } catch (e) {
      setError('Erreur lors de l\'encryptage du texte.');
      console.error(e);
    }
  };

  const handleDecrypt = () => {
    if (text.trim() === '' || key.trim() === '') {
      setError('Le texte et la clé sont requis pour le décryptage.');
      return;
    }
    setError('');
    try {
      const bytes = CryptoJS.AES.decrypt(text, key);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);

      if (decrypted === '') {
        setError('Le décryptage a échoué. Vérifiez la clé et le texte.');
      } else {
        setResult(decrypted);
      }
    } catch (e) {
      setError('Erreur lors du décryptage du texte.');
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-semibold mb-3 text-slate-100 text-center">
        Text Crypt
      </h2>
      <div className="mb-3">
        <textarea
          className="w-full p-2 border border-slate-600 rounded bg-slate-700 text-slate-100 text-sm mb-3"
          placeholder="Entrez le texte à chiffrer ou déchiffrer"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
        />
        <input
          type="text"
          className="w-full p-2 border border-slate-600 rounded bg-slate-700 text-slate-100 text-sm mb-3"
          placeholder="Entrez la clé secrète"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
      </div>
      <div className="flex justify-between gap-2">
        <button
          onClick={handleEncrypt}
          className="w-1/2 p-2 bg-green-600 text-white font-medium rounded hover:bg-green-700 transition-colors duration-200"
        >
          Chiffrer le Texte
        </button>
        <button
          onClick={handleDecrypt}
          className="w-1/2 p-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors duration-200"
        >
          Déchiffrer le Texte
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
      {result && (
        <div className="mt-4 text-slate-100 text-sm">
          <h3 className="text-base font-semibold mb-2 text-center">
            Résultat :
          </h3>
          <textarea
            className="w-full p-2 border border-slate-600 rounded bg-slate-700 text-slate-100 text-sm"
            value={result}
            readOnly
            rows={4}
          />
        </div>
      )}
    </div>
  );
};

export default TextEncryptorDecryptor;
