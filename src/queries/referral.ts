import { type Period, endpoints } from "@/config";
import { axios } from "@/lib";
import type {
	ChartData,
	HttpResponse,
	PaginatedResponse,
	PaginationProps,
	ReferralProps,
} from "@/types";

export const getReferralCharts = async (
	params?: PaginationProps & { timeLine: Period }
) => {
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
		.get<HttpResponse<ChartData[]>>(endpoints().referrals.read_all, { params })
		.then((res) => res.data);
};

export const getReferrals = async (params?: PaginationProps & { timeLine: Period }) => {
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
			HttpResponse<PaginatedResponse<ReferralProps>>
		>(endpoints().referrals.read_all, { params })
		.then((res) => res.data);
};
