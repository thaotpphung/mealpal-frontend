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
export const updateUser = (userId, formData) =>
  API.patch(`api/users/${userId}`, formData);
export const updatePassword = (userId, formData) =>
  API.patch(`api/users/changepassword`, formData);

// users
export const setCurrentWeek = (weekId) =>
  API.patch('api/users/currentweek', { weekId });
export const getUser = () => API.get('api/users/');

// weeks
export const getWeek = (weekId) => API.get(`api/weeks/${weekId}`);
export const createWeek = (newWeek) => API.post('api/weeks', newWeek);
export const getWeeks = (query) => API.get(`api/weeks${query}`);
export const deleteWeek = (weekId) => API.delete(`api/weeks/${weekId}`);
export const updateWeek = (weekId, updatedWeek) =>
  API.patch(`api/weeks/${weekId}`, updatedWeek);
export const updateWeekByDay = (weekId, dayIdx, day) =>
  API.patch(`api/weeks/${weekId}/days/${dayIdx}`, day);

// days
export const getDayListByWeekId = (weekId) =>
  API.get(`api/days/weeks/${weekId}`);
export const getDay = (dayId) => API.get(`api/days/${dayId}`);

// meals
export const createMeal = (newMeal) => API.post('api/meals', newMeal);
export const deleteMeal = (mealId) => API.delete(`api/meals/${mealId}`);
export const updateMeal = (mealId, food) =>
  API.patch(`api/meals/${mealId}`, food);
export const deleteFood = (mealId, recipeId) =>
  API.delete(`api/meals/${mealId}/recipes/${recipeId}`);

// recipes
export const createRecipe = (newRecipe) => API.post('api/recipes', newRecipe);
export const getRecipes = (query) => API.get(`api/recipes/${query}`);
export const getRecipe = (recipeId) => API.get(`api/recipes/${recipeId}`);
export const deleteRecipe = (recipeId) => API.delete(`api/recipes/${recipeId}`);
export const updateRecipe = (recipeId, updatedRecipe) =>
  API.patch(`api/recipes/${recipeId}`, updatedRecipe);
