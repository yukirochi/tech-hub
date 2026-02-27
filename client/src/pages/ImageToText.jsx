import { useState } from 'react';
import { FaArrowLeft, FaFileAlt, FaCheck, FaExclamationCircle, FaSpinner } from 'react-icons/fa';
import { postFormData, getConnectionStatus } from '../utils/api';

function ImageToText({ onBack }) {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');
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
      const response = await postFormData('/image_to_text', formData);
      const data = await response.json();
      setResult(data.text);
    } catch (err) {
      setError(err.message || 'Failed to extract text. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
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
          <FaFileAlt /> Image to Text
        </h2>
        <p className="feature-subtitle">Extract text from images using advanced OCR technology</p>
        
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
              <FaFileAlt />
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
                <FaCheck /> Extract Text
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
              <FaCheck /> Extracted Text
            </div>
            <div className="result-text">{result}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageToText;
