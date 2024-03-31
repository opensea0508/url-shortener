import React, { useState } from 'react';

const URLShortenerForm: React.FC = () => {
  const [url, setUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // You would call your backend API endpoint to shorten the URL here
    try {
      const response = await fetch('http://localhost:5000/api/url/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalUrl: url }),
      });
      const data = await response.json();
      console.log(data)
      setShortenedUrl(`http://localhost:5000/${data.slug}`);
      setShowSuccess(true);
    } catch (error) {
      console.error('Error shortening URL:', error);
      // Handle the error state appropriately here
    }
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(shortenedUrl).then(() => {
      // Display a success message or indicate somehow that the URL was copied
      console.log('Shortened URL copied to clipboard!');
    });
  };

  return (
    <div>
      {!showSuccess ? (
        <div> {/* Form Container */}
          <form onSubmit={handleSubmit}>
            <label htmlFor="url">URL</label>
            <input
              id="url"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter the URL to shorten"
              required
            />
            <button type="submit">Shorten</button>
          </form>
        </div>
      ) : (
        <div> {/* Success Container */}
          <p>Success! Here's your short URL:</p>
          <p>{shortenedUrl}</p>
          <button onClick={handleCopyClick}>Copy</button>
        </div>
      )}
    </div>
  );
};

export default URLShortenerForm;