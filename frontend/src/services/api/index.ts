import axios from "axios";
import { URL_API } from "../../config";

const apiService = axios.create({
  baseURL: URL_API,
  validateStatus: status => status < 500,
});

export { apiService };
