import { useFormik } from "formik";
import React from "react";

import { useDeviceWidth } from "@/hooks";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const UserSecurity = () => {
	const { isMobile } = useDeviceWidth();

	const { errors, handleChange, handleSubmit, resetForm, touched } = useFormik({
		initialValues: {
			confirmPassword: "",
			currentPassword: "",
			newPassword: "",
		},
		onSubmit: (values) => {
			console.log(values);
		},
	});

	return (
		<form onSubmit={handleSubmit} className="flex h-full w-full flex-col justify-between">
			<div className="space-y-5 border-y py-6">
				<div>
					<label className="text-xs font-medium" htmlFor="currentPassword">
						Enter current password
					</label>
					<Input
						name="currentPassword"
						onChange={handleChange}
						placeholder="Enter current password"
					/>
					{errors.currentPassword && touched.currentPassword && (
						<p className="text-xs text-red-500">{errors.currentPassword}</p>
					)}
				</div>
				<div>
					<label className="text-xs font-medium" htmlFor="newPassword">
						Enter new password
					</label>
					<Input name="newPassword" onChange={handleChange} placeholder="Enter new password" />
					{errors.newPassword && touched.newPassword && (
						<p className="text-xs text-red-500">{errors.newPassword}</p>
					)}
				</div>
				<div>
					<label className="text-xs font-medium" htmlFor="confirmPassword">
						Confirm new password
					</label>
					<Input
						name="confirmPassword"
						onChange={handleChange}
						placeholder="Confirm new password"
					/>
					{errors.confirmPassword && touched.confirmPassword && (
						<p className="text-xs text-red-500">{errors.confirmPassword}</p>
					)}
				</div>
			</div>
			<div className="flex w-full items-center justify-between">
				<Button type="button" size={isMobile ? "xs" : "sm"} variant="destructive-outline">
					Delete Account
				</Button>
				<div className="flex items-center gap-x-4">
					<Button
						type="button"
						onClick={() => resetForm()}
						size={isMobile ? "xs" : "sm"}
						variant="outline">
						Reset Changes
					</Button>
					<Button type="submit" size={isMobile ? "xs" : "sm"}>
						Save Changes
					</Button>
				</div>
			</div>
		</form>
	);
};
