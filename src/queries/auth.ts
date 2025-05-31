import type { HttpResponse } from "@/types";
import type { UserProps } from "@/types";
import { endpoints } from "@/config";
import { axios } from "@/lib";

export interface SigninDto {
	email: string;
	password: string;
}

export interface CreatePasswordDto {
	confirm_password: string;
	new_password: string;
	otp: string;
}

const SignIn = async (data: SigninDto) => {
	return axios
		.post<HttpResponse<UserProps>>(endpoints().auth.signin, data)
		.then((res) => res.data);
};

const RequestPasswordReset = async (email: string) => {
	return axios
		.post<HttpResponse<string>>(endpoints().auth.request_password_reset, { email })
		.then((res) => res.data);
};

const PasswordReset = async (data: CreatePasswordDto) => {
	return axios
		.post<HttpResponse<string>>(endpoints().auth.password_reset, data)
		.then((res) => res.data);
};

export { PasswordReset, RequestPasswordReset, SignIn };
