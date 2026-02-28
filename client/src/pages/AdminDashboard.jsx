import { useState, useEffect } from 'react';
import { FaArrowLeft, FaUsers, FaComments, FaChartLine, FaTrash, FaCheck, FaTimes, FaClock } from 'react-icons/fa';
import { postJSON } from '../utils/api';
import './AdminDashboard.css';

function AdminDashboard({ onBack }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({ total: 0, new: 0, resolved: 0 });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await postJSON('/admin/login', { username, password });
      await response.json();
      setIsLoggedIn(true);
      loadFeedbacks();
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const loadFeedbacks = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/admin/feedbacks');
      const data = await response.json();
      setFeedbacks(data.feedbacks || []);
      
      const total = data.feedbacks.length;
      const newCount = data.feedbacks.filter(f => f.status === 'new').length;
      const resolved = data.feedbacks.filter(f => f.status === 'resolved').length;
      setStats({ total, new: newCount, resolved });
    } catch (err) {
      console.error('Failed to load feedbacks', err);
    }
  };

  const deleteFeedback = async (id) => {
    if (!confirm('Are you sure you want to delete this feedback?')) return;
    
    try {
      await fetch(`http://127.0.0.1:8000/admin/feedback/${id}`, { method: 'DELETE' });
      loadFeedbacks();
    } catch (err) {
      alert('Failed to delete feedback');
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await fetch(`http://127.0.0.1:8000/admin/feedback/${id}/status?status=${status}`, { 
        method: 'PUT' 
      });
      loadFeedbacks();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      loadFeedbacks();
      const interval = setInterval(loadFeedbacks, 30000);
      return () => clearInterval(interval);
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="admin-login">
        <div className="back-button">
          <button onClick={onBack}>
            <FaArrowLeft /> Back
          </button>
        </div>
        <div className="login-container">
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <p className="login-hint">Default: admin / admin123</p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div className="back-button">
          <button onClick={onBack}>
            <FaArrowLeft /> Back
          </button>
        </div>
        <h1>Admin Dashboard</h1>
        <button className="btn btn-secondary" onClick={() => setIsLoggedIn(false)}>
          Logout
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <FaComments className="stat-icon" />
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Feedbacks</div>
        </div>
        <div className="stat-card new">
          <FaClock className="stat-icon" />
          <div className="stat-value">{stats.new}</div>
          <div className="stat-label">New</div>
        </div>
        <div className="stat-card resolved">
          <FaCheck className="stat-icon" />
          <div className="stat-value">{stats.resolved}</div>
          <div className="stat-label">Resolved</div>
        </div>
      </div>

      <div className="feedbacks-section">
        <h2>Feedback History</h2>
        {feedbacks.length === 0 ? (
          <div className="no-feedbacks">No feedbacks yet</div>
        ) : (
          <div className="feedbacks-list">
            {feedbacks.map(feedback => (
              <div key={feedback.id} className={`feedback-card ${feedback.status}`}>
                <div className="feedback-header-row">
                  <div className="feedback-info">
                    <strong>{feedback.name}</strong>
                    <span className="feedback-email">{feedback.email}</span>
                  </div>
                  <div className="feedback-meta">
                    <span className={`badge badge-${feedback.category}`}>
                      {feedback.category}
                    </span>
                    <span className={`status-badge status-${feedback.status}`}>
                      {feedback.status}
                    </span>
                  </div>
                </div>
                <div className="feedback-message">{feedback.message}</div>
                <div className="feedback-footer">
                  <span className="feedback-date">
                    {new Date(feedback.timestamp).toLocaleString()}
                  </span>
                  <div className="feedback-actions">
                    {feedback.status === 'new' && (
                      <button 
                        className="btn-icon btn-success"
                        onClick={() => updateStatus(feedback.id, 'resolved')}
                        title="Mark as Resolved"
                      >
                        <FaCheck />
                      </button>
                    )}
                    {feedback.status === 'resolved' && (
                      <button 
                        className="btn-icon btn-warning"
                        onClick={() => updateStatus(feedback.id, 'new')}
                        title="Mark as New"
                      >
                        <FaClock />
                      </button>
                    )}
                    <button 
                      className="btn-icon btn-danger"
                      onClick={() => deleteFeedback(feedback.id)}
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
