import apiConfig from "./apiConfig";

class Api {
  constructor() {
    this._url = apiConfig.url;
    this._headers = apiConfig.headers;
  }
  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(
        `Ошибка: ${response.status} ${response.statusText}`
      );
    }
  }

  getUserInfo() {
    return fetch(`${this._url}${"users/me"}`, {
      headers: {...this._headers, authorization: `Bearer ${localStorage.getItem("token")}`},
      method: "GET",
    }).then(this._checkResponse);
  }

  getCards() {
    return fetch(`${this._url}${"cards"}`, {
      headers: {...this._headers, authorization: `Bearer ${localStorage.getItem("token")}`},
      method: "GET",
    }).then(this._checkResponse);
  }

  setUserInfo(userInfo) {
    return fetch(`${this._url}${"users/me"}`, {
      headers: {...this._headers, authorization: `Bearer ${localStorage.getItem("token")}`},
      method: "PATCH",
      body: JSON.stringify({
        name: userInfo.name,
        about: userInfo.about,
      }),
    }).then(this._checkResponse);
  }

  setCard(card) {
    return fetch(`${this._url}${"cards"}`, {
      headers: {...this._headers, authorization: `Bearer ${localStorage.getItem("token")}`},
      method: "POST",
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    }).then(this._checkResponse);
  }

  delCard(cardId) {
    return fetch(`${this._url}${"cards"}/${cardId}`, {
      headers: {...this._headers, authorization: `Bearer ${localStorage.getItem("token")}`},
      method: "DELETE",
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLikeCard) {
    if (isLikeCard) {
      return fetch(`${this._url}${"cards"}/${cardId}/${"likes"}`, {
        headers: {...this._headers, authorization: `Bearer ${localStorage.getItem("token")}`},
        method: "PUT",
      }).then(this._checkResponse);
    } else {
      return fetch(`${this._url}${"cards"}/${cardId}/${"likes"}`, {
        headers: {...this._headers, authorization: `Bearer ${localStorage.getItem("token")}`},
        method: "DELETE",
      }).then(this._checkResponse);
    }
  }

  setAvatar(avatar) {
    return fetch(`${this._url}${"users/me/avatar"}`, {
      method: "PATCH",
      headers: {...this._headers, authorization: `Bearer ${localStorage.getItem("token")}`},
      body: JSON.stringify({ avatar }),
    }).then(this._checkResponse);
  }
}

const api = new Api();
export default api;
