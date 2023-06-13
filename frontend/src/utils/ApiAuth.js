import apiConfig from "./apiConfig";

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

export const register = (email, password) => {
  return fetch(`${apiConfig.url}signup`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

export const authorize = (email, password) => {
  return fetch(`${apiConfig.url}signin`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

export const checkToken = (JWT) => {
  return fetch(`${apiConfig.url}users/me`, {
    method: "GET",
    headers: { ...apiConfig.headers, Authorization: `Bearer ${JWT}` },
  }).then(checkResponse);
};

