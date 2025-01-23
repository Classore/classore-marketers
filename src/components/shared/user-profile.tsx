import { useFormik } from "formik";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import React from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

import "dayjs/locale/en-gb";
dayjs.locale("en-gb");

export const UserProfile = () => {
	const { errors, handleChange, handleSubmit, resetForm, setFieldValue, touched, values } =
		useFormik({
			initialValues: {
				dateOfBirth: "",
				email: "",
				firstName: "",
				lastName: "",
				phoneNumber: "",
			},
			onSubmit: (values) => {
				console.log(values);
			},
		});

	return (
		<form onSubmit={handleSubmit} className="flex h-full w-full flex-col justify-between">
			<div className="space-y-5 border-y py-6">
				<div className="grid grid-cols-2 gap-x-4">
					<div>
						<label className="text-xs font-medium" htmlFor="firstName">
							First Name
						</label>
						<Input name="firstName" onChange={handleChange} placeholder="Enter First Name" />
						{errors.firstName && touched.firstName && (
							<p className="text-xs text-red-500">{errors.firstName}</p>
						)}
					</div>
					<div>
						<label className="text-xs font-medium" htmlFor="lastName">
							Last Name
						</label>
						<Input name="lastName" onChange={handleChange} placeholder="Enter Account Name" />
						{errors.lastName && touched.lastName && (
							<p className="text-xs text-red-500">{errors.lastName}</p>
						)}
					</div>
				</div>
				<div>
					<label className="text-xs font-medium" htmlFor="email">
						Email Address
					</label>
					<Input
						type="email"
						name="email"
						onChange={handleChange}
						placeholder="Enter Email Address"
					/>
					{errors.email && touched.email && (
						<p className="text-xs text-red-500">{errors.email}</p>
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
