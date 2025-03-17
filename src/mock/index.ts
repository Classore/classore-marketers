import type { ChartData } from "@/types";

export const year_data: ChartData[] = [
	{ day_or_month: new Date("2024-02-28"), count: 500 },
	{ day_or_month: new Date("2024-03-28"), count: 300 },
	{ day_or_month: new Date("2024-04-28"), count: 400 },
	{ day_or_month: new Date("2024-05-28"), count: 500 },
	{ day_or_month: new Date("2024-06-28"), count: 600 },
	{ day_or_month: new Date("2024-07-28"), count: 700 },
	{ day_or_month: new Date("2024-08-28"), count: 800 },
	{ day_or_month: new Date("2024-09-28"), count: 900 },
	{ day_or_month: new Date("2024-10-28"), count: 1000 },
	{ day_or_month: new Date("2024-11-28"), count: 1100 },
	{ day_or_month: new Date("2024-12-28"), count: 900 },
	{ day_or_month: new Date("2025-01-28"), count: 1000 },
];

export const month_data: ChartData[] = [
	{ day_or_month: new Date("2025-01-01"), count: 35 },
	{ day_or_month: new Date("2025-01-05"), count: 45 },
	{ day_or_month: new Date("2025-01-10"), count: 60 },
	{ day_or_month: new Date("2025-01-15"), count: 40 },
	{ day_or_month: new Date("2025-01-20"), count: 55 },
	{ day_or_month: new Date("2025-01-25"), count: 36 },
	{ day_or_month: new Date("2025-01-30"), count: 50 },
];

export const week_data: ChartData[] = [
	{ day_or_month: new Date("2025-01-19"), count: 120 },
	{ day_or_month: new Date("2025-01-20"), count: 145 },
	{ day_or_month: new Date("2025-01-21"), count: 135 },
	{ day_or_month: new Date("2025-01-22"), count: 160 },
	{ day_or_month: new Date("2025-01-23"), count: 180 },
	{ day_or_month: new Date("2025-01-24"), count: 90 },
	{ day_or_month: new Date("2025-01-25"), count: 110 },
];

export const day_data: ChartData[] = [
	{ day_or_month: new Date("2025-01-24T00:00:00.000Z"), count: 5 },
	{ day_or_month: new Date("2025-01-24T03:00:00.000Z"), count: 2 },
	{ day_or_month: new Date("2025-01-24T06:00:00.000Z"), count: 8 },
	{ day_or_month: new Date("2025-01-24T09:00:00.000Z"), count: 15 },
	{ day_or_month: new Date("2025-01-24T12:00:00.000Z"), count: 25 },
	{ day_or_month: new Date("2025-01-24T15:00:00.000Z"), count: 20 },
	{ day_or_month: new Date("2025-01-24T18:00:00.000Z"), count: 18 },
	{ day_or_month: new Date("2025-01-24T21:00:00.000Z"), count: 10 },
];
