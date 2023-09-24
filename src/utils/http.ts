import axios from "axios";

console.log(process.env.REACT_APP_SERVER_DOMAIN);

const http = axios.create({
    baseURL: process.env.REACT_APP_SERVER_DOMAIN,
});

const privateHttp = axios.create({
    baseURL: process.env.REACT_APP_SERVER_DOMAIN,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export { privateHttp };
export default http;
