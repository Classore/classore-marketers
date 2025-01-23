import { QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { IsHttpError, httpErrorhandler } from "./http";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60, // 1 minute
			refetchOnWindowFocus: false,
			refetchOnMount: false,
		},
		mutations: {
			onError: (error) => {
				console.error(error);
				const isHttpError = IsHttpError(error);
				if (isHttpError) {
					const { message } = httpErrorhandler(error);
					toast.error(message);
					return;
				} else {
					toast.error(error.message ?? "Something went wrong");
				}
			},
		},
	},
});
