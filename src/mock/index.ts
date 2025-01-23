import type { ReferralProps, WithdrawalProps } from "@/types";
import { faker } from "@faker-js/faker";

export const referral_list: ReferralProps[] = Array.from({ length: 6 }, (_, index) => ({
	email: faker.internet.email(),
	fullName: faker.person.fullName(),
	id: `${index + 1}`,
	points: faker.number.int({ min: 5, max: 100 }),
	status: faker.helpers.arrayElement(["active", "inactive"]),
}));

export const withdrawal_list: WithdrawalProps[] = Array.from(
	{ length: 6 },
	(_, index) => ({
		amount: faker.number.int({ min: 50, max: 500 }),
		createdOn: faker.date.between({ from: "2024-01-01", to: "2024-12-31" }),
		date: faker.date.between({ from: "2024-01-01", to: "2024-12-31" }),
		id: `${index + 1}`,
		status: faker.helpers.arrayElement(["pending", "successful", "failed"]),
	})
);
