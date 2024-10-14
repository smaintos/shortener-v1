import React from 'react';
import LinkBar from './components/linkbar';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <LinkBar />
    </div>
  );
};

export default App;
