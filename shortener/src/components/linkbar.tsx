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

  const handleShortenLink = async () => {
    try {
      const response = await axios.post(
        'https://api.tinyurl.com/create',
        {
          url: originalLink,
          domain: 'tiny.one',
        },
        {
          headers: {
            Authorization: 'Bearer nmAk2hKgjD320LuhVhEs4LHPrD2UmzFiQfuAfB37kXrVp90g697X1Ej2pphh',
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
      const tweetText = encodeURIComponent(`Voici le lien raccourci : ${shortened}`);
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
      const whatsappText = encodeURIComponent(`Voici le lien raccourci : ${shortened}`);
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
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-slate-800 shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4 text-center text-slate-100">
        Link Shortener v1
      </h2>
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 border border-slate-600 rounded bg-slate-700 text-slate-100 placeholder-slate-400"
          placeholder="Entrez votre lien"
          value={originalLink}
          onChange={(e) => setOriginalLink(e.target.value)}
        />
      </div>
      <button
        onClick={handleShortenLink}
        className="w-full p-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
      >
        Raccourcir le Lien
      </button>
      {error && <div className="mt-4 text-red-500">{error}</div>}
      {shortenedLink && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-slate-100">Lien Raccourci :</h3>
          <a
            href={shortenedLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 break-all"
          >
            {shortenedLink}
          </a>
          <div className="mt-4 flex flex-wrap gap-4">
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
              className="text-slate-100 hover:text-slate-200 text-2xl"
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
