import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default: "bg-primary-400 text-white hover:bg-primary-400/90",
				destructive: "bg-red-500 text-white hover:bg-red-500/90",
				"destructive-outline": "border border-red-500 text-red-500 hover:bg-neutral-50",
				outline:
					"border border-neutral-300 text-neutral-800 bg-white hover:bg-neutral-100 text-neutral-800/50",
				secondary: "bg-neutral-100 text-neutral-900 hover:bg-neutral-100/80 ",
				success: "bg-green-500 text-white hover:bg-green-500/90",
				"success-outline": "border border-green-500 text-green-500 hover:bg-neutral-50",
				ghost: "hover:bg-neutral-100 hover:text-neutral-900 ",
				link: "text-neutral-900 underline-offset-4 hover:underline",
				faded: "bg-white/50 text-white hover:bg-white/45",
			},
			size: {
				default: "h-10 px-4 py-2",
				xs: "h-8 text-xs px-2 rounded-md",
				sm: "h-9 rounded-md px-3",
				lg: "h-11 rounded-md px-8",
				icon: "h-10 w-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	}
);
Button.displayName = "Button";

export { Button, buttonVariants };
