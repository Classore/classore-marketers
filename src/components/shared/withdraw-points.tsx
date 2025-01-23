import { RiArrowLeftSLine, RiDownload2Line } from "@remixicon/react";
import { useFormik } from "formik";
import { format } from "date-fns";
import { toast } from "sonner";
import * as Yup from "yup";
import React from "react";

import { formatCurrency, maskEmail } from "@/lib";
import { Button } from "@/components/ui/button";
import type { WithdrawalProps } from "@/types";
import { IconLabel } from "./icon-label";
import { OtpInput } from "./otp-input";
import { useInterval } from "@/hooks";
import { Input } from "../ui/input";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
	onClose: (open: boolean) => void;
	open: boolean;
	pointBalance?: number;
}

const screens = ["initial", "summary", "verification", "success"] as const;
const PERCENTAGE_OPTIONS = [
	{ label: "25%", value: 25 },
	{ label: "50%", value: 50 },
	{ label: "75%", value: 75 },
	{ label: "Max", value: 99 },
];

export const WithdrawPoints = ({ onClose, open, pointBalance = 10000 }: Props) => {
	const [screen, setScreen] = React.useState<(typeof screens)[number]>("initial");
	const [selectedPercentage, setSelectedPercentage] = React.useState(0);
	const [otp, setOtp] = React.useState("");

	const maxWithdrawal = pointBalance * 0.9;

	const { errors, handleSubmit, setFieldValue, values, touched } = useFormik({
		initialValues: {
			baseAmount: 0,
		},
		validateOnChange: true,
		validationSchema: Yup.object({
			baseAmount: Yup.number()
				.required("Please enter a valid amount")
				.min(1000, "Minimum withdrawal is 1000")
				.max(maxWithdrawal, `Maximum withdrawl is ${maxWithdrawal}`),
		}),
		onSubmit: () => {
			setScreen("summary");
		},
	});

	const calculatedAmount = React.useMemo(() => {
		if (selectedPercentage === 0) return values.baseAmount;
		return Math.floor((values.baseAmount * selectedPercentage) / 100);
	}, [selectedPercentage, values.baseAmount]);

	const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSelectedPercentage(0);
		setFieldValue("baseAmount", value === "" ? 0 : Math.max(0, parseInt(value, 10)));
	};

	const handlePercentageSelect = (percentage: number) => {
		const newPercentage = selectedPercentage === percentage ? 0 : percentage;
		setSelectedPercentage(newPercentage);

		if (newPercentage > 0) {
			const newAmount = Math.floor((maxWithdrawal * newPercentage) / 100);
			setFieldValue("baseAmount", newAmount);
		}
	};

	const withdrawal: WithdrawalProps = {
		amount: values.baseAmount,
		date: new Date(),
		points: pointBalance,
		recipientAccountName: "Samson Okunola",
		recipientAccountNumber: "0098463974",
		recipientBank: "Sterling Bank Plc",
	};

	const handleBack = () => {
		if (screen === "initial") {
			onClose(false);
		} else {
			setScreen((prev) => screens[screens.indexOf(prev) - 1]);
		}
	};

	const handleNext = () => {
		if (screen === "initial") {
			if (!calculatedAmount) {
				toast.error("Please enter an amount");
				return;
			}
			if (calculatedAmount > pointBalance) {
				toast.error("Insufficient point balance");
				return;
			}
			setScreen("summary");
		} else if (screen === "summary") {
			setScreen("verification");
		} else if (screen === "verification") {
			if (!otp) {
				toast.error("Please enter an OTP");
				return;
			}
			setScreen("success");
		} else {
			onClose(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={(open) => onClose(open)}>
			<DialogTrigger asChild>
				<Button className="w-full" variant="faded">
					Withdraw Points
				</Button>
			</DialogTrigger>
			<DialogContent className="w-[400px] p-1">
				{screen === "initial" && (
					<InitialScreen
						calculatedAmount={calculatedAmount}
						handleAmountChange={handleAmountChange}
						handlePercentageSelect={handlePercentageSelect}
						handleSubmit={handleSubmit}
						maxWithdrawal={maxWithdrawal}
						pointBalance={pointBalance}
						selectedPercentage={selectedPercentage}
						error={touched.baseAmount && errors.baseAmount ? errors.baseAmount : undefined}
					/>
				)}
				{screen === "summary" && (
					<SummaryScreen handleBack={handleBack} handleNext={handleNext} withdrawal={withdrawal} />
				)}
				{screen === "verification" && (
					<VerificationScreen
						handleBack={handleBack}
						handleNext={handleNext}
						onChange={setOtp}
						otp={otp}
					/>
				)}
				{screen === "success" && <ResponseScreen handleNext={handleNext} />}
			</DialogContent>
		</Dialog>
	);
};

const InitialScreen = ({
	calculatedAmount,
	handleAmountChange,
	handlePercentageSelect,
	handleSubmit,
	maxWithdrawal,
	pointBalance,
	selectedPercentage,
	error,
}: {
	calculatedAmount: number;
	handleAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handlePercentageSelect: (percentage: number) => void;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	maxWithdrawal: number;
	pointBalance: number;
	selectedPercentage: number;
	error?: string;
}) => {
	return (
		<form onSubmit={handleSubmit} className="space-y-6 rounded-lg border p-4 pt-9">
			<IconLabel icon={RiDownload2Line} />
			<DialogTitle>Withdraw Points</DialogTitle>
			<DialogDescription hidden>withdraw points</DialogDescription>
			<div className="w-full space-y-2">
				<div className="flex w-full items-center justify-between">
					<label htmlFor="amount" className="text-sm text-neutral-400">
						Enter Amount
					</label>
					<p className="text-sm text-neutral-400">Point Bal. ({pointBalance.toLocaleString()})</p>
				</div>
				<div>
					<Input
						id="amount"
						name="amount"
						type="number"
						min="0"
						max={maxWithdrawal}
						value={calculatedAmount || ""}
						onChange={handleAmountChange}
					/>
					{error && <span className="text-xs text-red-500">{error}</span>}
				</div>
				<div className="flex w-full items-center gap-x-2">
					{PERCENTAGE_OPTIONS.map(({ label, value }) => (
						<button
							key={value}
							type="button"
							onClick={() => handlePercentageSelect(value)}
							className={`flex flex-1 items-center justify-center rounded-lg px-3 py-2 text-xs ${selectedPercentage === value ? "bg-primary-100 text-primary-400" : "bg-neutral-200 text-neutral-400"}`}>
							{label}
						</button>
					))}
				</div>
				<div className="flex items-center justify-center">
					<p className="text-sm text-neutral-400">100 points ~ {formatCurrency(100)}</p>
				</div>
			</div>
			<div className="flex w-full items-center justify-center">
				<div className="rounded-lg bg-secondary-100 px-6 py-2 text-sm text-secondary-400">
					{pointBalance.toLocaleString()} points ~ {formatCurrency(pointBalance)}
				</div>
			</div>
			<Button type="submit" className="w-full">
				Withdraw
			</Button>
		</form>
	);
};

const SummaryScreen = ({
	handleBack,
	handleNext,
	withdrawal,
}: {
	handleBack: () => void;
	handleNext: () => void;
	withdrawal: WithdrawalProps;
}) => {
	return (
		<div className="space-y-6 rounded-lg border p-4 pt-9">
			<Button onClick={handleBack} variant="outline">
				<RiArrowLeftSLine /> Back
			</Button>
			<IconLabel icon={RiDownload2Line} />
			<DialogTitle>Withdrawal Summary</DialogTitle>
			<DialogDescription hidden>withdrawal summary</DialogDescription>
			<div className="w-full space-y-4 rounded-xl bg-neutral-100 p-3">
				<div className="flex items-center justify-between">
					<p className="text-xs text-neutral-400">Points</p>
					<p className="text-xs font-medium">{withdrawal.points}</p>
				</div>
				<div className="flex items-center justify-between">
					<p className="text-xs text-neutral-400">Amount(Naira)</p>
					<p className="text-xs font-medium">{withdrawal.amount}</p>
				</div>
				<div className="flex items-center justify-between">
					<p className="text-xs text-neutral-400">Recipient's Bank</p>
					<p className="text-xs font-medium">{withdrawal.recipientBank}</p>
				</div>
				<div className="flex items-center justify-between">
					<p className="text-xs text-neutral-400">Recipient's Account Number</p>
					<p className="text-xs font-medium">{withdrawal.recipientAccountNumber}</p>
				</div>
				<div className="flex items-center justify-between">
					<p className="text-xs text-neutral-400">Recipient's Account Name</p>
					<p className="text-xs font-medium">{withdrawal.recipientAccountName}</p>
				</div>
				<div className="flex items-center justify-between">
					<p className="text-xs text-neutral-400">Date and Time</p>
					<p className="text-xs font-medium">{format(new Date(), "yyyy-MM-dd HH:mm")}</p>
				</div>
			</div>
			<Button className="w-full" onClick={handleNext}>
				Withdraw
			</Button>
		</div>
	);
};

const VerificationScreen = ({
	handleBack,
	handleNext,
	onChange,
	otp,
}: {
	handleBack: () => void;
	handleNext: () => void;
	onChange: (value: string) => void;
	otp: string;
}) => {
	const [timer, setTimer] = React.useState(180);

	useInterval(() => {
		setTimer((prev) => (prev > 0 ? prev - 1 : 0));
	}, 1000);

	const handleVerification = () => {
		handleNext();
	};

	const handleResend = () => {
		setTimer(60);
	};

	return (
		<div className="space-y-6 rounded-lg border p-4 pt-9">
			<Button onClick={handleBack} variant="outline">
				<RiArrowLeftSLine /> Back
			</Button>
			<IconLabel icon={RiDownload2Line} />
			<DialogTitle>Enter Verification Code</DialogTitle>
			<DialogDescription>
				A 6-digit code has been sent to <b>{maskEmail("okunolaosamson@gmail.com")}</b>
			</DialogDescription>
			<OtpInput onChange={onChange} value={otp} length={6} />
			<Button className="w-full" onClick={handleVerification}>
				Verify
			</Button>
			<div className="flex items-center justify-center gap-x-1">
				<p className="text-xs text-neutral-400">Didn't recieve a mail?</p>
				<button onClick={handleResend} disabled={timer > 0} className="text-xs text-secondary-400">
					Resend
				</button>
			</div>
		</div>
	);
};

const ResponseScreen = ({ handleNext }: { handleNext: () => void }) => {
	return (
		<div className="space-y-6 rounded-lg border p-4 pt-9">
			<IconLabel icon={RiDownload2Line} />
			<DialogTitle>Success</DialogTitle>
			<DialogDescription hidden>success</DialogDescription>
			<Button className="w-full" onClick={handleNext}>
				Go to Dashboard
			</Button>
		</div>
	);
};
