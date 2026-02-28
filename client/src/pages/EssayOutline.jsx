import { useState } from 'react';
import { FaArrowLeft, FaListOl, FaCheck, FaExclamationCircle, FaSpinner, FaCopy, FaDownload } from 'react-icons/fa';
import { postJSON, getConnectionStatus } from '../utils/api';

function EssayOutline({ onBack }) {
  const [topic, setTopic] = useState('');
  const [essayType, setEssayType] = useState('argumentative');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async () => {
    if (!topic.trim()) {
      setError('Please enter an essay topic');
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
      const response = await postJSON('/essay_outline', { topic, essay_type: essayType });
      const data = await response.json();
      setResult(data.outline);
    } catch (err) {
      setError(err.message || 'Failed to generate outline. Make sure the backend server is running.');
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
    link.download = `essay-outline-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setTopic('');
    setEssayType('argumentative');
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
          <FaListOl /> Essay Outline Generator
        </h2>
        <p className="feature-subtitle">Generate a structured outline for your essay</p>
        
        <div className="input-group">
          <label>Essay Topic</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter your essay topic..."
          />
        </div>

        <div className="input-group">
          <label>Essay Type</label>
          <select value={essayType} onChange={(e) => setEssayType(e.target.value)}>
            <option value="argumentative">Argumentative</option>
            <option value="persuasive">Persuasive</option>
            <option value="expository">Expository</option>
            <option value="descriptive">Descriptive</option>
            <option value="narrative">Narrative</option>
            <option value="compare-contrast">Compare and Contrast</option>
          </select>
        </div>

        <div className="button-group">
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={loading || !topic.trim()}
          >
            {loading ? (
              <>
                <FaSpinner style={{ animation: 'spin 1s linear infinite' }} /> Generating
              </>
            ) : (
              <>
                <FaCheck /> Generate Outline
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
              <FaCheck /> Essay Outline
            </div>
            <div className="result-text" style={{ whiteSpace: 'pre-wrap' }}>{result}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EssayOutline;
