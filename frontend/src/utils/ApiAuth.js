import apiConfig from "./apiConfig";
<<<<<<< HEAD
=======

>>>>>>> 0fa24be11d194654ff8e7e3f58ad4546d8cfa62c

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
<<<<<<< HEAD
    headers: { ...apiConfig.headers, Authorization: `Bearer ${JWT}` },
=======
    headers: { ...apiConfig.headers, authorization: `Bearer ${JWT}` },
>>>>>>> 0fa24be11d194654ff8e7e3f58ad4546d8cfa62c
  }).then(checkResponse);
};

