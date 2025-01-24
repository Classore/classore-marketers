import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import React from "react";

import { Button } from "../ui/button";

interface Props {
	current: number;
	onPageChange: (page: number) => void;
	pageSize: number;
	total: number;
}

export const Pagination = (props: Props) => {
	const { current, onPageChange, pageSize, total } = props;
	const totalPages = Math.ceil(total / pageSize);

	const goToPrevious = () => {
		if (current > 1) {
			return onPageChange(current - 1);
		}
	};
	const goToNext = () => {
		if (current < totalPages) {
			onPageChange(current + 1);
		}
	};

	const renderPageButton = (index: number) => (
		<button
			key={index}
			onClick={() => onPageChange(index)}
			className={`grid size-8 place-items-center rounded-md text-sm font-medium ${current === index ? "bg-neutral-200 text-black" : "text-neutral-600"}`}>
			{index}
		</button>
	);

	const renderButtons = () => {
		const numbers = [];
		const maxVisibleButtons = 5;

		if (totalPages <= maxVisibleButtons) {
			for (let i = 1; i <= totalPages; i++) {
				numbers.push(renderPageButton(i));
			}
		} else {
			numbers.push(renderPageButton(1));

			if (current <= 3) {
				for (let i = 2; i <= 4; i++) {
					numbers.push(renderPageButton(i));
				}
				numbers.push(
					<span key="ellipsis" className="px-2">
						...
					</span>
				);
			} else if (current >= totalPages - 2) {
				numbers.push(
					<span key="ellipsis" className="px-2">
						...
					</span>
				);
				for (let i = totalPages - 3; i < totalPages; i++) {
					numbers.push(renderPageButton(i));
				}
			} else {
				numbers.push(
					<span key="ellipsis-start" className="px-2">
						...
					</span>
				);
				for (let i = current - 1; i <= current + 1; i++) {
					numbers.push(renderPageButton(i));
				}
				numbers.push(
					<span key="ellipsis-end" className="px-2">
						...
					</span>
				);
			}

			numbers.push(renderPageButton(totalPages));
		}

		return numbers;
	};

	return (
		<div className="flex w-full items-center justify-between">
			<div className="flex items-center gap-2">
				<p className="text-sm font-medium text-neutral-600">
					Showing results {(current - 1) * pageSize + 1} -{" "}
					{Math.min(current * pageSize, total)} of {total}
				</p>
			</div>
			<div className="flex items-center gap-2">
				<div className="flex items-center gap-5">
					<Button
						className="h-8 w-9 text-xs"
						variant="outline"
						onClick={goToPrevious}
						disabled={current === 1}>
						<RiArrowLeftSLine size={16} />
					</Button>
					<div className="flex items-center">{renderButtons()}</div>
					<Button
						className="h-8 w-9 text-xs"
						variant="outline"
						onClick={goToNext}
						disabled={current === totalPages}>
						<RiArrowRightSLine size={16} />
					</Button>
				</div>
			</div>
		</div>
	);
};
