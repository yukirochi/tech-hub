import { useState } from 'react';
import { FaArrowLeft, FaFileAlt, FaCheck, FaExclamationCircle, FaSpinner, FaDownload, FaFilePdf, FaFileWord } from 'react-icons/fa';
import { postFormData, getConnectionStatus } from '../utils/api';

function PdfConverter({ onBack }) {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [conversionType, setConversionType] = useState('pdf_to_word'); // or 'word_to_pdf'

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError('');
      setResult(null);
      
      // Auto-detect conversion type based on file extension
      const fileName = selectedFile.name.toLowerCase();
      if (fileName.endsWith('.pdf')) {
        setConversionType('pdf_to_word');
      } else if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
        setConversionType('word_to_pdf');
      }
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      setError('Please select a file');
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
      const endpoint = conversionType === 'pdf_to_word' ? '/pdf_to_word' : '/word_to_pdf';
      const response = await postFormData(endpoint, formData);
      
      // Check if response is JSON (error) or binary (success)
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        if (data.error || data.status === 'unavailable') {
          setError(data.message || 'Conversion service is not available. Please check server logs.');
          return;
        }
      }
      
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setResult(url);
    } catch (err) {
      setError(err.message || 'Failed to convert file. The conversion libraries may not be installed on the server.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (result) {
      const link = document.createElement('a');
      link.href = result;
      const extension = conversionType === 'pdf_to_word' ? 'docx' : 'pdf';
      link.download = `converted-${Date.now()}.${extension}`;
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
          <FaFileAlt /> PDF Converter
        </h2>
        <p className="feature-subtitle">Convert between PDF and Word documents seamlessly</p>
        
        <div className="input-group">
          <label>Select Conversion Type</label>
          <div className="conversion-type-selector">
            <button
              className={`conversion-btn ${conversionType === 'pdf_to_word' ? 'active' : ''}`}
              onClick={() => setConversionType('pdf_to_word')}
            >
              <FaFilePdf /> PDF to Word
            </button>
            <button
              className={`conversion-btn ${conversionType === 'word_to_pdf' ? 'active' : ''}`}
              onClick={() => setConversionType('word_to_pdf')}
            >
              <FaFileWord /> Word to PDF
            </button>
          </div>
        </div>

        <div className="input-group">
          <label>Upload File</label>
          <div className="file-input-wrapper">
            <input
              type="file"
              id="fileInput"
              accept={conversionType === 'pdf_to_word' ? '.pdf' : '.doc,.docx'}
              onChange={handleFileChange}
            />
            <label htmlFor="fileInput" className="file-input-label">
              <FaFileAlt />
              {file ? file.name : `Click to upload ${conversionType === 'pdf_to_word' ? 'PDF' : 'Word'} file`}
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
                <FaSpinner style={{ animation: 'spin 1s linear infinite' }} /> Converting
              </>
            ) : (
              <>
                <FaCheck /> Convert
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
              <FaCheck /> Conversion Complete!
            </div>
            <p className="result-text">
              Your file has been successfully converted. Click the Download button to save it.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PdfConverter;
