import { useMutation } from "@tanstack/react-query";
import { RiLoader2Line } from "@remixicon/react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { toast } from "sonner";
import * as Yup from "yup";
import React from "react";

import { PasswordReset, type CreatePasswordDto } from "@/queries/auth";
import AuthLayout from "@/components/layouts/auth-layout";
import { VerifyEmailGraphic } from "@/assets/icons";
import { OtpInput, Seo } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { HttpError } from "@/types";

const initialValues: CreatePasswordDto = {
	confirm_password: "",
	new_password: "",
	otp: "",
};

const Page = () => {
	const router = useRouter();

	const { isPending, mutateAsync } = useMutation({
		mutationFn: PasswordReset,
		onSuccess: () => {
			toast.success("Your password has been changed successfully");
			router.push("/");
		},
		onError: (error: HttpError) => {
			const errorMessage = Array.isArray(error?.response.data.message)
				? error?.response.data.message[0]
				: error?.response.data.message;
			const message = errorMessage ?? "Something went wrong, please try again later";
			toast.error(message);
		},
	});

	const { errors, handleChange, handleSubmit, setFieldValue, touched, values } = useFormik(
		{
			initialValues,
			validateOnChange: true,
			validationSchema: Yup.object({
				confirm_password: Yup.string()
					.required("Please confirm your new password")
					.oneOf([Yup.ref("password")], "Passwords must match"),
				new_password: Yup.string()
					.required("Password is required")
					.matches(
						/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
						"Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"
					),
				otp: Yup.string()
					.required("OTP is required")
					.matches(/^\d{4}$/, "OTP should be numbers only"),
			}),
			onSubmit: (values) => {
				console.log(values);
				mutateAsync(values);
			},
		}
	);

	return (
		<>
			<Seo title="Reset Password" />
			<AuthLayout screen="reset-password">
				<div className="flex max-w-96 flex-col justify-center gap-6 pt-20">
					<header className="flex flex-col gap-4">
						<VerifyEmailGraphic />
						<h2 className="font-body text-2xl font-bold text-neutral-900">Reset Password</h2>
					</header>
					<form onSubmit={handleSubmit} className="flex flex-col gap-4 font-body font-normal">
						<OtpInput
							value={values.otp}
							onChange={(value) => setFieldValue("otp", value)}
							className="justify-start"
						/>
						{values.otp.length === 4 && (
							<>
								<Input
									type="password"
									label="New Password"
									placeholder="***********"
									className="col-span-full"
									name="password"
									onChange={handleChange}
									error={touched.new_password && errors.new_password ? errors.new_password : ""}
								/>
								<Input
									type="password"
									label="Confirm New Password"
									placeholder="***********"
									className="col-span-full"
									name="confirm_password"
									onChange={handleChange}
									error={
										touched.confirm_password && errors.confirm_password
											? errors.confirm_password
											: ""
									}
								/>
								<div className="mt-2 flex flex-col gap-2">
									<Button type="submit" disabled={isPending}>
										{isPending ? <RiLoader2Line className="animate-spin" /> : "Next"}
									</Button>
								</div>
							</>
						)}
					</form>
				</div>
			</AuthLayout>
		</>
	);
};

export default Page;
