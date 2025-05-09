import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import {
	RiArrowLeftSLine,
	RiExchangeDollarLine,
	RiMoneyDollarCircleLine,
	RiNoCreditCardLine,
	RiRefund2Line,
} from "@remixicon/react";

import { Appbar, DataCard, DataTable, Pagination, Seo } from "@/components/shared";
import { withGuard } from "@/components/layouts/guard";
import { getWithdrawals } from "@/queries/withdrawal";
import { withdrawal_columns } from "@/config/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib";
import { useDebounce } from "@/hooks";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const Page = () => {
	const [search, setSearcch] = React.useState("");
	const [page, setPage] = React.useState(1);
	const router = useRouter();

	useDebounce(search, 500);

	const { data } = useQuery({
		queryKey: ["get-withdrawals", page],
		queryFn: () => getWithdrawals({ limit: 10, page }),
		select: (data) => ({
			withdrawals: data.data.data,
			meta: {
				hasNext: data.data.meta.hasNextPage,
				hasPrevious: data.data.meta.hasPreviousPage,
				total: data.data.meta.itemCount,
				page: data.data.meta.page,
				pagesize: data.data.meta.pageCount,
				limit: data.data.meta.take,
			},
		}),
	});

	return (
		<>
			<Seo title="Withdrawals" />
			<Appbar />
			<main className="container h-[calc(100vh-96px)] space-y-5 overflow-hidden py-10">
				<div className="h-full w-full space-y-4 overflow-y-auto rounded-3xl bg-neutral-100 p-3">
					<Button onClick={() => router.back()} size="sm" variant="outline">
						<RiArrowLeftSLine className="size-4" /> Back
					</Button>
					<div className="grid w-full grid-cols-4 gap-x-4">
						<DataCard
							icon={RiExchangeDollarLine}
							label="Total Withdrawals"
							value={formatCurrency(0)}
						/>
						<DataCard
							icon={RiMoneyDollarCircleLine}
							label="Successful Withdrawals"
							value={formatCurrency(0)}
						/>
						<DataCard
							icon={RiRefund2Line}
							label="Pending Withdrawals"
							value={formatCurrency(0)}
						/>
						<DataCard
							icon={RiNoCreditCardLine}
							label="Failed Withdrawals"
							value={formatCurrency(0)}
						/>
					</div>
					<div className="space-y-4">
						<div className="flex h-8 w-full items-center justify-between">
							<Input
								value={search}
								onChange={(e) => setSearcch(e.target.value)}
								className="h-8 w-[250px] border-neutral-600"
							/>
							<Select>
								<SelectTrigger className="h-8 w-[180px] text-sm">
									<SelectValue placeholder="Filter By" />
									<SelectContent className="text-sm">
										<SelectItem value="all">All</SelectItem>
										<SelectItem value="successful">Successful</SelectItem>
										<SelectItem value="pending">Pending</SelectItem>
										<SelectItem value="failed">Failed</SelectItem>
									</SelectContent>
								</SelectTrigger>
							</Select>
						</div>
						<DataTable columns={withdrawal_columns} data={data?.withdrawals || []} />
						<Pagination
							current={page}
							onPageChange={setPage}
							pageSize={10}
							total={data?.meta.total ?? 0}
						/>
					</div>
				</div>
			</main>
		</>
	);
};

export default withGuard(Page);
