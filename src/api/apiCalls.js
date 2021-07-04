import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:9000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

export const getPlans = () => API.get('/api/plans');
export const createPlan = (newPlan) => API.post('/plans', newPlan);
export const updatePlan = (id, updatedPlan) => API.patch(`/plans/${id}`, updatedPLan);
export const deletePlan = (id) => API.delete(`/plans/${id}`);

