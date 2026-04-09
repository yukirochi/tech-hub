import { FaBookReader, FaShieldAlt, FaBolt, FaGraduationCap, FaSearch, FaPen, FaFilePdf, FaImage } from 'react-icons/fa';
import './Landing.css';

function Landing({ onGetStarted }) {
  return (
    <div className="landing-page">
      <section className="hero-section">
        <div className="hero-content">
          <h2 className="hero-subtitle">Scholarly Workspace</h2>
          <h1 className="hero-title">
            Advanced Tools for Academic & Textual Analysis
          </h1>
          <p className="hero-description">
            Enhance your research workflow with rigorous text processing, structural analysis, and document conversion tools designed for precision and clarity.
          </p>
          <button className="cta-button" onClick={onGetStarted}>
            <FaBookReader /> Access Tools
          </button>
        </div>
      </section>

      <section className="features-overview">
        <h2 className="section-title">Capabilities Directory</h2>
        <p className="section-subtitle">A comprehensive suite of utilities for academic workflows.</p>
        <div className="features-grid-landing">
          <div className="feature-item">
            <div className="feature-icon-wrapper"><FaSearch /></div>
            <h3>Textual Analysis</h3>
            <p>Perform plagiarism checks, semantic summarization, and detailed word metrics for academic papers.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon-wrapper"><FaPen /></div>
            <h3>Writing & Revision</h3>
            <p>Utilize algorithmic grammar correction and intelligent paraphrasing to refine scholarly writing.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon-wrapper"><FaFilePdf /></div>
            <h3>Document Processing</h3>
            <p>Convert and manage document formats seamlessly, preserving complex formatting and data integrity.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon-wrapper"><FaImage /></div>
            <h3>Media Utilities</h3>
            <p>Extract text from images using advanced OCR technology and manage visual assets.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Initiate Your Workflow</h2>
        <p>Join researchers and students utilizing Tech Hub for rigorous academic work.</p>
        <button className="cta-button-secondary" onClick={onGetStarted}>
          Open Dashboard
        </button>
      </section>
    </div>
  );
}

export default Landing;
