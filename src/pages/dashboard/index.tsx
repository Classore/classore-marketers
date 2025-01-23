import { toast } from "sonner";
import React from "react";
import {
	RiDownload2Line,
	RiFileCopyLine,
	RiParentLine,
	RiShareLine,
	RiTeamLine,
	RiUser4Line,
	RiUserAddLine,
	RiUserLine,
} from "@remixicon/react";

import { Appbar, Card, Seo, TabPanel, WithdrawPoints } from "@/components/shared";
import { ChartBar } from "@/components/charts";
import { Coin } from "@/assets/svgs/coin";
import type { ChartData } from "@/types";
import { greeting } from "@/lib";

const TAB_OPTIONS = [
	{ icon: RiUserAddLine, label: "Referral History", value: "referral" },
	{ icon: RiDownload2Line, label: "Withdrawal History", value: "withdrawal" },
];

const year_data: ChartData[] = [
	{ date: "Jan", referral: 1000 },
	{ date: "Feb", referral: 500 },
	{ date: "Mar", referral: 300 },
	{ date: "Aprl", referral: 400 },
	{ date: "May", referral: 500 },
	{ date: "Jun", referral: 600 },
	{ date: "Jul", referral: 700 },
	{ date: "Aug", referral: 800 },
	{ date: "Sep", referral: 900 },
	{ date: "Oct", referral: 1000 },
	{ date: "Nov", referral: 1100 },
	{ date: "Dec", referral: 900 },
];

const month_data: ChartData[] = [
	{ date: "1", referral: 35 },
	{ date: "5", referral: 45 },
	{ date: "10", referral: 60 },
	{ date: "15", referral: 40 },
	{ date: "20", referral: 55 },
	{ date: "25", referral: 65 },
	{ date: "30", referral: 50 },
];

const week_data: ChartData[] = [
	{ date: "Mon", referral: 120 },
	{ date: "Tue", referral: 145 },
	{ date: "Wed", referral: 135 },
	{ date: "Thu", referral: 160 },
	{ date: "Fri", referral: 180 },
	{ date: "Sat", referral: 90 },
	{ date: "Sun", referral: 75 },
];

const day_data: ChartData[] = [
	{ date: "00:00", referral: 5 },
	{ date: "03:00", referral: 2 },
	{ date: "06:00", referral: 8 },
	{ date: "09:00", referral: 15 },
	{ date: "12:00", referral: 25 },
	{ date: "15:00", referral: 20 },
	{ date: "18:00", referral: 18 },
	{ date: "21:00", referral: 10 },
];

const copy = (value: string) => {
	navigator.clipboard.writeText(value);
	toast.success("Referral code copied!");
};

const Page = () => {
	const [selectedPeriod, setSelectedPeriod] = React.useState("THIS_YEAR");
	const [tab, setTab] = React.useState("referral");
	const [open, setOpen] = React.useState(false);

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
						<p className="text-sm text-neutral-400">Monitor your ward&apos;s progress with Classore</p>
					</div>
					<div className="grid w-full grid-cols-2 gap-x-4">
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
										<WithdrawPoints onClose={setOpen} open={open} />
									</div>
								</div>
								<div className="w-full rounded-lg bg-gradient-to-r from-[#feede3]/40 to-[#6f42c1]/15 p-4">
									<div className="space-y-8 py-1">
										<div>
											<p className="text-sm text-neutral-400">Referral Code</p>
											<h4 className="text-2xl">CODE HERE</h4>
										</div>
										<div className="flex items-center gap-x-2">
											<button className="flex h-10 w-[90px] items-center justify-center gap-x-2 rounded-3xl bg-white px-4 py-3 text-xs">
												Share <RiShareLine className="size-4" />
											</button>
											<button
												onClick={() => copy("CODE HERE")}
												className="flex h-10 w-[90px] items-center justify-center gap-x-2 rounded-3xl bg-white px-4 py-3 text-xs">
												Copy <RiFileCopyLine className="size-4" />
											</button>
										</div>
									</div>
								</div>
							</div>

							<div className="w-full">
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
									<TabPanel selected={tab} value="referral"></TabPanel>
									<TabPanel selected={tab} value="withdrawal"></TabPanel>
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
