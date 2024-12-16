const APP_ENV = process.env.NODE_ENV;

const TEST_URL = "http://localhost:8000/api";
const PROD_URL = "/m-look/api";

export const BASE_URL = APP_ENV === "production" ? PROD_URL : TEST_URL;
