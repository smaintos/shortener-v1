// src/App.tsx

import React from 'react';
import LinkBar from './components/linkbar';
import TxtToPdfConverter from './components/TxtToPdfConverter';
import VirusTotalScanner from './components/VirusTotalScanner';
import PasswordGenerator from './components/PasswordGenerator';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Boîte à Outils Web
      </h1>
      <div className="flex flex-wrap justify-center gap-4">
        <div className="w-full sm:w-1/2 md:w-1/3 max-w-xs">
          <div className="bg-white p-4 rounded shadow-sm h-full max-h-96 overflow-y-auto">
            <LinkBar />
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 max-w-xs">
          <div className="bg-white p-4 rounded shadow-sm h-full max-h-96 overflow-y-auto">
            <TxtToPdfConverter />
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 max-w-xs">
          <div className="bg-white p-4 rounded shadow-sm h-full max-h-96 overflow-y-auto">
            <VirusTotalScanner />
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 max-w-xs">
          <div className="bg-white p-4 rounded shadow-sm h-full max-h-96 overflow-y-auto">
            <PasswordGenerator />
          </div>
        </div>
        {/* Ajoutez d'autres outils ici si nécessaire */}
      </div>
    </div>
  );
};

export default App;
