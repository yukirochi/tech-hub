import { useState } from 'react';
import { FaArrowLeft, FaGraduationCap, FaBook, FaLightbulb, FaCheckCircle, FaCode, FaBriefcase, FaChartLine, FaCompass, FaExternalLinkAlt } from 'react-icons/fa';
import './CourseGuide.css';

function CourseGuide({ onBack }) {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courses = {
    'computer-engineering': {
      name: 'Computer Engineering',
      icon: FaCode,
      color: '#3b82f6',
      description: 'Hardware and software systems design',
      guides: [
        {
          title: 'Programming Fundamentals',
          content: 'Master C++, Java, and Python. Practice data structures and algorithms daily. Use LeetCode and HackerRank for coding practice.',
          tools: ['Summarizer - for textbook chapters', 'Paraphrase - for code documentation', 'Grammar Fix - for technical reports']
        },
        {
          title: 'Circuit Design & Electronics',
          content: 'Understand digital logic, microprocessors, and embedded systems. Use simulation tools like Proteus and Multisim.',
          tools: ['Image to Text - extract circuit diagrams', 'PDF Converter - convert lab reports', 'Essay Outline - structure technical papers']
        },
        {
          title: 'Project Development',
          content: 'Build real-world projects combining hardware and software. Document your work thoroughly for your portfolio.',
          tools: ['Plagiarism Checker - verify originality', 'QR Generator - for project demos', 'Remove Background - for presentation images']
        },
        {
          title: 'Study Tips',
          content: '• Practice coding daily (minimum 1 hour)\n• Build projects to apply concepts\n• Join coding communities\n• Review circuit designs regularly\n• Keep a technical journal',
          tools: []
        },
        {
          title: 'Career Path Explorer',
          content: 'Not sure which tech career path to pursue? Use our Career Compass tool to discover career options that match your interests and skills in Computer Engineering.',
          tools: [],
          isCareerCompass: true
        }
      ]
    },
    'information-technology': {
      name: 'Information Technology',
      icon: FaCode,
      color: '#8b5cf6',
      description: 'Software development and IT systems',
      guides: [
        {
          title: 'Web Development',
          content: 'Learn HTML, CSS, JavaScript, and modern frameworks (React, Vue, Angular). Build responsive websites and web applications.',
          tools: ['Summarizer - for documentation', 'Paraphrase - for code comments', 'Grammar Fix - for README files']
        },
        {
          title: 'Database Management',
          content: 'Master SQL, NoSQL databases. Understand database design, normalization, and optimization techniques.',
          tools: ['Essay Outline - for database design docs', 'PDF Converter - for ER diagrams', 'Image to Text - extract database schemas']
        },
        {
          title: 'Network & Security',
          content: 'Study network protocols, cybersecurity principles, and ethical hacking. Get certifications like CompTIA Security+.',
          tools: ['Plagiarism Checker - for research papers', 'Summarizer - for security documentation']
        },
        {
          title: 'Career Preparation',
          content: '• Build a strong GitHub portfolio\n• Contribute to open source\n• Create technical blog posts\n• Network with IT professionals\n• Stay updated with tech trends',
          tools: []
        },
        {
          title: 'Career Path Explorer',
          content: 'Explore various IT career paths and find the one that matches your skills and interests. Use our Career Compass tool to get personalized career recommendations.',
          tools: [],
          isCareerCompass: true
        }
      ]
    },
    'entrepreneurship': {
      name: 'Entrepreneurship',
      icon: FaBriefcase,
      color: '#f59e0b',
      description: 'Business creation and innovation',
      guides: [
        {
          title: 'Business Planning',
          content: 'Learn to create comprehensive business plans, conduct market research, and develop financial projections.',
          tools: ['Essay Outline - for business plans', 'Summarizer - for market research', 'Grammar Fix - for proposals']
        },
        {
          title: 'Marketing & Sales',
          content: 'Master digital marketing, social media strategies, and sales techniques. Understand customer psychology and branding.',
          tools: ['Paraphrase - for marketing copy', 'QR Generator - for campaigns', 'Remove Background - for product photos']
        },
        {
          title: 'Financial Management',
          content: 'Understand accounting basics, cash flow management, and investment strategies. Learn to read financial statements.',
          tools: ['PDF Converter - for financial reports', 'Plagiarism Checker - for business documents']
        },
        {
          title: 'Success Strategies',
          content: '• Network constantly\n• Learn from failures\n• Stay persistent\n• Validate ideas before investing\n• Build a strong team\n• Focus on customer needs',
          tools: []
        }
      ]
    },
    'business-administration': {
      name: 'Business Administration',
      icon: FaChartLine,
      color: '#10b981',
      description: 'Management and organizational leadership',
      guides: [
        {
          title: 'Management Principles',
          content: 'Study organizational behavior, leadership theories, and strategic management. Develop decision-making and problem-solving skills.',
          tools: ['Summarizer - for case studies', 'Essay Outline - for management reports', 'Grammar Fix - for business correspondence']
        },
        {
          title: 'Human Resources',
          content: 'Learn recruitment, training, performance management, and employee relations. Understand labor laws and workplace ethics.',
          tools: ['Paraphrase - for HR policies', 'PDF Converter - for employee handbooks']
        },
        {
          title: 'Operations & Supply Chain',
          content: 'Master process optimization, inventory management, and logistics. Use tools like Six Sigma and Lean methodologies.',
          tools: ['Image to Text - extract process diagrams', 'Plagiarism Checker - for research papers']
        },
        {
          title: 'Professional Development',
          content: '• Develop strong communication skills\n• Practice public speaking\n• Build leadership experience\n• Stay updated on business trends\n• Network with professionals\n• Seek internships',
          tools: []
        }
      ]
    }
  };

  if (!selectedCourse) {
    return (
      <div className="course-selection">
        <div className="back-button">
          <button onClick={onBack}>
            <FaArrowLeft /> Back
          </button>
        </div>
        <div className="course-header">
          <FaGraduationCap className="header-icon" />
          <h1>Select Your Course</h1>
          <p>Choose your program to get personalized study guides and tool recommendations</p>
        </div>
        <div className="courses-grid">
          {Object.entries(courses).map(([key, course]) => {
            const IconComponent = course.icon;
            return (
              <div
                key={key}
                className="course-card"
                onClick={() => setSelectedCourse(key)}
                style={{ borderTopColor: course.color }}
              >
                <IconComponent className="course-icon" style={{ color: course.color }} />
                <h3>{course.name}</h3>
                <p>{course.description}</p>
                <button className="btn btn-primary" style={{ background: course.color }}>
                  View Guide
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const course = courses[selectedCourse];
  const IconComponent = course.icon;

  return (
    <div className="course-guide-page">
      <div className="back-button">
        <button onClick={() => setSelectedCourse(null)}>
          <FaArrowLeft /> Back to Courses
        </button>
      </div>
      
      <div className="guide-header" style={{ borderLeftColor: course.color }}>
        <IconComponent className="guide-icon" style={{ color: course.color }} />
        <div>
          <h1>{course.name}</h1>
          <p>{course.description}</p>
        </div>
      </div>

      <div className="guides-container">
        {course.guides.map((guide, index) => (
          <div key={index} className="guide-section">
            <div className="guide-title">
              {guide.isCareerCompass ? (
                <FaCompass style={{ color: course.color }} />
              ) : (
                <FaBook style={{ color: course.color }} />
              )}
              <h2>{guide.title}</h2>
            </div>
            <div className="guide-content">
              {guide.content.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
            {guide.isCareerCompass && (
              <div className="career-compass-link">
                <a 
                  href="https://my-career-compass-tool.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ background: course.color }}
                >
                  <FaCompass /> Explore Career Paths <FaExternalLinkAlt />
                </a>
              </div>
            )}
            {guide.tools && guide.tools.length > 0 && (
              <div className="recommended-tools">
                <div className="tools-header">
                  <FaLightbulb style={{ color: course.color }} />
                  <strong>Recommended Tools:</strong>
                </div>
                <ul>
                  {guide.tools.map((tool, i) => (
                    <li key={i}>
                      <FaCheckCircle style={{ color: course.color }} />
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="guide-footer">
        <div className="footer-card" style={{ borderLeftColor: course.color }}>
          <h3>Need More Help?</h3>
          <p>Use our academic tools to enhance your learning experience. All tools are designed to help you succeed in your studies.</p>
          <button className="btn btn-primary" onClick={onBack} style={{ background: course.color }}>
            Explore Tools
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseGuide;
