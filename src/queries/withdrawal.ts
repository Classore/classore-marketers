import type { HttpResponse, PaginatedResponse, PaginationProps } from "@/types";
import { endpoints } from "@/config";
import { axios } from "@/lib";

interface CreateWithdrawlDto {}

export const getWithdrawals = async (params?: PaginationProps & {}) => {
	if (params) {
	}
	return axios
		.get<
			HttpResponse<PaginatedResponse<any>>
		>(endpoints.withdrawals["read-all"], { params })
		.then((res) => res.data);
};

export const createWithdrawal = async (data: CreateWithdrawlDto) => {
	return axios
		.post<HttpResponse<any>>(endpoints.withdrawals["create"], data)
		.then((res) => res.data);
};

export const verifyWithdrawal = async (data: any) => {
	return axios
		.post<HttpResponse<any>>(endpoints.withdrawals["verify"], data)
		.then((res) => res.data);
};
