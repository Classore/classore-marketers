import type { HttpResponse, UserProps } from "@/types";
import { endpoints } from "@/config";
import { axios } from "@/lib";

export interface BankDetailsProps {
	accountName: string;
	accountNumber: string;
	bankName: string;
}

export interface SecurityProps {
	oldPassword: string;
	newPassword: string;
	confirmPassword: string;
}

const updateUser = async (userId: string, values: Partial<UserProps>) => {
	return axios
		.put<HttpResponse<UserProps>>(endpoints(userId).user.update_user, values)
		.then((res) => res.data);
};

const updateBankDetails = async (userId: string, values: BankDetailsProps) => {
	return axios
		.put<HttpResponse<BankDetailsProps>>(endpoints(userId).user.update_bank_details, values)
		.then((res) => res.data);
};

const updateSecurity = async (userId: string, values: SecurityProps) => {
	return axios
		.put<HttpResponse<SecurityProps>>(endpoints(userId).user.update_password, values)
		.then((res) => res.data);
};

export { updateBankDetails, updateSecurity, updateUser };
