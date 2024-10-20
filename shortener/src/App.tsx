// src/App.tsx

import React from 'react';
import LinkBar from './components/LinkBar';
import TxtToPdfConverter from './components/TxtToPdfConverter';
import VirusTotalScanner from './components/VirusTotalScanner';
import PasswordGenerator from './components/PasswordGenerator';
import PseudoGenerator from './components/PseudoGenerator'; 
import QrCodeGenerator from './components/QrCodeGenerator'; 
import MarkdownEditor from './components/MarkdownEditor';
import TextEncryptorDecryptor from './components/TextEncryptorDecryptor';
import ToDoList from './components/ToDoList';
import JsonCsvConverter from './components/JsonReader';


const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-800 p-4">
      <h1 className="text-3xl font-bold text-center text-slate-100 mb-6">
        Little Tools 🔨
      </h1>
      <div className="flex flex-wrap justify-center gap-4">
        <div className="w-full sm:w-1/2 md:w-1/3 max-w-xs">
          <div className="bg-slate-700 p-4 rounded shadow-sm h-full max-h-96 overflow-y-auto ">
            <LinkBar />
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 max-w-xs">
          <div className="bg-slate-700 p-4 rounded shadow-sm h-full max-h-96 overflow-y-auto ">
            <TxtToPdfConverter />
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 max-w-xs">
          <div className="bg-slate-700 p-4 rounded shadow-sm h-full max-h-96 overflow-y-auto ">
            <VirusTotalScanner />
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 max-w-xs">
          <div className="bg-slate-700 p-4 rounded shadow-sm h-full max-h-96 overflow-y-auto ">
            <PasswordGenerator />
          </div>
          </div>
        <div className="w-full sm:w-1/2 md:w-1/3 max-w-xs">
          <div className="bg-slate-700 p-4 rounded shadow-sm h-full max-h-96 overflow-y-auto">
            <PseudoGenerator /> 
          </div>
          </div>
        <div className="w-full sm:w-1/2 md:w-1/3 max-w-xs">
          <div className="bg-slate-700 p-4 rounded shadow-sm h-full max-h-96 overflow-y-auto">
            <QrCodeGenerator /> 
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 max-w-xs">
          <div className="bg-slate-700 p-4 rounded shadow-sm h-full max-h-96 overflow-y-auto">
            <MarkdownEditor /> 
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 max-w-xs">
          <div className="bg-slate-700 p-4 rounded shadow-sm h-full max-h-96 overflow-y-auto">
            <TextEncryptorDecryptor /> 
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 max-w-xs">
          <div className="bg-slate-700 p-4 rounded shadow-sm h-full max-h-96 overflow-y-auto">
            <ToDoList /> 
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 max-w-xs">
          <div className="bg-slate-700 p-4 rounded shadow-sm h-full max-h-96 overflow-y-auto">
            <JsonCsvConverter/> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
