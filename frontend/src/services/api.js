// frontend/src/services/api.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Assignment APIs
  async getAssignments(mentorId) {
    return this.request(`/assignments/mentor/${mentorId}`);
  }

  async assignStudent(mentorId, studentId) {
    return this.request('/assignments/assign', {
      method: 'POST',
      body: { mentorId, studentId }
    });
  }

  async removeAssignment(assignmentId) {
    return this.request(`/assignments/${assignmentId}`, {
      method: 'DELETE'
    });
  }

  async submitAssignments(mentorId) {
    return this.request(`/assignments/mentor/${mentorId}/submit`, {
      method: 'POST'
    });
  }

  // Student APIs
  async getAvailableStudents() {
    return this.request('/students/available');
  }

  // Parameters APIs
  async getEvaluationParameters() {
    return this.request('/parameters');
  }

  // Marks APIs
  async updateMarks(assignmentId, marks) {
    return this.request('/marks', {
      method: 'POST',
      body: { assignmentId, marks }
    });
  }
}

const apiService = new ApiService();
export default apiService;