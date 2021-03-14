import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const token = localStorage.getItem('token');
if (token) axios.defaults.headers.common['x-auth-token'] = token;

export const userRegister = (data) => axios.post(API_URL + '/users', data);
export const userLogin = (data) => axios.post(API_URL + '/auth', data);
export const addUserCard = (data) => axios.post(API_URL + '/cards', data);
export const getUserCards = () => axios.get(API_URL + '/cards/user');
export const getAllCards = () => axios.get(API_URL + '/cards');
export const getUserFavoriteCards = () =>
  axios.get(API_URL + '/cards/favorite');
export const addUserFavoriteCard = (id) =>
  axios.post(API_URL + `/cards/${id}/favorite`);
export const deleteUserFavoriteCard = (id) =>
  axios.delete(API_URL + `/cards/${id}/favorite`);
export const deleteCard = (id) => axios.delete(API_URL + `/cards/${id}`);
export const editCard = (id, data) => axios.put(API_URL + `/cards/${id}`, data);
export const getCardComments = (id) => axios.get(API_URL + `/comments/${id}`);
export const addCardComments = (id, data) =>
  axios.post(API_URL + `/comments/${id}`, data);
export const updateCard = (id, data) =>
  axios.patch(API_URL + `/cards/${id}`, data);
export const searchCard = (q) => axios.get(API_URL + `/cards/search?q=${q}`);
