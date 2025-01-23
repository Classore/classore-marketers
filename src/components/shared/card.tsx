import type { RemixiconComponentType } from "@remixicon/react";
import React from "react";

interface Props {
	icon: RemixiconComponentType;
	label: string;
	value: number;
}

export const Card = ({ icon: Icon, label, value }: Props) => {
	return (
		<div className="rounded-lg border p-3">
			<div className="flex w-full items-start gap-x-4">
				<div className="grid size-9 place-items-center rounded-full border">
					<Icon className="size-5" />
				</div>
				<div className="">
					<h5 className="font-semibold">{label}</h5>
					<p className="text-sm text-neutral-400">{value}</p>
				</div>
			</div>
		</div>
	);
};
