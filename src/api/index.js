import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('currentUser')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('currentUser')).token
    }`;
  }
  return req;
});

// auth
export const signin = (formData) => API.post('api/users/signin', formData);
export const register = (formData) => API.post('api/users/register', formData);

// users
export const setCurrentPlan = (planId, weekId) =>
  API.put('api/users/currentplan', { planId, weekId });
export const getUser = () => API.get('api/users/');

// plans
export const createPlan = (newPlan, isNewUser) =>
  API.post('api/plans', { plan: newPlan, isNewUser });
export const getPlanList = () => API.get('api/plans');
export const getPlanDetails = (id) => API.get(`api/plans/${id}`);
export const updatePlan = (id, updatedPlan) =>
  API.put(`/plans/${id}`, updatedPlan);
export const deletePlan = (id) => API.delete(`api/plans/${id}`);

// weeks
export const createWeek = (newWeek) => API.post('api/weeks', newWeek);
export const getWeekListByPlanId = (planId) => API.get(`api/weeks/${planId}`);
export const deleteWeek = (weekId) => API.delete(`api/weeks/${weekId}`);

// days
export const getDayListByWeekId = (weekId) => API.get(`api/days/${weekId}`);
export const updateDay = (dayId, meals) => API.put(`api/days/${dayId}`, meals);

// meals
export const createMeal = (newMeal) => API.post('api/meals', newMeal);
export const deleteMeal = (mealId) => API.delete(`api/meals/${mealId}`);
