import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:3001/api', // Backend server URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens if needed
api.interceptors.request.use(
  (config) => {
    // Add auth token here if implementing authentication
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors here
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.error('Unauthorized access');
    } else if (error.response?.status === 500) {
      // Handle server errors
      console.error('Server error');
    }
    return Promise.reject(error);
  }
);

// Transaction API functions
export const transactionAPI = {
  // Get all transactions
  getAll: async () => {
    try {
      const response = await api.get('/transactions');
      return response.data;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  },

  // Create a new transaction
  create: async (transaction) => {
    try {
      const response = await api.post('/transactions', transaction);
      return response.data;
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  },

  // Update a transaction
  update: async (id, transaction) => {
    try {
      const response = await api.put(`/transactions/${id}`, transaction);
      return response.data;
    } catch (error) {
      console.error('Error updating transaction:', error);
      throw error;
    }
  },

  // Delete a transaction
  delete: async (id) => {
    try {
      await api.delete(`/transactions/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting transaction:', error);
      throw error;
    }
  },
};

export default api;
