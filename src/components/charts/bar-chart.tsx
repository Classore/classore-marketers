import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { RiLoaderLine } from "@remixicon/react";

import { type Period, PERIOD_OPTIONS, formatDate } from "@/config";
import type { ChartData } from "@/types";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

interface Props {
	data: ChartData[];
	isLoading?: boolean;
	selectedPeriod: Period;
	setSelectedPeriod: (period: Period) => void;
}

export function ChartBar({ data, isLoading, selectedPeriod, setSelectedPeriod }: Props) {
	const config = {
		count: {
			label: "Referral",
			color: "var(--neutral-200)",
		},
	} satisfies ChartConfig;

	return (
		<div className="w-full space-y-10 rounded-lg border bg-white p-4">
			<div className="flex h-9 w-full items-center justify-between">
				<p className="text-xs font-medium lg:text-sm">Referral Report</p>
				<div className="flex items-center rounded-lg bg-neutral-200">
					{PERIOD_OPTIONS.map(({ label, value }, index) => (
						<button
							key={index}
							onClick={() => setSelectedPeriod(value)}
							className={`rounded-lg border px-3 py-2 text-xs transition-all duration-500 lg:text-sm ${value === selectedPeriod ? "border-neutral-400 bg-white" : "border-transparent text-neutral-400"}`}>
							{label}
						</button>
					))}
				</div>
			</div>
			{isLoading ? (
				<div className="grid min-h-[300px] w-full place-items-center">
					<RiLoaderLine className="animate-spin text-4xl text-primary-400" />
				</div>
			) : (
				<ChartContainer config={config}>
					<BarChart accessibilityLayer data={data}>
						<CartesianGrid vertical={false} />
						<YAxis tickLine={false} axisLine={false} tickMargin={10} />
						<XAxis
							dataKey="day_or_month"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => formatDate(new Date(value), selectedPeriod)}
						/>
						<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
						<Bar dataKey="count" fill="var(--color-count)" radius={[8, 8, 0, 0]} />
					</BarChart>
				</ChartContainer>
			)}
		</div>
	);
}
