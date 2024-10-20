// src/components/PseudoGenerator.tsx

import React, { useState } from 'react';
import { FaCopy } from 'react-icons/fa';

const adjectives = [
  'Dark',
  'Silent',
  'Epic',
  'Swift',
  'Furious',
  'Crazy',
  'Legendary',
  'Mystic',
  'Shadow',
  'Fatal',
  'Atomic',
  'Invisible',
  'Wild',
  'Cyber',
  'Dragon',
  'Ghost',
  'Infernal',
  'Electric',
  'Brave',
  'Frozen',
];

const nouns = [
  'Warrior',
  'Ninja',
  'Gamer',
  'Hunter',
  'Sniper',
  'Wizard',
  'Knight',
  'Samurai',
  'Assassin',
  'Beast',
  'Phoenix',
  'Dragon',
  'Shadow',
  'Ghost',
  'Titan',
  'Viper',
  'Wolf',
  'Ranger',
  'Savior',
  'Guardian',
];

const specialChars = ['_', '-', '.'];

const PseudoGenerator: React.FC = () => {
  const [pseudo, setPseudo] = useState<string>('');
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
  const [includeSpecialChars, setIncludeSpecialChars] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const generatePseudo = () => {
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

    let newPseudo = `${randomAdjective}${randomNoun}`;

    if (includeSpecialChars) {
      const randomChar = specialChars[Math.floor(Math.random() * specialChars.length)];
      newPseudo = `${randomAdjective}${randomChar}${randomNoun}`;
    }

    if (includeNumbers) {
      const randomNumber = Math.floor(Math.random() * 1000); // Nombre aléatoire entre 0 et 999
      newPseudo = `${newPseudo}${randomNumber}`;
    }

    setPseudo(newPseudo);
    setError('');
  };

  const copyToClipboard = () => {
    if (pseudo) {
      navigator.clipboard.writeText(pseudo);
      alert('Pseudo copié dans le presse-papiers !');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-semibold mb-3 text-slate-100 text-center">
        Générateur de Pseudos
      </h2>
      <div className="mb-3">
        <label className="inline-flex items-center text-slate-100 text-sm">
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2">Inclure des Chiffres</span>
        </label>
      </div>
      <div className="mb-3">
        <label className="inline-flex items-center text-slate-100 text-sm">
          <input
            type="checkbox"
            checked={includeSpecialChars}
            onChange={(e) => setIncludeSpecialChars(e.target.checked)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2">Inclure des Caractères Spéciaux (_ - .)</span>
        </label>
      </div>
      <button
        onClick={generatePseudo}
        className="w-full p-2 bg-purple-600 text-white font-medium rounded hover:bg-purple-700 transition-colors duration-200 mb-3"
      >
        Générer un Pseudo
      </button>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      {pseudo && (
        <div className="flex items-center justify-center mb-4">
          <input
            type="text"
            value={pseudo}
            readOnly
            className="w-full p-2 border border-slate-600 rounded bg-slate-700 text-slate-100 text-sm"
          />
          <button
            onClick={copyToClipboard}
            className="ml-2 p-2 text-slate-100 hover:text-slate-200"
            aria-label="Copier le pseudo"
          >
            <FaCopy />
          </button>
        </div>
      )}
    </div>
  );
};

export default PseudoGenerator;
