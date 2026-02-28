import { useState } from 'react';
import { FaArrowLeft, FaPen, FaCheck, FaExclamationCircle, FaSpinner, FaCopy, FaDownload } from 'react-icons/fa';
import { postJSON, getConnectionStatus } from '../utils/api';

function Paraphrase({ onBack }) {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) {
      setError('Please enter text to paraphrase');
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
      const response = await postJSON('/paraphrase', { content: text });
      const data = await response.json();
      setResult(data.paraphrase || data.error || 'No paraphrase generated');
    } catch (err) {
      setError(err.message || 'Failed to paraphrase text. Make sure the backend server is running.');
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
    link.download = `paraphrase-${Date.now()}.txt`;
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
          <FaPen /> Paraphrase
        </h2>
        <p className="feature-subtitle">Rephrase your text with different wording while maintaining the original meaning</p>
        
        <div className="input-group">
          <label>Enter Text to Paraphrase</label>
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
                <FaCheck /> Paraphrase
              </>
            )}
          </button>
          {result && (
            <>
              <button className="btn btn-success" onClick={handleCopy}>
                {copied ? <><FaCheck /> Copied!</> : <><FaCopy /> Copy</>}
              </button>
              <button className="btn btn-success" onClick={handleDownload}>
                <FaDownload /> Download
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
              <FaCheck /> Paraphrased Text
            </div>
            <div className="result-text">{result}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Paraphrase;
