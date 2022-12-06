import axios from "axios";
import { Strings } from "./constant";

const instance = axios.create({

    baseURL: Strings.REACT_APP_API_URL
});

export default instance;