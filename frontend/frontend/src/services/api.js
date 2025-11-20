import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

export const fetchCandidates = () => API.get('/candidates');
export const addCandidate = (formData) =>
  API.post('/candidates', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const updateStatus = (id, status) =>
  API.put(`/candidates/${id}/status`, { status });

export const deleteCandidate = (id) => API.delete(`/candidates/${id}`);

export const fetchMetrics = () => API.get('/candidates/metrics/all');

export default API;
