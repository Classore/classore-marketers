import Cookies from "js-cookie";
import axios from "axios";

const api = axios.create({
	baseURL: "https://classore-be-june-224829194037.europe-west1.run.app/classore/v1",
});

api.interceptors.request.use(
	(config) => {
		const token = Cookies.get("CLASSORE_MARKETER_TOKEN");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export { api as axios };
