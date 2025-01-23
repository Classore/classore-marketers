import { useQueries } from "@tanstack/react-query";
import type { GetServerSideProps } from "next";
import { faker } from "@faker-js/faker";
import { toast } from "sonner";
import Link from "next/link";
import React from "react";
import {
	RiFileCopyLine,
	RiParentLine,
	RiTeamLine,
	RiUser4Line,
	RiUserLine,
} from "@remixicon/react";

import type { ChartData, ReferralProps, WithdrawalProps } from "@/types";
import { ChartBar } from "@/components/charts";
import { Coin } from "@/assets/svgs/coin";
import { TAB_OPTIONS } from "@/config";
import { greeting } from "@/lib";
import {
	Appbar,
	Card,
	ReferralItem,
	Seo,
	Sharer,
	TabPanel,
	WithdrawalItem,
	WithdrawPoints,
} from "@/components/shared";

import { day_data, month_data, week_data, year_data } from "@/mock";

const copy = (value: string) => {
	navigator.clipboard.writeText(value);
	toast.success("Referral code copied!");
};

interface PageProps {
	referrals: ReferralProps[];
	withdrawals: WithdrawalProps[];
}

const Page = ({ referrals, withdrawals }: PageProps) => {
	const [selectedPeriod, setSelectedPeriod] = React.useState("THIS_YEAR");
	const [tab, setTab] = React.useState("referral");
	const [open, setOpen] = React.useState({
		share: false,
		withdraw: false,
	});

	const [] = useQueries({
		queries: [],
	});

	const data: ChartData[] = React.useMemo(() => {
		switch (selectedPeriod) {
			case "THIS_YEAR":
				return year_data;
			case "THIS_MONTH":
				return month_data;
			case "THIS_WEEK":
				return week_data;
			case "TODAY":
				return day_data;
			default:
				return year_data;
		}
	}, [selectedPeriod]);

	return (
		<>
			<Seo title="Dashboard" />
			<Appbar />
			<main className="container h-[calc(100vh-96px)] py-10">
				<div className="h-full w-full space-y-3 overflow-y-auto rounded-3xl bg-neutral-100 p-3">
					<div className="w-full space-y-2 rounded-xl bg-gradient-to-r from-[#feede3]/40 to-[#6f42c1]/15 px-5 py-8">
						<h1 className="text-2xl font-bold">{greeting()} Samson</h1>
						<p className="text-sm text-neutral-400">
							Monitor your ward&apos;s progress with Classore
						</p>
					</div>
					<div className="grid max-h-[650px] w-full grid-cols-2 gap-x-4">
						<div className="w-full space-y-3 rounded-2xl bg-white px-5 py-4">
							<div className="flex w-full items-center justify-between">
								<h5 className="text-lg font-semibold">Analytics Report</h5>
							</div>
							<div className="grid w-full grid-cols-2 gap-4">
								<Card icon={RiTeamLine} label="Total Referrals" value={100} />
								<Card icon={RiParentLine} label="Parents" value={100} />
								<Card icon={RiUserLine} label="Students" value={100} />
								<Card icon={RiUser4Line} label="Marketers" value={100} />
							</div>
							<ChartBar
								data={data}
								selectedPeriod={selectedPeriod}
								setSelectedPeriod={setSelectedPeriod}
							/>
						</div>

						<div className="w-full space-y-8 rounded-2xl bg-white px-5 py-4">
							<div className="grid w-full grid-cols-2 gap-x-3">
								<div className="w-full rounded-lg bg-gradient-to-r from-[#341f5b]/40 to-[#6f42c1] p-4">
									<div className="w-full space-y-2">
										<div className="grid size-9 place-items-center rounded-full bg-white/25">
											<Coin className="size-6 text-red-500" />
										</div>
										<div className="w-full space-y-1">
											<h3 className="text-2xl font-semibold text-white">330 Points</h3>
											<p className="text-sm text-neutral-100">Your points equals NGN 33</p>
										</div>
										<WithdrawPoints
											onClose={(withdraw) => setOpen({ ...open, withdraw })}
											open={open.withdraw}
										/>
									</div>
								</div>
								<div className="w-full rounded-lg bg-gradient-to-r from-[#feede3]/40 to-[#6f42c1]/15 p-4">
									<div className="space-y-8 py-1">
										<div>
											<p className="text-sm text-neutral-400">Referral Code</p>
											<h4 className="text-2xl">CODE HERE</h4>
										</div>
										<div className="flex items-center gap-x-2">
											<Sharer
												onClose={(share) => setOpen({ ...open, share })}
												open={open.share}
												url="CODE HERE"
											/>
											<button
												onClick={() => copy("CODE HERE")}
												className="flex h-10 w-[90px] items-center justify-center gap-x-2 rounded-3xl bg-white px-4 py-3 text-xs">
												Copy <RiFileCopyLine className="size-4" />
											</button>
										</div>
									</div>
								</div>
							</div>

							<div className="w-full space-y-4">
								<div className="flex h-10 w-full items-center gap-x-6 border-b">
									{TAB_OPTIONS.map(({ icon: Icon, label, value }) => (
										<button
											key={value}
											onClick={() => setTab(value)}
											className={`relative flex h-full items-center gap-x-2 text-sm font-medium transition-all duration-500 before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full before:bg-primary-400 ${tab === value ? "text-primary-400 before:block" : "text-neutral-400 before:hidden"}`}>
											<Icon className="size-5" /> {label}
										</button>
									))}
								</div>
								<div className="w-full">
									<TabPanel selected={tab} value="referral">
										<div className="w-full space-y-4">
											{referrals.map((referral) => (
												<ReferralItem key={referral.id} referral={referral} />
											))}
											<div className="flex items-center justify-center">
												<Link href="/dashboard/referrals" className="link text-sm">
													See all
												</Link>
											</div>
										</div>
									</TabPanel>
									<TabPanel selected={tab} value="withdrawal">
										<div className="w-full space-y-4">
											{withdrawals.map((withdrawal) => (
												<WithdrawalItem key={withdrawal.id} withdrawal={withdrawal} />
											))}
											<div className="flex items-center justify-center">
												<Link href="/dashboard/withdrawals" className="link text-sm">
													See all
												</Link>
											</div>
										</div>
									</TabPanel>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
};

export default Page;

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
	const referrals: ReferralProps[] = Array.from({ length: 6 }, () => ({
		email: faker.internet.email(),
		fullName: faker.person.fullName(),
		id: faker.string.uuid(),
		points: faker.number.int({ min: 5, max: 100 }),
		status: faker.helpers.arrayElement(["active", "inactive"]),
	}));

	const withdrawals: WithdrawalProps[] = Array.from({ length: 6 }, () => ({
		amount: faker.number.int({ min: 50, max: 500 }),
		date: faker.date.between({ from: "2024-01-01", to: "2024-12-31" }).toISOString(),
		id: faker.string.uuid(),
		status: faker.helpers.arrayElement(["pending", "successful", "failed"]),
	}));

	return {
		props: {
			referrals,
			withdrawals,
		},
	};
};
