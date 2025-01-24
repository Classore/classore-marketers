import type { ChartData } from "@/types";

export const year_data: ChartData[] = [
	{ date: new Date("2024-02-28"), referral: 500 },
	{ date: new Date("2024-03-28"), referral: 300 },
	{ date: new Date("2024-04-28"), referral: 400 },
	{ date: new Date("2024-05-28"), referral: 500 },
	{ date: new Date("2024-06-28"), referral: 600 },
	{ date: new Date("2024-07-28"), referral: 700 },
	{ date: new Date("2024-08-28"), referral: 800 },
	{ date: new Date("2024-09-28"), referral: 900 },
	{ date: new Date("2024-10-28"), referral: 1000 },
	{ date: new Date("2024-11-28"), referral: 1100 },
	{ date: new Date("2024-12-28"), referral: 900 },
	{ date: new Date("2025-01-28"), referral: 1000 },
];

export const month_data: ChartData[] = [
	{ date: new Date("2025-01-01"), referral: 35 },
	{ date: new Date("2025-01-05"), referral: 45 },
	{ date: new Date("2025-01-10"), referral: 60 },
	{ date: new Date("2025-01-15"), referral: 40 },
	{ date: new Date("2025-01-20"), referral: 55 },
	{ date: new Date("2025-01-25"), referral: 36 },
	{ date: new Date("2025-01-30"), referral: 50 },
];

export const week_data: ChartData[] = [
	{ date: new Date("2025-01-19"), referral: 120 },
	{ date: new Date("2025-01-20"), referral: 145 },
	{ date: new Date("2025-01-21"), referral: 135 },
	{ date: new Date("2025-01-22"), referral: 160 },
	{ date: new Date("2025-01-23"), referral: 180 },
	{ date: new Date("2025-01-24"), referral: 90 },
	{ date: new Date("2025-01-25"), referral: 110 },
];

export const day_data: ChartData[] = [
	{ date: new Date("2025-01-24T00:00:00.000Z"), referral: 5 },
	{ date: new Date("2025-01-24T03:00:00.000Z"), referral: 2 },
	{ date: new Date("2025-01-24T06:00:00.000Z"), referral: 8 },
	{ date: new Date("2025-01-24T09:00:00.000Z"), referral: 15 },
	{ date: new Date("2025-01-24T12:00:00.000Z"), referral: 25 },
	{ date: new Date("2025-01-24T15:00:00.000Z"), referral: 20 },
	{ date: new Date("2025-01-24T18:00:00.000Z"), referral: 18 },
	{ date: new Date("2025-01-24T21:00:00.000Z"), referral: 10 },
];
