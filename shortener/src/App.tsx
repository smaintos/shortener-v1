// src/App.tsx
import React from 'react';
import LinkBar from './components/linkbar';
import TxtToPdfConverter from './components/TxtToPdfConverter';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 p-10">
      <h1 className="text-4xl font-bold text-center text-slate-100 mb-10">
        Boîte à Outils Web
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-slate-800 p-6 rounded shadow-md">
          <LinkBar />
        </div>
        <div className="bg-slate-800 p-6 rounded shadow-md">
          <TxtToPdfConverter />
        </div>
        {/* Ajoutez d'autres outils ici en les enveloppant dans des div similaires */}
      </div>
    </div>
  );
};

export default App;
