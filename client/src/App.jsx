import { useState, useEffect } from 'react';
import { FaHome, FaTools, FaInfoCircle, FaBars, FaTimes, FaComments, FaGraduationCap, FaBookOpen } from 'react-icons/fa';
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
        <>
          {/* Mobile Overlay */}
          <div 
            className={`sidebar-overlay ${mobileMenuOpen ? 'mobile-open' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          ></div>

          {/* Sidebar Navigation */}
          <aside className={`sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <div className="sidebar-header">
              <div className="sidebar-title" onClick={() => handleNavClick('landing')}>
                <FaBookOpen className="logo-icon" /> Tech Hub
              </div>
              <button className="sidebar-close" onClick={() => setMobileMenuOpen(false)}>
                <FaTimes />
              </button>
            </div>
            
            <div className="sidebar-nav">
              <div className="nav-section-title">Main Menu</div>
              <div className="nav-links">
                <button className={currentPage === 'landing' ? 'active' : ''} onClick={() => handleNavClick('landing')}>
                  <FaHome /> Home
                </button>
                <button className={currentPage === 'home' || ['remove-bg', 'image-to-text', 'summarizer', 'paraphrase', 'grammar-fix', 'qr-generator', 'pdf-converter', 'plagiarism-checker', 'essay-outline'].includes(currentPage) ? 'active' : ''} onClick={() => handleNavClick('home')}>
                  <FaTools /> Academic Tools
                </button>
                <button className={currentPage === 'courses' ? 'active' : ''} onClick={() => handleNavClick('courses')}>
                  <FaGraduationCap /> Courses
                </button>
                <button className={currentPage === 'about' ? 'active' : ''} onClick={() => handleNavClick('about')}>
                  <FaInfoCircle /> About Us
                </button>
                <button className={currentPage === 'feedback' ? 'active' : ''} onClick={() => handleNavClick('feedback')}>
                  <FaComments /> Feedback
                </button>
              </div>
            </div>
            
            <div className="sidebar-footer">
              <ConnectionStatus />
            </div>
          </aside>
        </>
      )}
      
      <main className={!isAdminPage ? 'main-content' : ''}>
        {!isAdminPage && (
          <div className="mobile-topbar">
            <div className="mobile-title" onClick={() => handleNavClick('landing')}>
              <FaBookOpen style={{color: '#16a34a'}}/> Tech Hub
            </div>
            {/* The hamburger is generally removed below 640px, but kept for 640px-768px tablet sizes if needed in CSS */}
            <button className="hamburger" onClick={() => setMobileMenuOpen(true)}>
              <FaBars />
            </button>
          </div>
        )}
        
        <div className="container">
          {renderPage()}
        </div>
        
        {!isAdminPage && <Footer />}
        
        {/* Mobile Bottom Navigation (<640px) */}
        {!isAdminPage && (
          <nav className="bottom-nav">
            <button className={currentPage === 'landing' ? 'active' : ''} onClick={() => handleNavClick('landing')}>
              <FaHome /> <span>Home</span>
            </button>
            <button className={currentPage === 'home' || ['remove-bg', 'image-to-text', 'summarizer', 'paraphrase', 'grammar-fix', 'qr-generator', 'pdf-converter', 'plagiarism-checker', 'essay-outline'].includes(currentPage) ? 'active' : ''} onClick={() => handleNavClick('home')}>
              <FaTools /> <span>Tools</span>
            </button>
            <button className={currentPage === 'courses' ? 'active' : ''} onClick={() => handleNavClick('courses')}>
              <FaGraduationCap /> <span>Courses</span>
            </button>
            <button className={currentPage === 'about' ? 'active' : ''} onClick={() => handleNavClick('about')}>
              <FaInfoCircle /> <span>About</span>
            </button>
          </nav>
        )}
      </main>
    </div>
  );
}

export default App;
