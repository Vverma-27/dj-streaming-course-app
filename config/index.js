import axios from "axios";

const url = process.env.NEXT_PUBLIC_API_URL || "localhost:3000";
export default axios.create({
  baseURL: `http://${url}`,
});
