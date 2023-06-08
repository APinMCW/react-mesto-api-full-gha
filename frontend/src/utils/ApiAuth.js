const config = {
  url: "https://api.learning-mesto.nomoredomains.rocks/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

export const register = (email, password) => {
  return fetch(`${config.url}/signup`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

export const authorize = (email, password) => {
  return fetch(`${config.url}/signin`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

export const checkToken = (JWT) => {
  return fetch(`${config.url}/users/me`, {
    method: "GET",
    headers: { ...config.headers, Authorization: `Bearer ${JWT}` },
  }).then(checkResponse);
};

