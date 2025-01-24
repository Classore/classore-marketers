import type { ColumnDef } from "@tanstack/react-table";

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
		accessorKey: "fullName",
		header: "Full Name",
	},
	{
		accessorKey: "email",
		header: "Email Address",
	},
	{
		accessorKey: "createdOn",
		header: "Date Joined",
	},
	{
		accessorKey: "points",
		header: "Points",
	},
	{
		accessorKey: "status",
		header: "Status",
	},
	{
		accessorKey: "actions",
		header: "Actions",
		cell: ({}) => {
			return (
				<Dialog>
					<DialogTrigger></DialogTrigger>
					<DialogContent></DialogContent>
				</Dialog>
			);
		},
	},
];
