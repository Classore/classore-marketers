import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { toast } from "sonner";
import React from "react";

import { type BankDetailsProps, updateBankDetails } from "@/queries/user";
import { useUserStore } from "@/store/chunks/user";
import { NIGERIAN_BANKS } from "@/config";
import { Button } from "../ui/button";
import { queryClient } from "@/lib";
import { Input } from "../ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

export const UserBankDetails = () => {
	const { user } = useUserStore();

	const {} = useMutation({
		mutationFn: (payload: BankDetailsProps) => updateBankDetails(String(user?.id), payload),
		mutationKey: ["bank-details"],
		onSuccess: (data) => {
			console.log(data);
			toast.success("Bank details updated successfully");
		},
		onError: (error) => {
			console.error(error);
			toast.error("Error updating bank details");
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["get-user"] });
		},
	});

	const { errors, handleChange, handleSubmit, resetForm, setFieldValue, touched, values } =
		useFormik({
			initialValues: {
				accountName: "",
				accountNumber: "",
				bankName: "",
			},
			onSubmit: (values) => {
				console.log(values);
			},
		});

	return (
		<form onSubmit={handleSubmit} className="flex h-full w-full flex-col justify-between">
			<div className="space-y-5 border-y py-6">
				<div>
					<label className="text-xs font-medium" htmlFor="bankName">
						Select Bank
					</label>
					<Select
						value={values.bankName}
						onValueChange={(value) => setFieldValue("bankName", value)}>
						<SelectTrigger>
							<SelectValue placeholder="Select Bank" />
						</SelectTrigger>
						<SelectContent>
							{NIGERIAN_BANKS.sort((a, b) => a.name.localeCompare(b.name)).map((bank) => (
								<SelectItem key={bank.code} value={bank.name}>
									{bank.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					{errors.bankName && touched.bankName && (
						<p className="text-xs text-red-500">{errors.bankName}</p>
					)}
				</div>
				<div>
					<label className="text-xs font-medium" htmlFor="accountNumber">
						Enter Account Number
					</label>
					<Input
						name="accountNumber"
						onChange={handleChange}
						placeholder="Enter Account Number"
					/>
					{errors.accountNumber && touched.accountNumber && (
						<p className="text-xs text-red-500">{errors.accountNumber}</p>
					)}
				</div>
				<div>
					<label className="text-xs font-medium" htmlFor="accountName">
						Enter Account Name
					</label>
					<Input name="accountName" onChange={handleChange} placeholder="Enter Account Name" />
					{errors.accountName && touched.accountName && (
						<p className="text-xs text-red-500">{errors.accountName}</p>
					)}
				</div>
			</div>
			<div className="flex w-full items-center justify-between">
				<Button type="button" size="sm" variant="destructive-outline">
					Delete Account
				</Button>
				<div className="flex items-center gap-x-4">
					<Button type="button" onClick={() => resetForm()} size="sm" variant="outline">
						Reset Changes
					</Button>
					<Button type="submit" size="sm">
						Save Changes
					</Button>
				</div>
			</div>
		</form>
	);
};
