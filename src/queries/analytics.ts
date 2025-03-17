import type { AnalyticsProps, HttpResponse } from "@/types";
import { endpoints } from "@/config";
import { axios } from "@/lib";

export type AnalyticsReportProps = HttpResponse<AnalyticsProps>;

const getAnylytics = async () => {
	return axios
		.get<HttpResponse<AnalyticsProps>>(endpoints().analytics.read_all)
		.then((res) => res.data);
};

export { getAnylytics };
