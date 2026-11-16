import checkResponse from './checkResponse';
import { MOVIES_API_BASE_URL } from './config';

export const BASE_URL = MOVIES_API_BASE_URL;

const request = async (path, options) => {
  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, options);
  } catch (cause) {
    const error = new Error('Не удалось связаться с API Movies Explorer. Возможна проблема с DNS, интернетом или CORS.');
    error.code = 'API_UNAVAILABLE';
    error.cause = cause;
    throw error;
  }
  return checkResponse(response);
};

export const register = (name, email, password) => {
  return request('/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });
};

export const authorize = (email, password) => {
  return request('/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
};

export const updateUserInfo = (name, email) => {
  return request('/users/me', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({
      name,
      email,
    }),
  });
};

export const checkToken = (token) => {
  return request('/users/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};
