import Cookies from "js-cookie";

import { createPersistMiddleware } from "../middleware";
import type { Maybe, UserProps } from "@/types";

interface SignOutOptions {
	redirectUrl?: string;
	soft?: boolean;
}

interface UserStore {
	user: Maybe<UserProps>;
	signin: (user: UserProps) => void;
	signout: (options?: SignOutOptions) => void;
}

const initialState: UserStore = {
	user: null,
	signin: () => {},
	signout: () => {},
};

const useUserStore = createPersistMiddleware<UserStore>("classore-marketers", (set) => ({
	...initialState,
	signin: (user) => {
		set({ user });
		Cookies.set("classore-marketer", user.access_token, {
			expires: 1000 * 60 * 60 * 24 * 7,
			sameSite: "strict",
		});
	},
	signout: (options) => {
		try {
			if (!options?.soft) {
				set({ user: null });
			}
			Cookies.remove("classore-marketer");
		} catch (error) {
			console.error(error);
		} finally {
			window.location.href = options?.redirectUrl || "/";
			window.localStorage.removeItem("classore-marketers");
		}
	},
}));

export { useUserStore };
