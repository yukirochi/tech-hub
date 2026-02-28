import { useState } from 'react';
import { FaArrowLeft, FaPaperPlane, FaCheck, FaExclamationCircle, FaSpinner } from 'react-icons/fa';
import { postJSON, getConnectionStatus } from '../utils/api';
import './Feedback.css';

function Feedback({ onBack }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'general',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    const connectionStatus = getConnectionStatus();
    if (connectionStatus !== 'connected') {
      setError('Backend server is not connected. Please make sure the backend is running on port 8000.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await postJSON('/submit_feedback', formData);
      await response.json();
      setLoading(false);
      setSubmitted(true);
      
      setTimeout(() => {
        setFormData({ name: '', email: '', category: 'general', message: '' });
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Failed to submit feedback');
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', category: 'general', message: '' });
    setError('');
    setSubmitted(false);
  };

  return (
    <div className="feedback-container">
      <div className="back-button">
        <button onClick={onBack}>
          <FaArrowLeft /> Back
        </button>
      </div>
      
      <div className="feedback-header">
        <h2>Send Us Your Feedback</h2>
        <p className="feedback-subtitle">
          We'd love to hear from you. Let us know what you think!
        </p>
      </div>

      {submitted ? (
        <div className="success-message-box">
          <FaCheck style={{ fontSize: '48px', color: '#16a34a', marginBottom: '16px' }} />
          <h3>Thank You!</h3>
          <p>Your feedback has been submitted successfully.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="general">General Feedback</option>
              <option value="bug">Bug Report</option>
              <option value="feature">Feature Request</option>
              <option value="improvement">Improvement Suggestion</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us what's on your mind..."
              required
            />
          </div>

          {error && (
            <div className="error-message">
              <FaExclamationCircle /> {error}
            </div>
          )}

          <div className="button-group">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <FaSpinner style={{ animation: 'spin 1s linear infinite' }} /> Sending
                </>
              ) : (
                <>
                  <FaPaperPlane /> Submit Feedback
                </>
              )}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Feedback;
