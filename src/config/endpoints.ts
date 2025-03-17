export const endpoints = (id?: string) => {
	return {
		analytics: {
			read_all: "/admin/marketer/homepage-analytics",
		},
		auth: {
			request_password_reset: "/admin/staff/password/reset-request",
			signin: "/admin/staff/login",
		},
		referrals: {
			read_all: "/admin/marketer/referral-report",
		},
		user: {
			update_user: `/admin/staff/update/${id}`,
			get_bank_details: `/admin/payment/view-my-bank-details`,
			update_bank_details: `/admin/payment/add-bank-details`,
			update_password: `/admin/marketer/update-password${id}`,
		},
		withdrawals: {
			read_all: "/admin/marketer/fetch-withdrawals",
			create: "/admin/marketer/make-withdrawal-request",
			verify: "/withdrawals/verify",
			get_banks: "/admin/payment/get-banks",
		},
	};
};
