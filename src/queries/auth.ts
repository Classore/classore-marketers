import type { HttpResponse } from "@/types";
import { endpoints } from "@/config";
import { axios } from "@/lib";

interface SigninDto {
	email: string;
	password: string;
}

interface CreatePasswordDto {
	confirmPassword: string;
	password: string;
	token: string;
}

export const signin = async (data: SigninDto) => {
	return axios
		.post<HttpResponse<any>>(endpoints.auth["signin"], data)
		.then((res) => res.data);
};

export const createPassword = async (data: CreatePasswordDto) => {
	return axios
		.post<HttpResponse<any>>(endpoints.auth["create-password"], data)
		.then((res) => res.data);
};

export const forgotPassword = async (data: { email: string }) => {
	return axios
		.post<HttpResponse<any>>(endpoints.auth["forgot-password"], data)
		.then((res) => res.data);
};

export const resetPassword = async (data: CreatePasswordDto) => {
	return axios
		.post<HttpResponse<any>>(endpoints.auth["reset-password"], data)
		.then((res) => res.data);
};
