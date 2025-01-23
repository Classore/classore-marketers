export const endpoints = {
	auth: {
		"create-password": "/auth/create-password",
		"forgot-password": "/auth/forgot-password",
		"reset-password": "/auth/reset-password",
		signin: "/auth/signin",
	},
	referrals: {
		"read-all": "/referrals",
	},
	withdrawals: {
		"read-all": "/withdrawals",
		create: "/withdrawals",
		verify: "/withdrawals/verify",
	},
};
