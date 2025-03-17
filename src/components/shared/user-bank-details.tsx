import { useMutation, useQueries } from "@tanstack/react-query";
import { RiLoaderLine } from "@remixicon/react";
import { useFormik } from "formik";
import { toast } from "sonner";
import * as Yup from "yup";
import React from "react";

import { type BankDetailsDto, updateBankDetails } from "@/queries/user";
import { useUserStore } from "@/store/chunks/user";
import { getBanks } from "@/queries/withdrawal";
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
	const { user, bankDetails } = useUserStore();

	const [{ data: banks }] = useQueries({
		queries: [
			{
				queryFn: () => getBanks({ limit: 200, page: 1 }),
				queryKey: ["get-banks"],
			},
		],
	});

	const { isPending, mutateAsync } = useMutation({
		mutationFn: (payload: BankDetailsDto) => updateBankDetails(String(user?.id), payload),
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
				account_number: bankDetails?.bank_detail_account_number,
				bank_id: bankDetails?.bank_detail_bank_id,
			},
			enableReinitialize: true,
			validationSchema: Yup.object().shape({
				account_number: Yup.string()
					.required("Account number is required")
					.min(10, "Account number can not less than 10 digits")
					.max(10, "Account number can not be more than 10 digits")
					.matches(/^\d+$/, "Account number must contain only numbers"),
				bank_id: Yup.string().required("Bank is required"),
			}),
			onSubmit: (values) => {
				mutateAsync(values);
			},
		});

	return (
		<form onSubmit={handleSubmit} className="flex h-full w-full flex-col justify-between">
			<div className="space-y-5 border-y py-6">
				<div>
					<label className="text-xs font-medium" htmlFor="bank_id">
						Select Bank
					</label>
					<Select
						value={values.bank_id}
						onValueChange={(value) => setFieldValue("bank_id", value)}>
						<SelectTrigger>
							<SelectValue placeholder="Select Bank" />
						</SelectTrigger>
						<SelectContent>
							{banks?.data.data
								.sort((a, b) => a.bank_name.localeCompare(b.bank_name))
								.map((bank) => (
									<SelectItem key={bank.bank_id} value={bank.bank_id}>
										{bank.bank_name}
									</SelectItem>
								))}
						</SelectContent>
					</Select>
					{errors.bank_id && touched.bank_id && (
						<p className="text-xs text-red-500">{errors.bank_id}</p>
					)}
				</div>
				<div>
					<label className="text-xs font-medium" htmlFor="account_number">
						Enter Account Number
					</label>
					<Input
						type="text"
						inputMode="numeric"
						name="account_number"
						onChange={handleChange}
						placeholder="Enter Account Number"
						value={values.account_number}
						onKeyDown={(e) => {
							if (e.key === "e" || e.key === "+" || e.key === "-" || e.key === ".") {
								e.preventDefault();
							}
						}}
						maxLength={10}
						minLength={10}
					/>
					{errors.account_number && touched.account_number && (
						<p className="text-xs text-red-500">{errors.account_number}</p>
					)}
				</div>
			</div>
			<div className="flex w-full items-center justify-between">
				<Button type="button" size="sm" variant="destructive-outline" disabled={isPending}>
					Delete Account
				</Button>
				<div className="flex items-center gap-x-4">
					<Button
						type="button"
						onClick={() => resetForm()}
						size="sm"
						variant="outline"
						disabled={isPending}>
						Reset Changes
					</Button>
					<Button type="submit" size="sm" disabled={isPending}>
						{isPending ? <RiLoaderLine className="animate-spin" /> : "Save Changes"}
					</Button>
				</div>
			</div>
		</form>
	);
};
