import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const signUpApi = (email: string,name: string,password: string) => axios.post(`${API_URL}/auth/register`, { email, name, password })

export const signInApi = (email: string,password: string) => axios.post(`${API_URL}/auth/login`, { email, password })

export const getUserDataApi = () => axios.get(`${API_URL}/users/profile`)

export const setToken = (token: string): void => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const removeToken = (): void => {
  axios.defaults.headers.common['Authorization'] = null;
};
