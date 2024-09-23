import axios from "axios";

const token = JSON.parse(localStorage.getItem("jwt_token"));

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
if (token) headers.Authorization = `Bearer ${token}`;

const api = axios.create({
    baseURL: 'http://127.0.0.1:5000',
    headers,
});

export default api;
