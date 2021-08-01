import axios from "axios";

const strapiUrl = process.env.NEXT_PUBLIC_API_URL || "localhost:1337";
const authenticationUrl = process.env.NEXT_URL_FRONTEND || "localhost:3000/api";
export const strapi = axios.create({
  baseURL: `http://${strapiUrl}`,
});
export const authentication = axios.create({
  baseURL: `http://${authenticationUrl}`,
});
export const PER_PAGE = 5;
