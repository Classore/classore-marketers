import type { BankDetailsProps, HttpResponse, UserProps } from "@/types";
import { endpoints } from "@/config";
import { axios } from "@/lib";

export interface BankDetailsDto {
	account_number: string | undefined;
	bank_id: string | undefined;
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

const getBankDetails = async () => {
	return axios
		.get<HttpResponse<BankDetailsProps[]>>(endpoints().user.get_bank_details)
		.then((res) => res.data);
};

const updateBankDetails = async (userId: string, values: BankDetailsDto) => {
	return axios
		.post<
			HttpResponse<BankDetailsProps>
		>(endpoints(userId).user.update_bank_details, values)
		.then((res) => res.data);
};

const updateSecurity = async (userId: string, values: SecurityProps) => {
	return axios
		.put<HttpResponse<SecurityProps>>(endpoints(userId).user.update_password, values)
		.then((res) => res.data);
};

export { getBankDetails, updateBankDetails, updateSecurity, updateUser };
