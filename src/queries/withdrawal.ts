import { endpoints } from "@/config";
import { axios } from "@/lib";
import type {
	BankProps,
	HttpResponse,
	PaginatedResponse,
	PaginationProps,
	WithdrawalProps,
} from "@/types";

interface CreateWithdrawlDto {
	amount: number;
}

const getWithdrawals = async (params?: PaginationProps & {}) => {
	if (params) {
		for (const key in params) {
			if (
				!params[key as keyof typeof params] ||
				params[key as keyof typeof params] === undefined
			) {
				delete params[key as keyof typeof params];
			}
		}
	}
	return axios
		.get<
			HttpResponse<PaginatedResponse<WithdrawalProps>>
		>(endpoints().withdrawals.read_all, { params })
		.then((res) => res.data);
};

const getBanks = async (params?: PaginationProps & {}) => {
	return axios
		.get<
			HttpResponse<PaginatedResponse<BankProps>>
		>(endpoints().withdrawals.get_banks, { params })
		.then((res) => res.data);
};

const createWithdrawal = async (data: CreateWithdrawlDto) => {
	return axios
		.post<HttpResponse<string>>(endpoints().withdrawals.create, data)
		.then((res) => res.data);
};

const verifyWithdrawal = async (data: string) => {
	return axios
		.post<HttpResponse<string>>(endpoints().withdrawals.verify, data)
		.then((res) => res.data);
};

export { createWithdrawal, getBanks, getWithdrawals, verifyWithdrawal };
