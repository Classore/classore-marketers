import type { HttpResponse, PaginatedResponse, PaginationProps } from "@/types";
import { endpoints } from "@/config";
import { axios } from "@/lib";

export const getReferrals = async (params?: PaginationProps & {}) => {
	if (params) {
	}
	return axios
		.get<HttpResponse<PaginatedResponse<any>>>(endpoints.referrals["read-all"], { params })
		.then((res) => res.data);
};
