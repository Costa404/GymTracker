import axios from "axios";
window.axios = axios;

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

window.axios.defaults.withCredentials = true; // 👈 adiciona isto
window.axios.defaults.withXSRFToken = true; // 👈 e isto
