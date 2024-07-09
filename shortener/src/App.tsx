import React from 'react';
import LinkBar from './components/linkbar';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <LinkBar />
    </div>
  );
}

export default App;
