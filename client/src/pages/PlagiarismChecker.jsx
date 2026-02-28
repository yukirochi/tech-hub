import { useState } from 'react';
import { FaArrowLeft, FaSearch, FaCheck, FaExclamationCircle, FaSpinner } from 'react-icons/fa';
import { postJSON, getConnectionStatus } from '../utils/api';

function PlagiarismChecker({ onBack }) {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!text.trim()) {
      setError('Please enter text to check');
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
      const response = await postJSON('/plagiarism_check', { content: text });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to check plagiarism. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setText('');
    setResult(null);
    setError('');
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#16a34a';
    if (score >= 50) return '#f59e0b';
    return '#dc2626';
  };

  return (
    <div>
      <div className="back-button">
        <button onClick={onBack}>
          <FaArrowLeft /> Back
        </button>
      </div>
      <div className="feature-content">
        <h2>
          <FaSearch /> Plagiarism Checker
        </h2>
        <p className="feature-subtitle">Check your text for originality and get a uniqueness score</p>
        
        <div className="input-group">
          <label>Enter Text to Check</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your text here..."
            rows="12"
          />
        </div>

        <div className="button-group">
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={loading || !text.trim()}
          >
            {loading ? (
              <>
                <FaSpinner style={{ animation: 'spin 1s linear infinite' }} /> Checking
              </>
            ) : (
              <>
                <FaCheck /> Check Plagiarism
              </>
            )}
          </button>
          {result && (
            <button className="btn btn-secondary" onClick={handleReset}>
              Reset
            </button>
          )}
        </div>

        {error && (
          <div className="error-message">
            <FaExclamationCircle /> {error}
          </div>
        )}

        {result && (
          <div className="result-container">
            <div className="result-title">
              <FaCheck /> Plagiarism Check Results
            </div>
            <div style={{ marginTop: '20px' }}>
              <div style={{ 
                textAlign: 'center', 
                padding: '30px',
                background: '#f0fdf4',
                borderRadius: '12px',
                marginBottom: '20px'
              }}>
                <div style={{ 
                  fontSize: '64px', 
                  fontWeight: '700', 
                  color: getScoreColor(result.uniqueness_score),
                  marginBottom: '10px'
                }}>
                  {result.uniqueness_score}%
                </div>
                <div style={{ fontSize: '18px', color: '#64748b', fontWeight: '600' }}>
                  Uniqueness Score
                </div>
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <strong>Total Words:</strong> {result.word_count}
              </div>
              <div style={{ marginBottom: '15px' }}>
                <strong>Total Sentences:</strong> {result.sentence_count}
              </div>
              <div style={{ marginBottom: '15px' }}>
                <strong>Status:</strong> <span style={{ color: getScoreColor(result.uniqueness_score), fontWeight: '600' }}>
                  {result.status}
                </span>
              </div>
              <div style={{ 
                padding: '15px', 
                background: '#f8f9fa', 
                borderRadius: '8px',
                marginTop: '20px'
              }}>
                <strong>Note:</strong> This is a basic plagiarism check. For comprehensive checking, use specialized plagiarism detection services.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlagiarismChecker;
