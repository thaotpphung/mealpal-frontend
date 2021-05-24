import axios from 'axios';

const PLAN_API = axios.create({ baseURL: 'http://localhost:9000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

export const getPlans = () => PLAN_API.get('/api/plans');
export const createPlan = (newPlan) => PLAN_API.post('/plans', newPlan);
export const updatePlan = (id, updatedPlan) => PLAN_API.patch(`/plans/${id}`, updatedPLan);
export const deletePlan = (id) => PLAN_API.delete(`/plans/${id}`);
