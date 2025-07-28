import { useMutation } from "@tanstack/react-query";
import { RiLoader2Line } from "@remixicon/react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { toast } from "sonner";
import * as Yup from "yup";
import React from "react";

import AuthLayout from "@/components/layouts/auth-layout";
import { Button } from "@/components/ui/button";
import { PasswordReset, type CreatePasswordDto } from "@/queries/auth";
import { Input } from "@/components/ui/input";
import { LockGraphic } from "@/assets/icons";
import { Seo } from "@/components/shared";

const Page = () => {
	const router = useRouter();
	const otp = router.query.token as string;

	const { isPending, mutate } = useMutation({
		mutationFn: PasswordReset,
		onSuccess: () => {
			toast.success("Your password has been changed successfully");
			router.push("/");
		},
		onError: (error) => {
			console.error(error);
		},
	});

	const { errors, handleChange, handleSubmit, touched } = useFormik<CreatePasswordDto>({
		initialValues: {
			confirm_password: "",
			new_password: "",
			otp,
		},
		validateOnChange: true,
		validationSchema: Yup.object({
			confirm_password: Yup.string()
				.required("Please confirm your new password")
				.oneOf([Yup.ref("new_password")], "Passwords must match"),
			new_password: Yup.string()
				.required("Password is required")
				.matches(
					/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
					"Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"
				),
		}),
		onSubmit: (values) => {
			const payload = {
				...values,
				otp,
			};
			mutate(payload);
		},
	});

	return (
		<>
			<Seo title="Welcome to Classore for Marketers" />
			<AuthLayout screen="create-password">
				<div className="flex max-w-96 flex-col justify-center gap-6 pt-20">
					<header className="flex flex-col gap-4">
						<LockGraphic />
						<h2 className="font-body text-2xl font-bold text-neutral-900">Create Password</h2>
					</header>
					<form onSubmit={handleSubmit} className="flex flex-col gap-4 font-body font-normal">
						<Input
							type="password"
							label="New Password"
							placeholder="***********"
							className="col-span-full"
							name="new_password"
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
								touched.confirm_password && errors.confirm_password ? errors.confirm_password : ""
							}
						/>
						<div className="mt-2 flex flex-col gap-2">
							<Button type="submit" disabled={isPending}>
								{isPending ? <RiLoader2Line className="animate-spin" /> : "Next"}
							</Button>
						</div>
					</form>
				</div>
			</AuthLayout>
		</>
	);
};

export default Page;
