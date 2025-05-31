import { useQueries } from "@tanstack/react-query";
import { toast } from "sonner";
import Link from "next/link";
import React, { useState } from "react";
import {
	RiFileCopyLine,
	RiParentLine,
	RiTeamLine,
	RiUser4Line,
	RiUserLine,
} from "@remixicon/react";

import { getReferralCharts, getReferrals } from "@/queries/referral";
import { capitalize, formatCurrency, greeting } from "@/lib";
import { withGuard } from "@/components/layouts/guard";
import { getWithdrawals } from "@/queries/withdrawal";
import { type Period, TAB_OPTIONS } from "@/config";
import { getAnylytics } from "@/queries/analytics";
import { useUserStore } from "@/store/chunks/user";
import { getBankDetails } from "@/queries/user";
import { ChartBar } from "@/components/charts";
import { Coin } from "@/assets/svgs/coin";
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

const Dashboard = () => {
	const [selectedPeriod, setSelectedPeriod] = useState<Period>("THIS_YEAR");
	const { user, setBankDetails } = useUserStore();
	const [tab, setTab] = useState("referral");
	const [modalState, setModalState] = useState({
		share: false,
		withdraw: false,
	});

	const queries = useQueries({
		queries: [
			{
				queryKey: ["analytics"],
				queryFn: () => getAnylytics(),
			},
			{
				queryKey: ["referral_charts", selectedPeriod],
				queryFn: () => getReferralCharts({ timeLine: selectedPeriod, limit: 10, page: 1 }),
			},
			{
				queryKey: ["get-referrals"],
				queryFn: () => getReferrals({ timeLine: "TODAY", limit: 10, page: 1 }),
			},
			{
				queryKey: ["get-withdrawals"],
				queryFn: () => getWithdrawals({ limit: 10, page: 1 }),
			},
			{
				queryFn: () => getBankDetails(),
				queryKey: ["get-banks-details"],
			},
		],
	});

	const [
		{ data: analytics },
		{ data: referralCharts, isLoading: isChartsLoading },
		{ data: referrals },
		{ data: withdrawals },
		{ data: bankDetails },
	] = queries;

	React.useEffect(() => {
		if (bankDetails?.data) {
			const details = bankDetails.data[0];
			setBankDetails(details);
		}
	}, [bankDetails, setBankDetails]);

	const copyReferralCode = () => {
		if (!user?.referal_code) return;
		navigator.clipboard.writeText(user.referal_code);
		toast.success("Referral code copied!");
	};

	const toggleModal = (type: "share" | "withdraw", isOpen: boolean) => {
		setModalState((prev) => ({ ...prev, [type]: isOpen }));
	};

	const getParentCount = () => analytics?.data.parent || 0;
	const getStudentCount = () => analytics?.data.student || 0;
	const getMarketerCount = () => analytics?.data.marketer || 0;
	const getTotalCount = () => analytics?.data.total_count || 0;
	const getMonetaryValue = () => analytics?.data.points.monetary_value || 0;
	const getReferralPoints = () => analytics?.data.points.referral_points || 0;

	const renderTabContent = () => {
		if (tab === "referral") {
			return (
				<TabPanel selected={tab} value="referral">
					{renderReferrals()}
				</TabPanel>
			);
		}
		return (
			<TabPanel selected={tab} value="withdrawal">
				{renderWithdrawals()}
			</TabPanel>
		);
	};

	const renderReferrals = () => {
		const data = referrals?.data.data || [];

		if (!data.length) {
			return (
				<div className="grid min-h-[300px] w-full place-items-center">
					<p className="text-sm text-primary-400">No referrals to display.</p>
				</div>
			);
		}

		return (
			<>
				{data.map((referral) => (
					<ReferralItem key={referral.id} referral={referral} />
				))}
				<div className="flex items-center justify-center">
					<Link href="/dashboard/referrals" className="link text-sm">
						See all referrals
					</Link>
				</div>
			</>
		);
	};

	const renderWithdrawals = () => {
		const data = withdrawals?.data.data || [];

		if (!data.length) {
			return (
				<div className="grid min-h-[300px] w-full place-items-center">
					<p className="text-sm text-primary-400">No withdrawals to display.</p>
				</div>
			);
		}

		return (
			<>
				{data.map((withdrawal) => (
					<WithdrawalItem key={withdrawal.id} withdrawal={withdrawal} />
				))}
				<div className="flex items-center justify-center">
					<Link href="/dashboard/withdrawals" className="link text-sm">
						See all withdrawals
					</Link>
				</div>
			</>
		);
	};

	return (
		<>
			<Seo title="Dashboard" />
			<Appbar />
			<main className="container h-[calc(100vh-96px)] py-10">
				<div className="h-full w-full space-y-3 overflow-y-auto rounded-3xl bg-neutral-100 p-3">
					<div className="w-full space-y-2 rounded-xl bg-gradient-to-r from-[#feede3]/40 to-[#6f42c1]/15 px-5 py-8">
						<h1 className="text-2xl font-bold">
							{greeting()}, {capitalize(user?.first_name)}
						</h1>
						<p className="text-sm text-neutral-400">
							Monitor all your earnings from one place.
						</p>
					</div>
					<div className="grid max-h-[650px] w-full grid-cols-1 gap-x-4 lg:grid-cols-2">
						<div className="w-full space-y-3 rounded-2xl bg-white px-0 py-0 lg:px-5 lg:py-4">
							<div className="flex w-full items-center justify-between">
								<h5 className="text-lg font-semibold">Analytics Report</h5>
							</div>
							<div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
								<Card icon={RiTeamLine} label="Total Referrals" value={getTotalCount()} />
								<Card icon={RiParentLine} label="Parents" value={getParentCount()} />
								<Card icon={RiUserLine} label="Students" value={getStudentCount()} />
								<Card icon={RiUser4Line} label="Marketers" value={getMarketerCount()} />
							</div>
							<ChartBar
								data={referralCharts?.data || []}
								isLoading={isChartsLoading}
								selectedPeriod={selectedPeriod}
								setSelectedPeriod={setSelectedPeriod}
							/>
						</div>
						<div className="w-full space-y-8 rounded-2xl bg-white px-5 py-4">
							<div className="grid w-full grid-cols-1 gap-x-3 gap-y-3 lg:grid-cols-2">
								<div className="w-full rounded-lg bg-gradient-to-r from-[#341f5b]/40 to-[#6f42c1] p-4">
									<div className="w-full space-y-2">
										<div className="grid size-9 place-items-center rounded-full bg-white/25">
											<Coin className="size-6 text-red-500" />
										</div>
										<div className="w-full space-y-1">
											<h3 className="text-2xl font-semibold text-white">
												{getReferralPoints()} Points
											</h3>
											<p className="text-sm text-neutral-100">
												Your points equals {formatCurrency(getMonetaryValue())}
											</p>
										</div>
										<WithdrawPoints
											onClose={(withdraw) => toggleModal("withdraw", withdraw)}
											open={modalState.withdraw}
										/>
									</div>
								</div>
								<div className="w-full rounded-lg bg-gradient-to-r from-[#feede3]/40 to-[#6f42c1]/15 p-4">
									<div className="space-y-8 py-1">
										<div>
											<p className="text-sm text-neutral-400">Referral Code</p>
											<h4 className="text-2xl">{user?.referal_code}</h4>
										</div>
										<div className="flex items-center gap-x-2">
											<Sharer
												onClose={(share) => toggleModal("share", share)}
												open={modalState.share}
												url={
													`https://classore.com/signup?step=1&referral_code=${user?.referal_code}` ||
													""
												}
											/>
											<button
												onClick={copyReferralCode}
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
											className={`relative flex h-full items-center gap-x-2 text-sm font-medium transition-all duration-500 before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full before:bg-primary-400 ${
												tab === value
													? "text-primary-400 before:block"
													: "text-neutral-400 before:hidden"
											}`}>
											<Icon className="size-5" /> {label}
										</button>
									))}
								</div>
								<div className="w-full space-y-4">{renderTabContent()}</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
};

export default withGuard(Dashboard);
