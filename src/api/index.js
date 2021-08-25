import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("currentUser")) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("currentUser")).token}`;
  }
  return req;
});

export const signin = (formData) => API.post('api/users/signin', formData);
export const register = (formData) => API.post('api/users/register', formData);
export const setCurrentPlan = (planId, weekId) => API.put('api/users/currentplan', {planId, weekId})

export const createPlan = (newPlan) => API.post('api/plans', newPlan);
export const getPlanList = () => API.get('api/plans');

export const createWeek = (newWeek) => API.post('api/weeks', newWeek);
export const getWeekListByPlanId = (planId) => API.get(`api/weeks/${planId}`);





export const getPlanDetails = (id) => API.get(`api/plans/${id}`);
export const updatePlan = (id, updatedPlan) => API.put(`/plans/${id}`, updatedPlan);
export const deletePlan = (id) => API.delete(`/plans/${id}`);
