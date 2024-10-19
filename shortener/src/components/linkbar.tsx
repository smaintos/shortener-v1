

// src/components/LinkBar.tsx

import React, { useState } from 'react';
import axios from 'axios';
import {
  FaTwitter,
  FaFacebook,
  FaWhatsapp,
  FaLinkedin,
  FaEnvelope,
  FaGoogle,
} from 'react-icons/fa';

const LinkBar: React.FC = () => {
  const [originalLink, setOriginalLink] = useState('');
  const [shortenedLink, setShortenedLink] = useState('');
  const [gmailComposeUrl, setGmailComposeUrl] = useState('');
  const [twitterUrl, setTwitterUrl] = useState('');
  const [facebookUrl, setFacebookUrl] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [linkedInUrl, setLinkedInUrl] = useState('');
  const [mailtoUrl, setMailtoUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleShortenLink = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        'https://api.tinyurl.com/create',
        {
          url: originalLink,
          domain: 'tiny.one',
        },
        {
          headers: {
            Authorization:
              'Bearer nmAk2hKgjD320LuhVhEs4LHPrD2UmzFiQfuAfB37kXrVp90g697X1Ej2pphh',
            'Content-Type': 'application/json',
          },
        }
      );
      const shortened = response.data.data.tiny_url;
      setShortenedLink(shortened);
      setError('');

      // Générer l'URL de composition de Gmail
      const subject = encodeURIComponent('Voici votre lien raccourci');
      const body = encodeURIComponent(
        `Bonjour,\n\nVoici le lien raccourci : ${shortened}\n\nCordialement,`
      );
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&body=${body}`;
      setGmailComposeUrl(gmailUrl);

      // Générer l'URL de partage Twitter
      const tweetText = encodeURIComponent(
        `Voici le lien raccourci : ${shortened}`
      );
      const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        shortened
      )}&text=${tweetText}`;
      setTwitterUrl(twitterShareUrl);

      // Générer l'URL de partage Facebook
      const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shortened
      )}`;
      setFacebookUrl(fbUrl);

      // Générer l'URL de partage WhatsApp
      const whatsappText = encodeURIComponent(
        `Voici le lien raccourci : ${shortened}`
      );
      const whatsappShareUrl = `https://api.whatsapp.com/send?text=${whatsappText}`;
      setWhatsappUrl(whatsappShareUrl);

      // Générer l'URL de partage LinkedIn
      const linkedInShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
        shortened
      )}&title=${encodeURIComponent('Lien Raccourci')}&summary=${encodeURIComponent(
        'Voici un lien raccourci intéressant.'
      )}&source=${encodeURIComponent('VotreSiteWeb.com')}`;
      setLinkedInUrl(linkedInShareUrl);

      // Générer l'URL mailto
      const emailSubject = encodeURIComponent('Voici votre lien raccourci');
      const emailBody = encodeURIComponent(
        `Bonjour,\n\nVoici le lien raccourci : ${shortened}\n\nCordialement,`
      );
      const mailtoLink = `mailto:?subject=${emailSubject}&body=${emailBody}`;
      setMailtoUrl(mailtoLink);
    } catch (error) {
      setError('Échec du raccourcissement du lien. Veuillez réessayer.');
      setShortenedLink('');
      setGmailComposeUrl('');
      setTwitterUrl('');
      setFacebookUrl('');
      setWhatsappUrl('');
      setLinkedInUrl('');
      setMailtoUrl('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-semibold mb-3 text-gray-800 text-center">
        Raccourcisseur d'URL
      </h2>
      <div className="mb-3">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-gray-800 text-sm"
          placeholder="Entrez votre lien"
          value={originalLink}
          onChange={(e) => setOriginalLink(e.target.value)}
        />
      </div>
      <button
        onClick={handleShortenLink}
        className="w-full p-2 bg-purple-500 text-white font-medium rounded hover:bg-purple-600 transition-colors duration-200 mb-3"
        disabled={isLoading}
      >
        {isLoading ? 'Raccourcissement...' : 'Raccourcir le Lien'}
      </button>
      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
      {shortenedLink && (
        <div className="text-gray-800 text-sm overflow-y-auto flex-1">
          <h3 className="text-base font-semibold mb-2 text-center">
            Lien Raccourci :
          </h3>
          <a
            href={shortenedLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 break-all text-center block mb-4"
          >
            {shortenedLink}
          </a>
          <div className="flex flex-wrap gap-4 justify-center">
            {/* Bouton Gmail */}
            <a
              href={gmailComposeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500 hover:text-red-600 text-2xl"
              aria-label="Envoyer par Gmail"
            >
              <FaGoogle />
            </a>
            {/* Bouton Twitter */}
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-500 text-2xl"
              aria-label="Partager sur Twitter"
            >
              <FaTwitter />
            </a>
            {/* Bouton Facebook */}
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 text-2xl"
              aria-label="Partager sur Facebook"
            >
              <FaFacebook />
            </a>
            {/* Bouton WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-600 text-2xl"
              aria-label="Partager sur WhatsApp"
            >
              <FaWhatsapp />
            </a>
            {/* Bouton LinkedIn */}
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-800 text-2xl"
              aria-label="Partager sur LinkedIn"
            >
              <FaLinkedin />
            </a>
            {/* Bouton Email */}
            <a
              href={mailtoUrl}
              className="text-gray-800 hover:text-gray-900 text-2xl"
              aria-label="Envoyer par Email"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkBar;
