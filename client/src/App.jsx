import { useState, useEffect } from 'react';
import { FaHome, FaTools, FaInfoCircle, FaBars, FaTimes, FaChevronDown, FaComments, FaGraduationCap } from 'react-icons/fa';
import './App.css';
import ConnectionStatus from './components/ConnectionStatus';
import Landing from './pages/Landing';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Feedback from './pages/Feedback';
import AdminDashboard from './pages/AdminDashboard';
import CourseGuide from './pages/CourseGuide';
import RemoveBg from './pages/RemoveBg';
import ImageToText from './pages/ImageToText';
import Summarizer from './pages/Summarizer';
import Paraphrase from './pages/Paraphrase';
import GrammarFix from './pages/GrammarFix';
import QrGenerator from './pages/QrGenerator';
import PdfConverter from './pages/PdfConverter';
import PlagiarismChecker from './pages/PlagiarismChecker';
import EssayOutline from './pages/EssayOutline';
import Footer from './components/Footer';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  // Check URL for admin access
  useEffect(() => {
    if (window.location.pathname === '/admin' || window.location.hash === '#/admin') {
      setCurrentPage('admin');
    }
  }, []);

  const renderPage = () => {
    // Admin page - separate from main site
    if (currentPage === 'admin') {
      return <AdminDashboard onBack={() => {
        setCurrentPage('landing');
        window.location.hash = '';
      }} />;
    }

    switch (currentPage) {
      case 'landing':
        return <Landing onGetStarted={() => setCurrentPage('home')} />;
      case 'home':
        return <Home onSelectFeature={setCurrentPage} />;
      case 'about':
        return <AboutUs onBack={() => setCurrentPage('landing')} />;
      case 'feedback':
        return <Feedback onBack={() => setCurrentPage('landing')} />;
      case 'courses':
        return <CourseGuide onBack={() => setCurrentPage('landing')} />;
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
      case 'pdf-converter':
        return <PdfConverter onBack={() => setCurrentPage('home')} />;
      case 'plagiarism-checker':
        return <PlagiarismChecker onBack={() => setCurrentPage('home')} />;
      case 'essay-outline':
        return <EssayOutline onBack={() => setCurrentPage('home')} />;
      default:
        return <Landing onGetStarted={() => setCurrentPage('home')} />;
    }
  };

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    setToolsDropdownOpen(false);
  };

  // Don't show navbar and footer on admin page
  const isAdminPage = currentPage === 'admin';

  return (
    <div className="app">
      {!isAdminPage && (
        <nav className="navbar">
          <div className="navbar-left">
            <div className="navbar-title" onClick={() => handleNavClick('landing')}>
              <span className="logo-icon">🚀</span> Tech Hub
            </div>
          </div>
          
          <button className="hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
          
          <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <li>
              <button
                className={currentPage === 'landing' ? 'active' : ''}
                onClick={() => handleNavClick('landing')}
              >
                <FaHome /> Home
              </button>
            </li>
            <li className="dropdown">
              <button
                className={currentPage === 'home' || ['remove-bg', 'image-to-text', 'summarizer', 'paraphrase', 'grammar-fix', 'qr-generator', 'pdf-converter', 'plagiarism-checker', 'essay-outline'].includes(currentPage) ? 'active' : ''}
                onClick={() => {
                  setToolsDropdownOpen(!toolsDropdownOpen);
                  if (window.innerWidth > 768) return;
                  handleNavClick('home');
                }}
              >
                <FaTools /> Academic Tools <FaChevronDown className="dropdown-icon" />
              </button>
              <ul className={`dropdown-menu ${toolsDropdownOpen ? 'show' : ''}`}>
                <li><button onClick={() => handleNavClick('home')}>All Tools</button></li>
                <li><button onClick={() => handleNavClick('summarizer')}>Summarizer</button></li>
                <li><button onClick={() => handleNavClick('paraphrase')}>Paraphrase</button></li>
                <li><button onClick={() => handleNavClick('grammar-fix')}>Grammar Fix</button></li>
                <li><button onClick={() => handleNavClick('plagiarism-checker')}>Plagiarism Checker</button></li>
                <li><button onClick={() => handleNavClick('essay-outline')}>Essay Outline</button></li>
                <li><button onClick={() => handleNavClick('image-to-text')}>Image to Text</button></li>
                <li><button onClick={() => handleNavClick('pdf-converter')}>PDF Converter</button></li>
                <li><button onClick={() => handleNavClick('qr-generator')}>QR Generator</button></li>
                <li><button onClick={() => handleNavClick('remove-bg')}>Remove Background</button></li>
              </ul>
            </li>
            <li>
              <button
                className={currentPage === 'courses' ? 'active' : ''}
                onClick={() => handleNavClick('courses')}
              >
                <FaGraduationCap /> Courses
              </button>
            </li>
            <li>
              <button
                className={currentPage === 'about' ? 'active' : ''}
                onClick={() => handleNavClick('about')}
              >
                <FaInfoCircle /> About Us
              </button>
            </li>
            <li>
              <button
                className={currentPage === 'feedback' ? 'active' : ''}
                onClick={() => handleNavClick('feedback')}
              >
                <FaComments /> Feedback
              </button>
            </li>
          </ul>
          
          <div className="navbar-right">
            <ConnectionStatus />
          </div>
        </nav>
      )}
      
      <div className="container">
        {renderPage()}
      </div>
      
      {!isAdminPage && <Footer />}
    </div>
  );
}

export default App;
