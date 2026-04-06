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
      mode: 'cors',
    });
    
    if (response.ok) {
      updateConnectionStatus('connected');
      return true;
    } else {
      updateConnectionStatus('disconnected');
      return false;
    }
  } catch (error) {
    console.error('Connection check failed:', error);
    updateConnectionStatus('disconnected');
    return false;
  }
};

export const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      mode: 'cors',
      headers: {
        ...options.headers,
      }
    });

    if (!response.ok) {
      if (response.status === 429) {
        // Handle Rate Limit Exceeded
        const retryAfter = response.headers.get('retry-after');
        let errorMsg = 'Too many requests. Please wait.';
        try {
          const body = await response.json();
          if (body.error) errorMsg = body.error;
        } catch (e) {
          // ignore parsing error if body is empty
        }
        
        const error = new Error(errorMsg);
        error.status = 429;
        if (retryAfter) {
          error.retryAfterSecs = parseInt(retryAfter, 10);
        } else {
          error.retryAfterSecs = 60; // default to 60s if no header
        }
        throw error;
      }

      updateConnectionStatus('disconnected');
      throw new Error(`API Error: ${response.status}`);
    }

    updateConnectionStatus('connected');
    return response;
  } catch (error) {
    console.error('API call failed:', error);
    if (!error.status) {
       updateConnectionStatus('disconnected');
    }
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
