import type { ColumnDef } from "@tanstack/react-table";
import React from "react";

import { Checkbox } from "@/components/ui/checkbox";
import type { ReferralProps } from "@/types";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export const referral_columns: ColumnDef<ReferralProps>[] = [
	{
		accessorKey: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
	},
	{
		accessorKey: "actions",
		cell: ({}) => {
			const [open, setOpen] = React.useState(false);

			return (
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger></DialogTrigger>
					<DialogContent></DialogContent>
				</Dialog>
			);
		},
	},
];
