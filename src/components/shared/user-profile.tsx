import { useFormik } from "formik";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import React from "react";

import type { UserProps } from "@/types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import "dayjs/locale/en-gb";
dayjs.locale("en-gb");

interface Props {
	user: UserProps | null;
}

export const UserProfile = ({ user }: Props) => {
	const { errors, handleChange, handleSubmit, resetForm, setFieldValue, touched, values } =
		useFormik({
			initialValues: {
				dateOfBirth: "",
				email: user?.email,
				first_name: user?.first_name,
				last_name: user?.last_name,
				phone_number: user?.phone_number,
			},
			enableReinitialize: true,
			onSubmit: (values) => {
				console.log(values);
			},
		});

	return (
		<form onSubmit={handleSubmit} className="flex h-full w-full flex-col justify-between overflow-y-scroll">
			<div className="space-y-5 border-y py-6">
				<div className="grid grid-cols-2 gap-x-4">
					<div>
						<label className="text-xs font-medium" htmlFor="first_name">
							First Name
						</label>
						<Input
							onChange={handleChange}
							placeholder="Enter First Name"
							value={values.first_name}
							className="capitalize"
						/>
						{errors.first_name && touched.first_name && (
							<p className="text-xs text-red-500">{errors.first_name}</p>
						)}
					</div>
					<div>
						<label className="text-xs font-medium" htmlFor="last_name">
							Last Name
						</label>
						<Input
							value={values.last_name}
							onChange={handleChange}
							placeholder="Enter Account Name"
							className="capitalize"
						/>
						{errors.last_name && touched.last_name && (
							<p className="text-xs text-red-500">{errors.last_name}</p>
						)}
					</div>
				</div>
				<div>
					<label className="text-xs font-medium" htmlFor="email">
						Email Address
					</label>
					<Input
						type="email"
						value={values.email}
						onChange={handleChange}
						placeholder="Enter Email Address"
					/>
					{errors.email && touched.email && (
						<p className="text-xs text-red-500">{errors.email}</p>
					)}
				</div>
				<div>
					<label className="text-xs font-medium" htmlFor="phone_number">
						Phone Number
					</label>
					<Input
						type="tel"
						value={values.phone_number || ""}
						onChange={handleChange}
						placeholder="Enter Phone Number"
					/>
					{errors.phone_number && touched.phone_number && (
						<p className="text-xs text-red-500">{errors.phone_number}</p>
					)}
				</div>
				<div className="flex flex-col">
					<label className="text-xs font-medium" htmlFor="dateOfBirth">
						Date of Birth
					</label>
					<DatePicker
						value={values.dateOfBirth ? dayjs(values.dateOfBirth) : null}
						onChange={(date) => setFieldValue("dateOfBirth", date ? date.toString() : "")}
						className="h-[38px] w-full focus-within:border-2 focus-within:border-primary-400 hover:border-primary-400"
					/>
					{errors.dateOfBirth && touched.dateOfBirth && (
						<p className="text-xs text-red-500">{errors.dateOfBirth}</p>
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
