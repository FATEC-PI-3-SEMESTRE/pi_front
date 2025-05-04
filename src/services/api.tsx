import axios from "axios";

const api = axios.create({
  baseURL: window.location.hostname.includes("localhost")
    ? "http://localhost:8080"
    : "https://fobov-java.onrender.com",
});

api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// Tratamento de erro global
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expirado ou inválido, redirecionar para login
      localStorage.removeItem("token");
      // Use history.push para redirecionar para a página de login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export { api };
