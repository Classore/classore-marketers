import { RiLogoutCircleLine } from "@remixicon/react";
import React from "react";

import { useUserStore } from "@/store/chunks/user";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";

export const Logout = () => {
	const [open, setOpen] = React.useState(false);
	const { signout } = useUserStore();

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<DialogTrigger asChild>
				<button
					onClick={() => setOpen(true)}
					className="relative grid size-10 place-items-center rounded-full border text-red-500">
					<RiLogoutCircleLine className="size-4 rotate-180 lg:size-6" />
				</button>
			</DialogTrigger>
			<DialogContent className="max-w-[90%] rounded-md lg:w-[500px]">
				<DialogTitle>Logout</DialogTitle>
				<DialogDescription>
					You are about to logout from your current session. Do you want to continue?
				</DialogDescription>
				<div className="mt-4 flex w-full items-center justify-end gap-x-4">
					<Button onClick={() => setOpen(false)} size="sm" variant="outline">
						Cancel
					</Button>
					<Button onClick={() => signout()} size="sm" variant="destructive">
						Logout
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};
