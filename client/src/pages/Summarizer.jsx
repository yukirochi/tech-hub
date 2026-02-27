import { useState } from 'react';
import { FaArrowLeft, FaFileAlt, FaCheck, FaExclamationCircle, FaSpinner } from 'react-icons/fa';
import { postJSON, getConnectionStatus } from '../utils/api';

function Summarizer({ onBack }) {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!text.trim()) {
      setError('Please enter text to summarize');
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
      const response = await postJSON('/summarizer', { content: text });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to summarize text. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setText('');
    setResult('');
    setError('');
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
          <FaFileAlt /> Summarizer
        </h2>
        <p className="feature-subtitle">Condense long text into concise key points</p>
        
        <div className="input-group">
          <label>Enter Text to Summarize</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your text here..."
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
                <FaSpinner style={{ animation: 'spin 1s linear infinite' }} /> Processing
              </>
            ) : (
              <>
                <FaCheck /> Summarize
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
              <FaCheck /> Summary
            </div>
            <div className="result-text">{result}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Summarizer;
