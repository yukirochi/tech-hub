import { useState } from 'react';
import { FaHome, FaImage, FaFileAlt, FaPen, FaCheckCircle, FaQrcode } from 'react-icons/fa';
import './App.css';
import Home from './pages/Home';
import RemoveBg from './pages/RemoveBg';
import ImageToText from './pages/ImageToText';
import Summarizer from './pages/Summarizer';
import Paraphrase from './pages/Paraphrase';
import GrammarFix from './pages/GrammarFix';
import QrGenerator from './pages/QrGenerator';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'remove-bg':
        return <RemoveBg onBack={() => setCurrentPage('home')} />;
      case 'image-to-text':
        return <ImageToText onBack={() => setCurrentPage('home')} />;
      case 'summarizer':
        return <Summarizer onBack={() => setCurrentPage('home')} />;
      case 'paraphrase':
        return <Paraphrase onBack={() => setCurrentPage('home')} />;
      case 'grammar-fix':
        return <GrammarFix onBack={() => setCurrentPage('home')} />;
      case 'qr-generator':
        return <QrGenerator onBack={() => setCurrentPage('home')} />;
      default:
        return <Home onSelectFeature={setCurrentPage} />;
    }
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar-title">
          <FaImage /> Tech Hub
        </div>
        <ul className="nav-links">
          <li>
            <button
              className={currentPage === 'home' ? 'active' : ''}
              onClick={() => setCurrentPage('home')}
            >
              <FaHome /> Home
            </button>
          </li>
          <li>
            <button
              className={currentPage === 'remove-bg' ? 'active' : ''}
              onClick={() => setCurrentPage('remove-bg')}
            >
              <FaImage /> Remove BG
            </button>
          </li>
          <li>
            <button
              className={currentPage === 'image-to-text' ? 'active' : ''}
              onClick={() => setCurrentPage('image-to-text')}
            >
              <FaFileAlt /> Image to Text
            </button>
          </li>
          <li>
            <button
              className={currentPage === 'summarizer' ? 'active' : ''}
              onClick={() => setCurrentPage('summarizer')}
            >
              <FaFileAlt /> Summarizer
            </button>
          </li>
          <li>
            <button
              className={currentPage === 'paraphrase' ? 'active' : ''}
              onClick={() => setCurrentPage('paraphrase')}
            >
              <FaPen /> Paraphrase
            </button>
          </li>
          <li>
            <button
              className={currentPage === 'grammar-fix' ? 'active' : ''}
              onClick={() => setCurrentPage('grammar-fix')}
            >
              <FaCheckCircle /> Grammar Fix
            </button>
          </li>
          <li>
            <button
              className={currentPage === 'qr-generator' ? 'active' : ''}
              onClick={() => setCurrentPage('qr-generator')}
            >
              <FaQrcode /> QR Code
            </button>
          </li>
        </ul>
      </nav>
      <div className="container">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
