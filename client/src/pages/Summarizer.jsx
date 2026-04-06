import { useState, useEffect } from 'react';
import { FaArrowLeft, FaFileAlt, FaCheck, FaExclamationCircle, FaSpinner, FaCopy, FaDownload } from 'react-icons/fa';
import { postJSON, getConnectionStatus } from '../utils/api';

function Summarizer({ onBack }) {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    } else if (cooldown === 0) {
      if (error && error.includes('Rate limit exceeded')) {
        setError('');
      }
    }
    return () => clearInterval(timer);
  }, [cooldown, error]);

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
      setResult(data.summary || data.error || 'No summary generated');
    } catch (err) {
      if (err.status === 429 && err.retryAfterSecs) {
        setCooldown(err.retryAfterSecs);
        setError(`Rate limit exceeded. Please wait ${err.retryAfterSecs} seconds before trying again.`);
      } else {
        setError(err.message || 'Failed to summarize text. Make sure the backend server is running.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `summary-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setText('');
    setResult('');
    setError('');
    setCopied(false);
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
            disabled={loading || !text.trim() || cooldown > 0}
          >
            {loading ? (
              <>
                <FaSpinner style={{ animation: 'spin 1s linear infinite' }} /> Processing
              </>
            ) : cooldown > 0 ? (
              <>
                <FaSpinner style={{ animation: 'spin 1s linear infinite' }} /> Wait {cooldown}s
              </>
            ) : (
              <>
                <FaCheck /> Summarize
              </>
            )}
          </button>
          {result && (
            <>
              <button className="btn btn-success" onClick={handleCopy}>
                {copied ? <><FaCheck /> Copied!</> : <><FaCopy /> Copy</>}
              </button>
              <button className="btn btn-secondary" onClick={handleReset}>
                Reset
              </button>
            </>
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
