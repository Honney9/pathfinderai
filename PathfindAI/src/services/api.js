import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async request(method, endpoint, data = null) {
    try {
      const response = await this.api.request({
        url: endpoint,
        method,
        data,
      });

      return response.data;
    } catch (error) {
      console.error('API request failed:', error);

      throw new Error(
        error?.response?.data?.message ||
        error.message ||
        'Something went wrong'
      );
    }
  }

  // POST request for profile submission
  async submitProfile(profileData) {
    return this.request('post', '/profile', profileData);
  }

  // GET request for health check
  async healthCheck() {
    return this.request('get', '/health');
  }

  // GET request for career insights
  async getCareerInsights() {
    return this.request('get', '/insights');
  }
}

export default new ApiService();
