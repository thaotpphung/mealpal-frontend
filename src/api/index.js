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
export const setCurrentWeek = (weekId) =>
  API.patch('api/users/currentweek', { weekId });
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
export const getWeeks = () => API.get(`api/weeks/`);
export const deleteWeek = (weekId) => API.delete(`api/weeks/${weekId}`);
export const updateWeek = (weekId, updatedWeek) =>
  API.patch(`api/weeks/${weekId}`, updatedWeek);

// days
export const getDayListByWeekId = (weekId) => API.get(`api/days/${weekId}`);

// meals
export const createMeal = (newMeal) => API.post('api/meals', newMeal);
export const deleteMeal = (mealId) => API.delete(`api/meals/${mealId}`);
export const updateMeal = (mealId, food) =>
  API.patch(`api/meals/${mealId}`, food);
export const deleteFood = (mealId, recipeId) =>
  API.delete(`api/meals/${mealId}/recipes/${recipeId}`);

// recipes
export const createRecipe = (newRecipe) => API.post('api/recipes', newRecipe);
export const getRecipes = () => API.get(`api/recipes/`);
export const deleteRecipe = (recipeId) => API.delete(`api/recipes/${recipeId}`);
export const updateRecipe = (recipeId, updatedRecipe) =>
  API.patch(`api/recipes/${recipeId}`, updatedRecipe);
