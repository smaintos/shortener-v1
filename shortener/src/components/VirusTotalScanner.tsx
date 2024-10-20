import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface AnalysisResult {
  data: {
    attributes: {
      md5: string;
      sha256: string;
      last_analysis_stats: {
        harmless: number;
        'type-unsupported': number;
        suspicious: number;
        confirmed_timeout: number;
        timeout: number;
        failure: number;
        malicious: number;
        undetected: number;
      };
      last_analysis_results: {
        [engine: string]: {
          category: string;
          result: string | null;
          method: string;
          engine_name: string;
          engine_version: string;
          engine_update: string;
        };
      };
    };
  };
}

const VirusTotalScanner: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [analysisId, setAnalysisId] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // État pour la modale

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setFile(selectedFile || null);
    setAnalysisId(null);
    setAnalysisResult(null);
    setError('');
  };

  const handleFileScan = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setError('');
    setAnalysisResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/scan', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { analysis_id } = response.data;
      setAnalysisId(analysis_id);
    } catch (error) {
      setError('Erreur lors de l\'envoi du fichier.');
      console.error('Erreur lors de l\'envoi du fichier:', error);
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (analysisId) {
      interval = setInterval(async () => {
        try {
          const response = await axios.get(`/api/analysis/${analysisId}`);
          const data = response.data;

          if (data.data.attributes.status === 'completed') {
            const sha256 = data.meta?.file_info?.sha256;

            if (sha256) {
              const fileResponse = await axios.get(`/api/file/${sha256}`);
              const fileData = fileResponse.data;

              setAnalysisResult(fileData);
              setIsAnalyzing(false);
              setIsModalOpen(true); // Ouvrir la modale après analyse
              clearInterval(interval);
            } else {
              setError('Impossible de récupérer le hash du fichier.');
              setIsAnalyzing(false);
              clearInterval(interval);
            }
          }
        } catch (error) {
          setError('Erreur lors de la récupération des résultats.');
          console.error('Erreur lors de la récupération des résultats:', error);
          setIsAnalyzing(false);
          clearInterval(interval);
        }
      }, 5000); // Vérifier toutes les 5 secondes
    }

    return () => {
      clearInterval(interval);
    };
  }, [analysisId]);

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-semibold mb-3 text-slate-100 text-center">
        VirusTotal Scanner
      </h2>
      <p className="text-slate-100 mb-3">
        (1 scan at a time)
      </p>
      <div className="mb-3">
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full p-2 border border-slate-600 rounded bg-slate-700 text-slate-100 text-sm"
        />
      </div>
      <button
        onClick={handleFileScan}
        className="w-full p-2 bg-yellow-600 text-white font-medium rounded hover:bg-yellow-700 transition-colors duration-200 mb-3"
        disabled={!file || isAnalyzing}
      >
        {isAnalyzing ? 'Analyse en cours...' : 'Scanner le Fichier'}
      </button>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      {/* Modale */}
      {isModalOpen && analysisResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-slate-800 p-6 rounded-lg w-4/5 max-h-[90%] overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-white text-2xl"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
            <h3 className="text-lg font-bold mb-2 text-white">Résultats de l'Analyse :</h3>
            <p className="text-white">
              <strong>MD5 :</strong> {analysisResult.data.attributes.md5}
            </p>
            <p className="text-white">
              <strong>SHA256 :</strong> {analysisResult.data.attributes.sha256}
            </p>
            <p className="text-white">
              <strong>Nombre de détections positives :</strong>{' '}
              {analysisResult.data.attributes.last_analysis_stats.malicious}
            </p>
            <p className="text-white">
              <strong>Nombre total de moteurs antivirus :</strong>{' '}
              {Object.values(analysisResult.data.attributes.last_analysis_stats).reduce((a, b) => a + b, 0)}
            </p>
            <div className="mt-2">
              <h4 className="text-base font-semibold mb-1 text-white">Détails des Détections :</h4>
              <ul className="list-disc list-inside h-32 overflow-y-auto text-white">
                {Object.entries(analysisResult.data.attributes.last_analysis_results).map(
                  ([engine, result]) => (
                    <li key={engine}>
                      <strong>{engine}:</strong> {result.category} {result.result ? `- ${result.result}` : ''}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VirusTotalScanner;
