import type { HttpResponse, PaginatedResponse, PaginationProps } from "@/types";
import { endpoints } from "@/config";
import { axios } from "@/lib";

interface CreateWithdrawlDto {
	amount: number;
	recipientAccountNumber: string;
	recipientAccountName: string;
	recipientBank: string;
}

export const getWithdrawals = async (params?: PaginationProps & {}) => {
	if (params) {
	}
	return axios
		.get<
			HttpResponse<PaginatedResponse<string>>
		>(endpoints.withdrawals["read-all"], { params })
		.then((res) => res.data);
};

export const createWithdrawal = async (data: CreateWithdrawlDto) => {
	return axios
		.post<HttpResponse<string>>(endpoints.withdrawals["create"], data)
		.then((res) => res.data);
};

export const verifyWithdrawal = async (data: string) => {
	return axios
		.post<HttpResponse<string>>(endpoints.withdrawals["verify"], data)
		.then((res) => res.data);
};
