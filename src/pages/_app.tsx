import "@/styles/globals.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/sonner";
import type { AppProps } from "next/app";
import { queryClient } from "@/lib";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<Component {...pageProps} />
			<Toaster position="top-right" />
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}
