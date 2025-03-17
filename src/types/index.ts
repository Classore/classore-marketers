export type Maybe<T> = T | null;

export type Undefined<T> = T | undefined;

export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K];
};

export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>;
};

export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]: Maybe<T[SubKey]>;
};

export type ValueOf<T> = T[keyof T];

export type NonEmptyArray<T> = [T, ...T[]];

export type MustInclude<T, U extends T[]> = [T] extends [ValueOf<U>] ? U : never;

export interface HttpResponse<T> {
	error: string;
	data: T;
	message: string;
	success: boolean;
}

export type HttpError = {
	response: {
		data: {
			error: string;
			errorCode: string;
			message: string | string[];
			status: string;
			success: boolean;
		};
	};
};

export interface PaginatedResponse<T> {
	data: T[];
	meta: {
		page: number;
		take: number;
		itemCount: number;
		pageCount: number;
		hasPreviousPage: boolean;
		hasNextPage: boolean;
	};
}

export type PaginationProps = {
	limit?: number;
	page?: number;
};

export type Node = {
	__typename?: "Node";
	id: string;
	createdOn?: Date | string;
	deletedBy?: Maybe<string>;
	deletedOn?: Date | string;
	isBlocked?: boolean;
	isDeleted?: boolean;
	updatedBy?: Maybe<string>;
	updatedOn?: Date | string;
};

export type UserProps = Node & {
	__typename?: "User";
	copied_from: Maybe<string>;
	first_name: string;
	last_name: string;
	phone_number: Maybe<string>;
	email: string;
	access_token: string;
	referal_code: string;
	wallet_id: Maybe<string>;
	role: Node & {
		copied_from: Maybe<string>;
		name: string;
		waitlist_read: "NO";
		waitlist_write: "NO";
		student_read: "YES";
		student_write: "NO";
		admin_read: "NO";
		admin_write: "NO";
		tutor_read: "NO";
		tutor_write: "NO";
		videos_read: "NO";
		videos_write: "NO";
		transactions_read: "NO";
		transactions_write: "NO";
		marketer_read: "YES";
		marketer_write: "YES";
		admin_delete_read: "NO";
		admin_delete_write: "NO";
	};
};

export type ReferralProps = Node & {
	__typename?: "Referral";
	fullName: string;
	email: string;
	points: number;
	status: "active" | "inactive";
};

export type WithdrawalProps = Node & {
	__typename?: "Withdrawal";
	amount: number;
	date: Date | string;
	status: "pending" | "successful" | "failed";
};

export type WithdrawalSummaryProps = {
	__typename?: "Withdrawal Summary";
	amount: number;
	date: Date;
	points: number;
	recipientAccountNumber: string;
	recipientAccountName: string;
	recipientBank: string;
};

export interface AnalyticsProps {
	student: number;
	parent: number;
	marketer: number;
	total_count: number;
}

export type ChartData = {
	count: number;
	day_or_month: Date;
};

export type NotificationProps = Node & {
	__typename?: "Notification";
	content: string;
	title: string;
};
