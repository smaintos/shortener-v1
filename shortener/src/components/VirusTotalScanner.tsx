// src/components/VirusTotalScanner.tsx

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
      // Envoyer le fichier au backend
      const response = await axios.post('http://localhost:5000/scan', formData, {
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
          // Obtenir les résultats de l'analyse depuis le backend
          const response = await axios.get(`http://localhost:5000/analysis/${analysisId}`);
          const data = response.data;

          console.log('Données d\'analyse:', data);

          if (data.data.attributes.status === 'completed') {
            // Obtenir le SHA256 du fichier
            const sha256 = data.meta?.file_info?.sha256;

            if (sha256) {
              // Récupérer les résultats détaillés du fichier
              const fileResponse = await axios.get(`http://localhost:5000/file/${sha256}`);
              const fileData = fileResponse.data;

              console.log('Données du fichier:', fileData);

              setAnalysisResult(fileData);
              setIsAnalyzing(false);
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
      <h2 className="text-xl font-semibold mb-3 text-gray-800 text-center">
        Analyse de Fichier VirusTotal
      </h2>
      <div className="mb-3">
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-gray-800 text-sm"
        />
      </div>
      <button
        onClick={handleFileScan}
        className="w-full p-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition-colors duration-200 mb-3"
        disabled={!file || isAnalyzing}
      >
        {isAnalyzing ? 'Analyse en cours...' : 'Scanner le Fichier'}
      </button>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      {analysisResult && (
        <div className="text-gray-800 text-sm overflow-y-auto">
          <h3 className="text-lg font-bold mb-2">Résultats de l'Analyse :</h3>
          <p>
            <strong>MD5 :</strong> {analysisResult.data.attributes.md5}
          </p>
          <p>
            <strong>SHA256 :</strong> {analysisResult.data.attributes.sha256}
          </p>
          <p>
            <strong>Nombre de détections positives :</strong>{' '}
            {analysisResult.data.attributes.last_analysis_stats.malicious}
          </p>
          <p>
            <strong>Nombre total de moteurs antivirus :</strong>{' '}
            {Object.values(analysisResult.data.attributes.last_analysis_stats).reduce((a, b) => a + b, 0)}
          </p>
          <div className="mt-2">
            <h4 className="text-base font-semibold mb-1">Détails des Détections :</h4>
            <ul className="list-disc list-inside h-32 overflow-y-auto">
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
      )}
    </div>
  );
};

export default VirusTotalScanner;
