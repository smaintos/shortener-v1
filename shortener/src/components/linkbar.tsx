import React, { useState } from 'react';
import axios from 'axios';

const LinkBar: React.FC = () => {
  const [originalLink, setOriginalLink] = useState('');
  const [shortenedLink, setShortenedLink] = useState('');
  const [error, setError] = useState('');

  const handleShortenLink = async () => {
    try {
      const response = await axios.post('https://api.tinyurl.com/create', {
        url: originalLink,
        domain: 'tiny.one'
      }, {
        headers: {
          Authorization: 'Bearer nmAk2hKgjD320LuhVhEs4LHPrD2UmzFiQfuAfB37kXrVp90g697X1Ej2pphh',
          'Content-Type': 'application/json'
        }
      });
      setShortenedLink(response.data.data.tiny_url);
      setError('');
    } catch (error) {
      setError('Failed to shorten the link. Please try again.');
      setShortenedLink('');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Link Shortener</h2>
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter your link"
          value={originalLink}
          onChange={(e) => setOriginalLink(e.target.value)}
        />
      </div>
      <button
        onClick={handleShortenLink}
        className="w-full p-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
      >
        Shorten Link
      </button>
      {error && (
        <div className="mt-4 text-red-500">
          {error}
        </div>
      )}
      {shortenedLink && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Shortened Link:</h3>
          <a
            href={shortenedLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            {shortenedLink}
          </a>
        </div>
      )}
    </div>
  );
};

export default LinkBar;
