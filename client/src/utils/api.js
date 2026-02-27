const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

let connectionStatus = 'checking';
let statusCallbacks = [];

export const subscribeToConnectionStatus = (callback) => {
  statusCallbacks.push(callback);
  callback(connectionStatus);
  return () => {
    statusCallbacks = statusCallbacks.filter(cb => cb !== callback);
  };
};

const updateConnectionStatus = (status) => {
  connectionStatus = status;
  statusCallbacks.forEach(cb => cb(status));
};

export const getConnectionStatus = () => connectionStatus;

export const checkConnection = async () => {
  try {
    const response = await fetch(`${API_URL}/health`, {
      method: 'GET',
      timeout: 5000
    });
    
    if (response.ok) {
      updateConnectionStatus('connected');
      return true;
    } else {
      updateConnectionStatus('disconnected');
      return false;
    }
  } catch (error) {
    updateConnectionStatus('disconnected');
    return false;
  }
};

export const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
      }
    });

    if (!response.ok) {
      updateConnectionStatus('disconnected');
      throw new Error(`API Error: ${response.status}`);
    }

    updateConnectionStatus('connected');
    return response;
  } catch (error) {
    updateConnectionStatus('disconnected');
    throw error;
  }
};

export const postJSON = async (endpoint, data) => {
  return apiCall(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

export const postFormData = async (endpoint, formData) => {
  return apiCall(endpoint, {
    method: 'POST',
    body: formData
  });
};
