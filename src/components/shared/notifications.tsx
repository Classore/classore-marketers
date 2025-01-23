import { RiCloseLine } from "@remixicon/react";
import React from "react";

import type { NotificationProps } from "@/types";

interface Props {
	setOpen: (open: boolean) => void;
}

const notifications: NotificationProps[] = [];

export const Notifications = ({ setOpen }: Props) => {
	return (
		<div className="absolute right-4 top-4 h-[calc(100vh-32px)] w-[550px] max-w-full space-y-4 rounded-lg border bg-white p-4 shadow-2xl">
			<div className="flex w-full items-center justify-between">
				<p className="text-lg font-semibold">Notifications</p>
				<button onClick={() => setOpen(false)}>
					<RiCloseLine />
				</button>
			</div>
			<div className="h-[calc(100%-44px)] w-full space-y-3 overflow-y-auto rounded-lg bg-neutral-100 p-3">
				{notifications.map((notification) => (
					<NotificationItem
						key={notification.id}
						notification={notification}
						handleRead={() => {}}
					/>
				))}
			</div>
		</div>
	);
};

const NotificationItem = ({}: {
	notification: NotificationProps;
	handleRead: (id: string) => void;
}) => {
	return <div className="w-full"></div>;
};
