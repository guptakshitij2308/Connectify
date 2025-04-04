import axios from "axios";

export const baseURL = "https://connectify-pxky.onrender.com";

export const httpClient = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
