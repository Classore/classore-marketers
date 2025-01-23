import { RiShareLine } from "@remixicon/react";
import React from "react";

import { share_links } from "@/config/links";
import { IconLabel } from "./icon-label";
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
	url: string;
}

export const Sharer = ({ onClose, open, url }: Props) => {
	return (
		<Dialog open={open} onOpenChange={(value) => onClose(value)}>
			<DialogTrigger asChild>
				<button className="flex h-10 w-[90px] items-center justify-center gap-x-2 rounded-3xl bg-white px-4 py-3 text-xs">
					Share <RiShareLine className="size-4" />
				</button>
			</DialogTrigger>
			<DialogContent className="w-[400px] p-1">
				<div className="space-y-6 rounded-lg border p-4 pt-9">
					<IconLabel icon={RiShareLine} />
					<div className="space-y-0.5">
						<DialogTitle>Share Referral Code</DialogTitle>
						<DialogDescription>Share your referral code to get more points.</DialogDescription>
					</div>
					<div className="w-full space-y-3">
						{share_links(url).map(({ href, icon: Icon, label }, index) => (
							<div key={index} className="flex items-center gap-x-4">
								<Icon className="size-5" />
								<a href={href} className="link text-sm">
									{label}
								</a>
							</div>
						))}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};
