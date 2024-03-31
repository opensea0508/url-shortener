import React from 'react';
import logo from './logo.svg';
import './App.css';
import URLShortenerForm from './components/URLShortenerForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <URLShortenerForm />
      </header>
    </div>
  );
}

export default App;
