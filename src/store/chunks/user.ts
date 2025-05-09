import Cookies from "js-cookie";

import type { BankDetailsProps, Maybe, UserProps } from "@/types";
import { createPersistMiddleware } from "../middleware";

interface SignOutOptions {
	redirectUrl?: string;
	soft?: boolean;
}

interface UserStore {
	user: Maybe<UserProps>;
	bankDetails: Maybe<BankDetailsProps>;
	signin: (user: UserProps) => void;
	signout: (options?: SignOutOptions) => void;
	setBankDetails: (bankDetails: BankDetailsProps) => void;
}

const initialState: UserStore = {
	user: null,
	bankDetails: null,
	signin: () => {},
	signout: () => {},
	setBankDetails: () => {},
};

const useUserStore = createPersistMiddleware<UserStore>("classore-marketers", (set) => ({
	...initialState,
	signin: (user) => {
		set({ user });
		Cookies.set("CLASSORE_MARKETER_TOKEN", user.access_token, {
			expires: 1000 * 60 * 60 * 24 * 7,
			sameSite: "strict",
		});
	},
	signout: (options) => {
		try {
			if (!options?.soft) {
				set({ user: null });
			}
			Cookies.remove("CLASSORE_MARKETER_TOKEN");
		} catch (error) {
			console.error(error);
		} finally {
			window.location.href = options?.redirectUrl || "/";
			window.localStorage.removeItem("classore-marketers");
		}
	},
	setBankDetails: (bankDetails) => {
		set({ bankDetails });
	},
}));

export { useUserStore };
