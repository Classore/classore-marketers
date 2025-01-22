import Cookies from "js-cookie"
import axios from "axios"

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
})

api.interceptors.request.use(
	(config) => {
		const token = Cookies.get("CLASSORE_MARKETER_TOKEN")
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

export { api as axios }
