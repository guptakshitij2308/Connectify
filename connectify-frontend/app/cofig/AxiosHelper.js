import axios from "axios";

export const baseURL = "http://localhost:8080";

export const httpClient = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
