import axios from 'axios';
import { getEnvVars } from '../utils/envs';

const env = getEnvVars(window.location.host);
const API = axios.create({ baseURL: env.BASE_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('loggedInUser')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('loggedInUser')).token
    }`;
  }
  return req;
});

// auth
export const signin = (formData) => API.post('api/signin', formData);
export const register = (formData) => API.post('api/register', formData);
export const updatePassword = (formData) => API.patch(`api/password`, formData);
// confirm email
export const sendConfirmationEmail = (formData) =>
  API.post(`api/email/confirm`, formData);
// forgot password
export const forgotPassword = (formData) =>
  API.post(`api/password/reset`, formData);
export const resetPassword = (formData, token) =>
  API.patch(`api/password/reset/${token}`, formData);

// users
export const updateUser = (userId, formData) =>
  API.patch(`api/users/${userId}`, formData);
export const getUser = (userId, query = '') => {
  const url = `api/users/${userId}${query}`;
  return API.get(url);
};
// cart
export const sendCart = (userId, cart) =>
  API.post(`api/users/${userId}/cart`, cart);

// weeks
export const getWeeks = (query, isInExploreMode, userId) => {
  const url = `api/${
    isInExploreMode || !userId ? '' : `users/${userId}/`
  }weeks`;
  return API.get(url, { params: query });
};
export const getWeek = (weekId) => API.get(`api/weeks/${weekId}`);
export const createWeek = (newWeek) => API.post('api/weeks', newWeek);
export const deleteWeek = (weekId) => API.delete(`api/weeks/${weekId}`);
export const updateWeek = (weekId, updatedWeek) =>
  API.patch(`api/weeks/${weekId}`, updatedWeek);
export const updateWeekByDay = (weekId, dayIdx, day) =>
  API.patch(`api/weeks/${weekId}/days/${dayIdx}`, day);
export const deleteWeeks = (selected, query) =>
  API.post(`api/weeks/deletes`, { selected, query });

// recipes
export const getRecipes = (query, isInExploreMode, userId) => {
  const url = `api/${
    isInExploreMode || !userId ? '' : `users/${userId}/`
  }recipes`;
  return API.get(url, { params: query });
};
export const createRecipe = (newRecipe) => API.post('api/recipes', newRecipe);
export const getRecipe = (recipeId) => API.get(`api/recipes/${recipeId}`);
export const deleteRecipe = (recipeId) => API.delete(`api/recipes/${recipeId}`);
export const updateRecipe = (recipeId, updatedRecipe) =>
  API.patch(`api/recipes/${recipeId}`, updatedRecipe);
export const deleteRecipes = (selected, query) =>
  API.post(`api/recipes/deletes`, { selected, query });
