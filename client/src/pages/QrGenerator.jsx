import { useState } from 'react';
import { FaArrowLeft, FaQrcode, FaCheck, FaExclamationCircle, FaSpinner, FaDownload } from 'react-icons/fa';
import { postJSON, getConnectionStatus } from '../utils/api';

function QrGenerator({ onBack }) {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!text.trim()) {
      setError('Please enter text to generate QR code');
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
      const response = await postJSON('/qr_generator', { content: text });
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setResult(url);
    } catch (err) {
      setError(err.message || 'Failed to generate QR code. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = result;
    link.download = `qrcode-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setText('');
    setResult(null);
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
          <FaQrcode /> QR Code Generator
        </h2>
        <p className="feature-subtitle">Generate QR codes from text or URLs for easy sharing</p>
        
        <div className="input-group">
          <label>Enter Text or URL</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text or URL..."
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
                <FaCheck /> Generate QR Code
              </>
            )}
          </button>
          {result && (
            <>
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
              <FaCheck /> Generated QR Code
            </div>
            <img src={result} alt="QR Code" className="result-image" />
          </div>
        )}
      </div>
    </div>
  );
}

export default QrGenerator;
