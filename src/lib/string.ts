export const formatCurrency = (amount: number, currency = "NGN") => {
	return new Intl.NumberFormat("en-NG", {
		currency,
		style: "currency",
		maximumFractionDigits: 0,
		minimumFractionDigits: 0,
	}).format(amount);
};

export const getInitials = (value?: string) => {
	if (!value) return "";
	return value
		.split(" ")
		.map((word) => word[0])
		.join("")
		.toUpperCase();
};

export const maskEmail = (value: string) => {
	const [main, provider] = value.split("@");
	const masked = main.slice(0, 4) + "*".repeat(main.length - 4);
	return `${masked}@${provider}`;
};

export const formatTime = (timeInSeconds: number) => {
	const minutes = Math.floor(timeInSeconds / 60);
	const seconds = timeInSeconds % 60;
	return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};
