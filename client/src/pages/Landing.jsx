import { FaRocket, FaShieldAlt, FaBolt, FaUsers } from 'react-icons/fa';
import './Landing.css';

function Landing({ onGetStarted }) {
  return (
    <div className="landing-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="gradient-text">Tech Hub</span>
          </h1>
          <p className="hero-subtitle">
            Your all-in-one platform for powerful AI-driven tools
          </p>
          <p className="hero-description">
            Transform your workflow with cutting-edge text processing, image manipulation, 
            and document conversion tools - all in one place.
          </p>
          <button className="cta-button" onClick={onGetStarted}>
            <FaRocket /> Get Started Free
          </button>
        </div>
        <div className="hero-image">
          <div className="floating-card card-1">
            <FaBolt className="card-icon" />
            <span>Fast Processing</span>
          </div>
          <div className="floating-card card-2">
            <FaShieldAlt className="card-icon" />
            <span>Secure & Private</span>
          </div>
          <div className="floating-card card-3">
            <FaUsers className="card-icon" />
            <span>User Friendly</span>
          </div>
        </div>
      </section>

      <section className="features-overview">
        <h2 className="section-title">What We Offer</h2>
        <div className="features-grid-landing">
          <div className="feature-item">
            <div className="feature-number">01</div>
            <h3>Text Analysis</h3>
            <p>Summarize, paraphrase, compare texts, and count words with powerful tools</p>
          </div>
          <div className="feature-item">
            <div className="feature-number">02</div>
            <h3>Writing Tools</h3>
            <p>Fix grammar, convert text cases, and improve your writing quality</p>
          </div>
          <div className="feature-item">
            <div className="feature-number">03</div>
            <h3>Document Conversion</h3>
            <p>Convert between PDF and Word formats seamlessly</p>
          </div>
          <div className="feature-item">
            <div className="feature-number">04</div>
            <h3>Utilities</h3>
            <p>Generate QR codes and remove image backgrounds easily</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to boost your productivity?</h2>
        <p>Join thousands of users who trust Tech Hub for their daily tasks</p>
        <button className="cta-button-secondary" onClick={onGetStarted}>
          Start Using Tools Now
        </button>
      </section>
    </div>
  );
}

export default Landing;
