import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const greeting = () => {
	const time = new Date().getHours();
	if (time < 12) {
		return "Good morning";
	} else if (time < 18) {
		return "Good afternoon";
	} else {
		return "Good evening";
	}
};
