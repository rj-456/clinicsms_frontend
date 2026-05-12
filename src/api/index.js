const API_BASE_URL = 'http://localhost:8000/api';

const handleResponse = async (response) => {
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }
  
  if (data && data.status === 'error') {
    return Promise.reject(data.message);
  }

  return data;
};

export const api = {
  // Register Patient
  registerPatient: async (patientData) => {
    const response = await fetch(`${API_BASE_URL}/patients/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patientData),
    });
    return handleResponse(response);
  },

  // Add Patient to Queue
  addToQueue: async (queueData) => {
    const response = await fetch(`${API_BASE_URL}/queue/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(queueData),
    });
    return handleResponse(response);
  },

  // Get Queue List
  getQueue: async () => {
    const response = await fetch(`${API_BASE_URL}/queue/list/`);
    return handleResponse(response);
  },

  // Request Lab Test
  requestLabTest: async (labData) => {
    const response = await fetch(`${API_BASE_URL}/lab-tests/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(labData),
    });
    return handleResponse(response);
  }
};
