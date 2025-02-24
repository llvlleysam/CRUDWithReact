import axios from "axios";
import { BASE_URL } from "../Constant/URLs";

export const httpService = axios.create({
    baseURL: BASE_URL
})