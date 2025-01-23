import { RiBankLine, RiCloseLine, RiLockLine, RiUser3Line } from "@remixicon/react";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UserBankDetails } from "./user-bank-details";
import { UserSecurity } from "./user-security";
import { UserProfile } from "./user-profile";
import { TabPanel } from "./tab-panel";
import { getInitials } from "@/lib";

interface Props {
	setOpen: (open: boolean) => void;
}

const USER_TABS = [
	{ icon: RiUser3Line, label: "My Profile", value: "profile" },
	{ icon: RiLockLine, label: "Security", value: "security" },
	{ icon: RiBankLine, label: "Bank Details", value: "bank" },
];

export const UserSettings = ({ setOpen }: Props) => {
	const [tab, setTab] = React.useState("profile");

	return (
		<div className="absolute right-4 top-4 h-[calc(100vh-32px)] w-[550px] max-w-full space-y-4 rounded-lg border bg-white p-4 shadow-2xl">
			<div className="flex w-full items-center justify-between">
				<p className="text-lg font-semibold">Account Settings</p>
				<button onClick={() => setOpen(false)}>
					<RiCloseLine />
				</button>
			</div>
			<div className="h-[calc(100%-44px)] w-full space-y-8">
				<div>
					<div className="h-[150px] w-full rounded-lg bg-gradient-to-r from-[#feede3] to-[#6f42c1]/40"></div>
					<div className="-mt-[60px] flex w-full items-baseline gap-x-4 px-5">
						<Avatar className="size-[120px]">
							<AvatarImage src="" />
							<AvatarFallback className="bg-black text-4xl font-medium text-white">
								{getInitials("Samson Okunola")}
							</AvatarFallback>
						</Avatar>
						<div className="">
							<h4 className="text-sm font-medium">Samson Okuonla</h4>
							<p className="text-xs text-neutral-400">okunolaosamson@gmail.com</p>
						</div>
					</div>
				</div>
				<div className="w-full space-y-4">
					<div className="flex items-center gap-x-1">
						{USER_TABS.map(({ icon: Icon, label, value }) => (
							<button
								key={value}
								onClick={() => setTab(value)}
								className={`flex items-center gap-x-2 px-2 py-1.5 text-sm font-medium transition-colors duration-500 ${value === tab ? "text-primary-400" : "text-neutral-400"}`}>
								<Icon className="size-5" /> {label}
							</button>
						))}
					</div>
					<div className="w-full">
						<TabPanel selected={tab} value="profile">
							<UserProfile />
						</TabPanel>
						<TabPanel selected={tab} value="security">
							<UserSecurity />
						</TabPanel>
						<TabPanel selected={tab} value="bank">
							<UserBankDetails />
						</TabPanel>
					</div>
				</div>
			</div>
		</div>
	);
};
