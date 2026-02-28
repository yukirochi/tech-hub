import { FaImage, FaFileAlt, FaPen, FaCheckCircle, FaQrcode, FaArrowRight, FaFilePdf, FaSearch, FaListOl } from 'react-icons/fa';

function Home({ onSelectFeature }) {
  const features = [
    {
      id: 'summarizer',
      icon: FaFileAlt,
      title: 'Summarizer',
      description: 'Summarize long text into concise key points automatically'
    },
    {
      id: 'paraphrase',
      icon: FaPen,
      title: 'Paraphrase',
      description: 'Rephrase text with different wording while maintaining meaning'
    },
    {
      id: 'grammar-fix',
      icon: FaCheckCircle,
      title: 'Grammar Fix',
      description: 'Fix grammar and spelling errors in your text instantly'
    },
    {
      id: 'plagiarism-checker',
      icon: FaSearch,
      title: 'Plagiarism Checker',
      description: 'Check your text for originality and get uniqueness score'
    },
    {
      id: 'essay-outline',
      icon: FaListOl,
      title: 'Essay Outline',
      description: 'Generate structured outlines for different essay types'
    },
    {
      id: 'image-to-text',
      icon: FaFileAlt,
      title: 'Image to Text',
      description: 'Extract text from images using OCR technology'
    },
    {
      id: 'pdf-converter',
      icon: FaFilePdf,
      title: 'PDF Converter',
      description: 'Convert between PDF and Word documents seamlessly'
    },
    {
      id: 'qr-generator',
      icon: FaQrcode,
      title: 'QR Code Generator',
      description: 'Generate QR codes from text or URLs for easy sharing'
    },
    {
      id: 'remove-bg',
      icon: FaImage,
      title: 'Remove Background',
      description: 'Remove background from images instantly with AI technology'
    }
  ];

  return (
    <div>
      <h1 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '12px', color: '#1e293b' }}>
        Welcome to Tech Hub
      </h1>
      <p style={{ fontSize: '16px', color: '#64748b', marginBottom: '40px' }}>
        Powerful tools to enhance your productivity and content creation
      </p>
      <div className="features-grid">
        {features.map(feature => {
          const IconComponent = feature.icon;
          return (
            <div
              key={feature.id}
              className="feature-card"
              onClick={() => onSelectFeature(feature.id)}
            >
              <div className="feature-icon">
                <IconComponent />
              </div>
              <div className="feature-title">{feature.title}</div>
              <div className="feature-description">{feature.description}</div>
              <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '6px', color: '#22c55e', fontSize: '12px', fontWeight: '600' }}>
                Get Started <FaArrowRight style={{ fontSize: '10px' }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
