// src/components/PasswordGenerator.tsx

import React, { useState } from 'react';
import { FaCopy } from 'react-icons/fa';

const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState<string>('');

  const generatePassword = () => {
    const length = 16; // Longueur du mot de passe
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()-_=+[]{}|;:,.<>?';

    const allChars = uppercaseChars + lowercaseChars + numbers + specialChars;

    let generatedPassword = '';

    // Assurer que le mot de passe contient au moins un caractère de chaque type
    generatedPassword += uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
    generatedPassword += lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
    generatedPassword += numbers[Math.floor(Math.random() * numbers.length)];
    generatedPassword += specialChars[Math.floor(Math.random() * specialChars.length)];

    // Remplir le reste du mot de passe
    for (let i = 4; i < length; i++) {
      generatedPassword += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Mélanger les caractères pour éviter que les premiers soient toujours dans le même ordre
    setPassword(shuffleString(generatedPassword));
  };

  const shuffleString = (str: string) => {
    return str
      .split('')
      .sort(() => 0.5 - Math.random())
      .join('');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert('Mot de passe copié dans le presse-papiers !');
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-semibold mb-3 text-gray-800 text-center">
        Générateur de Mots de Passe
      </h2>
      <div className="mb-3 flex items-center">
        <input
          type="text"
          value={password}
          readOnly
          className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-gray-800 text-sm"
          placeholder="Votre mot de passe apparaîtra ici"
        />
        {password && (
          <button
            onClick={copyToClipboard}
            className="ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
          >
            <FaCopy />
          </button>
        )}
      </div>
      <button
        onClick={generatePassword}
        className="w-full p-2 bg-green-500 text-white font-medium rounded hover:bg-green-600 transition-colors duration-200"
      >
        Générer un Mot de Passe
      </button>
    </div>
  );
};

export default PasswordGenerator;
