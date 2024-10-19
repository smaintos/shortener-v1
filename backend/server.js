// backend/server.js

require('dotenv').config();
const express = require('express');
const multer = require('multer');
const axios = require('axios');
const cors = require('cors');
const FormData = require('form-data'); // Importer le module form-data

const app = express();
const upload = multer();

app.use(cors());
app.use(express.json());

const API_KEY = process.env.VIRUSTOTAL_API_KEY;

app.post('/scan', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'Aucun fichier fourni.' });
    }

    // Créer un FormData pour envoyer le fichier à VirusTotal
    const formData = new FormData();
    formData.append('file', file.buffer, file.originalname);

    // Envoyer le fichier à VirusTotal
    const response = await axios.post(
      'https://www.virustotal.com/api/v3/files',
      formData,
      {
        headers: {
          'x-apikey': API_KEY,
          ...formData.getHeaders(),
        },
      }
    );

    // Renvoyer l'ID d'analyse au frontend
    res.status(200).json({ analysis_id: response.data.data.id });
  } catch (error) {
    console.error('Erreur lors du scan du fichier:', error.response?.data || error.message);
    res.status(500).json({ error: 'Erreur lors du scan du fichier.' });
  }
});

app.get('/analysis/:id', async (req, res) => {
  try {
    const analysisId = req.params.id;

    if (!analysisId) {
      return res.status(400).json({ error: 'Aucun ID d\'analyse fourni.' });
    }

    // Obtenir les résultats de l'analyse
    const response = await axios.get(
      `https://www.virustotal.com/api/v3/analyses/${analysisId}`,
      {
        headers: {
          'x-apikey': API_KEY,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Erreur lors de la récupération des résultats d\'analyse:', error.response?.data || error.message);
    res.status(500).json({ error: 'Erreur lors de la récupération des résultats.' });
  }
});

app.get('/file/:hash', async (req, res) => {
  try {
    const fileHash = req.params.hash;

    if (!fileHash) {
      return res.status(400).json({ error: 'Aucun hash de fichier fourni.' });
    }

    // Obtenir le rapport détaillé du fichier
    const response = await axios.get(
      `https://www.virustotal.com/api/v3/files/${fileHash}`,
      {
        headers: {
          'x-apikey': API_KEY,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Erreur lors de la récupération du rapport du fichier:', error.response?.data || error.message);
    res.status(500).json({ error: 'Erreur lors de la récupération du rapport du fichier.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur le port ${PORT}`);
});
