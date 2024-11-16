import axios from "axios";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/`;

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";

export default axios;
