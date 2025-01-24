import type { ColumnDef } from "@tanstack/react-table";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import type { WithdrawalProps } from "@/types";

export const withdrawal_columns: ColumnDef<WithdrawalProps>[] = [
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
		accessorKey: "amount",
		header: "Amount",
	},
	{
		accessorKey: "date",
		header: "Date and Time",
	},
	{
		accessorKey: "status",
		header: "Status",
	},
	{
		accessorKey: "Actions",
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
