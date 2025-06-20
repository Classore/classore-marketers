import { useRouter } from "next/router";
import Cookies from "js-cookie";
import React from "react";

import { useUserStore } from "@/store/chunks/user";

export const withGuard = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
	const GuardedComponent = (props: P) => {
		const { user } = useUserStore();
		const router = useRouter();
		const token = Cookies.get("CLASSORE_MARKETER_TOKEN");

		React.useEffect(() => {
			if (!user || !token) {
				router.push("/");
			}
		}, [router, token, user]);

		return !user || !token ? null : <WrappedComponent {...props} />;
	};

	return GuardedComponent;
};
