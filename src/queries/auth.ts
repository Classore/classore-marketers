import type { HttpResponse } from "@/types";
import type { UserProps } from "@/types";
import { endpoints } from "@/config";
import { axios } from "@/lib";

export interface SigninDto {
	email: string;
	password: string;
}

export interface CreatePasswordDto {
	confirmPassword: string;
	password: string;
	token: string;
}

const SignIn = async (data: SigninDto) => {
	return axios
		.post<HttpResponse<UserProps>>(endpoints().auth.signin, data)
		.then((res) => res.data);
};

const RequestPasswordReset = async (data: CreatePasswordDto) => {
	return axios
		.post<HttpResponse<string>>(endpoints().auth.request_password_reset, data)
		.then((res) => res.data);
};

export { RequestPasswordReset, SignIn };
