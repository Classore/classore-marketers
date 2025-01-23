import React from "react";
import { cn } from "@/lib/utils";

interface Props {
	children: React.ReactNode;
	onClose: (open: boolean) => void;
	open: boolean;
	blur?: boolean;
	opacity?: number;
	className?: string;
	preventScroll?: boolean;
}

export const Backdrop = ({
	children,
	onClose,
	open,
	blur = true,
	opacity = 50,
	className,
	preventScroll = true,
}: Props) => {
	const handleEscapeKey = React.useCallback(
		(event: KeyboardEvent) => {
			if (event.key === "Escape" && open) {
				onClose(false);
			}
		},
		[open, onClose]
	);

	React.useEffect(() => {
		if (!preventScroll) return;
		const originalStyle = window.getComputedStyle(document.body).overflow;
		if (open) {
			document.body.style.overflow = "hidden";
		}
		return () => {
			document.body.style.overflow = originalStyle;
		};
	}, [open, preventScroll]);

	React.useEffect(() => {
		if (!open) return;

		document.addEventListener("keydown", handleEscapeKey);

		return () => {
			document.removeEventListener("keydown", handleEscapeKey);
		};
	}, [open, handleEscapeKey]);

	if (!open) return null;

	return (
		<div
			role="dialog"
			aria-modal="true"
			onClick={() => onClose(false)}
			className={cn(
				"fixed inset-0 z-40",
				"transition-opacity duration-200 ease-in-out",
				blur && "backdrop-blur backdrop-filter",
				`bg-black/${opacity}`,
				className
			)}>
			<div onClick={(e) => e.stopPropagation()} className="relative h-full w-full">
				{children}
			</div>
		</div>
	);
};
