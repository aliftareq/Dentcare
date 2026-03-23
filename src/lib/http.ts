import axios from "axios";

export const http = axios.create({
  baseURL: "", // optional: your API base URL
  withCredentials: true, // optional
});