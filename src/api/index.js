import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8080' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('currentUser')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`;
  }
  return req;
});

export const signin = (formData) => API.post('api/users/signin', formData);
export const register = (formData) => API.post('api/users/register', formData);