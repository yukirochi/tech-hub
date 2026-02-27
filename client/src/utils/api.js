const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
      }
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response;
  } catch (error) {
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
