import { useState } from 'react';
import { FaArrowLeft, FaImage, FaCheck, FaExclamationCircle, FaSpinner, FaDownload } from 'react-icons/fa';
import { postFormData, getConnectionStatus } from '../utils/api';

function RemoveBg({ onBack }) {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError('');
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      setError('Please select an image');
      return;
    }

    const connectionStatus = getConnectionStatus();
    if (connectionStatus !== 'connected') {
      setError('Backend server is not connected. Please make sure the backend is running on port 8000.');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await postFormData('/remove_bg', formData);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setResult(url);
    } catch (err) {
      setError(err.message || 'Failed to remove background. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (result) {
      const link = document.createElement('a');
      link.href = result;
      link.download = `removed-bg-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleReset = () => {
    setFile(null);
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
          <FaImage /> Remove Background
        </h2>
        <p className="feature-subtitle">Upload an image and we'll remove the background instantly</p>
        
        <div className="input-group">
          <label>Upload Image</label>
          <div className="file-input-wrapper">
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              onChange={handleFileChange}
            />
            <label htmlFor="imageInput" className="file-input-label">
              <FaImage />
              {file ? file.name : 'Click to upload or drag and drop'}
            </label>
          </div>
        </div>

        <div className="button-group">
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={loading || !file}
          >
            {loading ? (
              <>
                <FaSpinner style={{ animation: 'spin 1s linear infinite' }} /> Processing
              </>
            ) : (
              <>
                <FaCheck /> Remove Background
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
              <FaCheck /> Result
            </div>
            <img src={result} alt="Result" className="result-image" />
          </div>
        )}
      </div>
    </div>
  );
}

export default RemoveBg;
