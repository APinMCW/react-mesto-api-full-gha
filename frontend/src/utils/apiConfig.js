const apiConfig = {
  url: "https://api.learning-mesto.nomoredomains.rocks/",
  headers: {
    "Content-type": 'application/json',
    "Accept": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}`
  },
};

export default apiConfig;