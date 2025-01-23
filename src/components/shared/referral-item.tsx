import React from "react";

import type { ReferralProps } from "@/types";

interface Props {
	referral: ReferralProps;
}

const STATUS_COLOR = {
	active: "bg-green-100 text-green-700",
	inactive: "bg-red-100 text-red-700",
} as const;

export const ReferralItem = ({ referral }: Props) => {
	return (
		<div className="flex h-10 w-full items-center justify-between">
			<div className="flex items-center gap-x-2">
				<div className="size-10 rounded-lg border"></div>
				<div className="">
					<p className="text-sm font-medium">{referral.fullName}</p>
					<p className="text-xs lowercase text-neutral-400">{referral.email}</p>
				</div>
			</div>
			<div className="flex items-center gap-x-2">
				<p className="text-xs">+{referral.points} Points</p>
				<div
					className={`flex items-center rounded-md px-3 py-1.5 text-xs capitalize ${STATUS_COLOR[referral.status]}`}>
					{referral.status}
				</div>
			</div>
		</div>
	);
};
