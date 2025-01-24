import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import {
	RiArrowLeftSLine,
	RiGroupLine,
	RiUser4Line,
	RiUserFollowLine,
	RiUserMinusLine,
} from "@remixicon/react";

import { Appbar, DataCard, DataTable, Pagination, Seo } from "@/components/shared";
import { getReferrals } from "@/queries/referral";
import { referral_columns } from "@/config/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

	const {} = useQuery({
		queryKey: ["get-referrals", page],
		queryFn: () => getReferrals({ limit: 10, page }),
		enabled: false,
		select: (data) => ({
			referrals: data.data.data,
			meta: {},
		}),
	});

	return (
		<>
			<Seo title="Referrals" />
			<Appbar />
			<main className="container h-[calc(100vh-96px)] space-y-5 overflow-hidden py-10">
				<div className="h-full w-full space-y-4 overflow-y-auto rounded-3xl bg-neutral-100 p-3">
					<Button onClick={() => router.back()} size="sm" variant="outline">
						<RiArrowLeftSLine className="size-4" /> Back
					</Button>
					<div className="grid w-full grid-cols-4 gap-x-4">
						<DataCard icon={RiGroupLine} label="Total Referrals" value={0} />
						<DataCard icon={RiUserFollowLine} label="Active Referrals" value={0} />
						<DataCard icon={RiUserMinusLine} label="Inactive Referrals" value={0} />
						<DataCard icon={RiUser4Line} label="Marketers" value={0} />
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
								</SelectTrigger>
								<SelectContent className="text-sm">
									<SelectItem value="all">All</SelectItem>
									<SelectItem value="active">Active</SelectItem>
									<SelectItem value="inactive">Inactive</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<DataTable columns={referral_columns} data={[]} />
						<Pagination current={page} onPageChange={setPage} pageSize={10} total={0} />
					</div>
				</div>
			</main>
		</>
	);
};

export default Page;
