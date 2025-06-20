import { RiArrowDownSLine, RiNotification4Line } from "@remixicon/react";
import Image from "next/image";
import React from "react";

import { useUserStore } from "@/store/chunks/user";
import type { NotificationProps } from "@/types";
import { Notifications } from "./notifications";
import { UserSettings } from "./user-settings";
import { Backdrop } from "./backdrop";
import { getInitials } from "@/lib";
import { Logout } from "./logout";

const notifications: NotificationProps[] = [];

export const Appbar = () => {
	const { user } = useUserStore();
	const [open, setOpen] = React.useState({
		settings: false,
		notifications: false,
	});

	return (
		<>
			<header className="flex h-20 w-full items-center justify-center border-b">
				<nav className="container flex items-center justify-between px-4">
					{/* Logo */}
					<div className="relative h-[30px] w-[135px]">
						<Image src="/assets/images/classore.png" alt="classore" fill sizes="100%" />
					</div>

					{/* Desktop User Info */}
					<div className="hidden items-center gap-x-4 md:flex">
						{/* Notification */}
						<button
							onClick={() => setOpen({ ...open, notifications: true })}
							className="relative grid size-10 place-items-center rounded-full border">
							{notifications.length > 0 && (
								<div className="absolute right-0.5 top-0.5 size-1.5 rounded-full bg-red-500" />
							)}
							<RiNotification4Line />
						</button>

						<div className="h-7 w-[1px] bg-neutral-300" />

						{/* User Profile */}
						<button
							onClick={() => setOpen({ ...open, settings: true })}
							className="flex items-center gap-x-2">
							<div className="grid size-10 place-items-center rounded-full border bg-black text-white">
								{getInitials(`${user?.first_name} ${user?.last_name}`)}
							</div>
							<div className="flex flex-col items-start">
								<h5 className="text-sm font-medium capitalize">
									{user?.first_name} {user?.last_name}
								</h5>
								<p className="text-xs text-neutral-400">{user?.email}</p>
							</div>
							<RiArrowDownSLine
								className={`size-4 transition-all duration-500 ${open ? "rotate-180" : ""}`}
							/>
						</button>
						<Logout />
					</div>

					{/* Mobile Icons Only */}
					<div className="flex items-center gap-x-2 md:hidden">
						{/* Notification Icon */}
						<button
							onClick={() => setOpen({ ...open, notifications: true })}
							className="relative grid size-10 place-items-center rounded-full border">
							{notifications.length > 0 && (
								<div className="absolute right-0.5 top-0.5 size-1.5 rounded-full bg-red-500" />
							)}
							<RiNotification4Line className="size-4" />
						</button>

						{/* Initials as trigger for Sidebar Settings */}
						<button
							onClick={() => setOpen({ ...open, settings: true })}
							className="grid size-8 place-items-center rounded-full border bg-black text-xs text-white">
							{getInitials(`${user?.first_name} ${user?.last_name}`)}
						</button>
						<Logout />
					</div>
				</nav>
			</header>

			{/* User Settings Sidebar (can use drawer effect) */}
			<Backdrop onClose={(settings) => setOpen({ ...open, settings })} open={open.settings}>
				<div className="h-full w-full bg-black/50">
					<UserSettings setOpen={(settings) => setOpen({ ...open, settings })} />
				</div>
			</Backdrop>

			{/* Notification Modal */}
			<Backdrop
				onClose={(notifications) => setOpen({ ...open, notifications })}
				open={open.notifications}>
				<Notifications setOpen={(notifications) => setOpen({ ...open, notifications })} />
			</Backdrop>
		</>
	);
};
