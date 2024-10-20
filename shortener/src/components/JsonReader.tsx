import React, { useState } from 'react';
import { FaCopy, FaTimes } from 'react-icons/fa';

const JsonReader: React.FC = () => {
  const [jsonContent, setJsonContent] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);

  // Fonction pour gérer la sélection d'un fichier
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const result = e.target?.result as string;
          const parsedJson = JSON.parse(result);
          setJsonContent(JSON.stringify(parsedJson, null, 2));
          setError('');
          setShowModal(true); // Ouvrir la fenêtre modale une fois le fichier chargé
        } catch (e) {
          setError('Erreur lors de la lecture du fichier JSON. Assurez-vous qu\'il est valide.');
          setJsonContent('');
        }
      };
      reader.readAsText(file);
    }
  };

  // Fonction pour copier le contenu JSON dans le presse-papiers
  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonContent);
    alert('Contenu JSON copié dans le presse-papiers !');
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-semibold mb-3 text-slate-100 text-center">
        Json Reader
      </h2>
      <div className="mb-3">
        <input
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="w-full p-2 border border-slate-600 rounded bg-slate-700 text-slate-100 text-sm"
        />
      </div>
      {jsonContent && !showModal && (
        <div className="mt-3 text-center">
          <button
            onClick={() => setShowModal(true)}
            className="p-3 bg-green-600 text-white font-medium rounded hover:bg-green-700 transition-colors duration-200"
          >
            Result
          </button>
        </div>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Fenêtre Modale pour afficher le contenu JSON */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-700 p-8 rounded shadow-lg max-w-5xl w-full max-h-[80vh] relative overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-slate-100 hover:text-red-400"
              onClick={() => setShowModal(false)}
            >
              <FaTimes size={24} />
            </button>
            <h3 className="text-2xl font-bold mb-6 text-slate-100 text-center">Json Content</h3>
            <div className="bg-slate-800 p-6 rounded text-sm text-slate-100">
              <pre>{jsonContent}</pre>
            </div>
            <div className="mt-6 text-center">
              <button
                onClick={copyToClipboard}
                className="p-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors duration-200"
              >
                <FaCopy className="inline-block mr-2" /> Copy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default JsonReader;
