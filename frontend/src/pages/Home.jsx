import { FaImage, FaFileAlt, FaPen, FaCheckCircle, FaQrcode, FaArrowRight } from 'react-icons/fa';

function Home({ onSelectFeature }) {
  const features = [
    {
      id: 'remove-bg',
      icon: FaImage,
      title: 'Remove Background',
      description: 'Remove background from images instantly with AI-powered technology'
    },
    {
      id: 'image-to-text',
      icon: FaFileAlt,
      title: 'Image to Text',
      description: 'Extract text from images using advanced OCR technology'
    },
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
      id: 'qr-generator',
      icon: FaQrcode,
      title: 'QR Code Generator',
      description: 'Generate QR codes from text or URLs for easy sharing'
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
