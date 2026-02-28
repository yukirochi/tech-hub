import { FaArrowLeft, FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaQuoteLeft, FaRocket, FaLightbulb, FaShieldAlt, FaHeart } from 'react-icons/fa';
import './AboutUs.css';

function AboutUs({ onBack }) {
  const developers = [
    {
      name: 'Justine Abanilla',
      role: 'Computer Engineering Student',
      image: 'https://via.placeholder.com/200/16a34a/ffffff?text=JD',
      quote: 'Innovation distinguishes between a leader and a follower.',
      email: 'john.doe@techhub.com',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      bio: 'Specializing in pwede kabang chupizin.'
    },
    {
      name: 'John Lawrence J. Cano',
      role: 'Computer Engineering Student',
      image: 'https://via.placeholder.com/200/22c55e/ffffff?text=JS',
      quote: 'The best way to predict the future is to create it.',
      email: 'johnlawrencecano@gmail.com',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      bio: 'Expert mag mahal always.'
    }
  ];

  return (
    <div>
      <div className="back-button">
        <button onClick={onBack}>
          <FaArrowLeft /> Back
        </button>
      </div>
      
      <div className="about-container">
        <section className="about-hero">
          <h1>About Tech Hub</h1>
          <p className="about-description">
            Tech Hub is a comprehensive platform designed to streamline your workflow with powerful AI-driven tools. 
            We believe in making advanced technology accessible to everyone, whether you\'re a student, professional, 
            or creative enthusiast.
          </p>
        </section>

        <section className="mission-section">
          <div className="mission-card">
            <div className="mission-icon">
              <FaRocket />
            </div>
            <h2>Our Mission</h2>
            <p>
              To empower users with cutting-edge tools that enhance productivity, creativity, and efficiency. 
              We\'re committed to providing free, accessible, and user-friendly solutions for everyday tasks.
            </p>
          </div>
          <div className="mission-card">
            <div className="mission-icon">
              <FaLightbulb />
            </div>
            <h2>Our Vision</h2>
            <p>
              To become the go-to platform for digital tools, continuously innovating and expanding our offerings 
              to meet the evolving needs of our global community.
            </p>
          </div>
        </section>

        <section className="team-section">
          <h2 className="team-title">Meet Our Team</h2>
          <p className="team-subtitle">The brilliant minds behind Tech Hub</p>
          
          <div className="developers-grid">
            {developers.map((dev, index) => (
              <div key={index} className="developer-profile">
                <div className="profile-header">
                  <div className="profile-image-wrapper">
                    <img src={dev.image} alt={dev.name} className="profile-image" />
                  </div>
                  <div className="profile-info">
                    <h3 className="profile-name">{dev.name}</h3>
                    <p className="profile-role">{dev.role}</p>
                  </div>
                </div>
                
                <div className="profile-body">
                  <div className="profile-quote">
                    <FaQuoteLeft className="quote-icon" />
                    <p>{dev.quote}</p>
                  </div>
                  <p className="profile-bio">{dev.bio}</p>
                </div>
                
                <div className="profile-footer">
                  <div className="profile-social">
                    <a href={`mailto:${dev.email}`} className="social-link" title="Email">
                      <FaEnvelope />
                    </a>
                    <a href={dev.github} target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">
                      <FaGithub />
                    </a>
                    <a href={dev.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
                      <FaLinkedin />
                    </a>
                    <a href={dev.twitter} target="_blank" rel="noopener noreferrer" className="social-link" title="Twitter">
                      <FaTwitter />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="values-section">
          <h2>Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <FaRocket />
              </div>
              <h3>Innovation</h3>
              <p>Constantly pushing boundaries to deliver cutting-edge solutions</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <FaHeart />
              </div>
              <h3>Accessibility</h3>
              <p>Making powerful tools available to everyone, everywhere</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <FaShieldAlt />
              </div>
              <h3>Privacy</h3>
              <p>Your data security and privacy are our top priorities</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <FaLightbulb />
              </div>
              <h3>Simplicity</h3>
              <p>Complex technology made simple and user-friendly</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AboutUs;
