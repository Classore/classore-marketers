import { useMutation } from "@tanstack/react-query";
import { RiLoader2Line } from "@remixicon/react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { toast } from "sonner";
import * as Yup from "yup";
import React from "react";

import AuthLayout from "@/components/layouts/auth-layout";
import { VerifyEmailGraphic } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Seo } from "@/components/shared";

const Page = () => {
	const router = useRouter();
	const token = router.query.token as string;

	const { isPending } = useMutation({
		onSuccess: () => {
			toast.success("Your password has been changed successfully");
			router.push("/");
		},
		onError: (error) => {
			console.error(error);
		},
	});

	const { errors, handleChange, handleSubmit, touched } = useFormik({
		initialValues: {
			confirmPassword: "",
			password: "",
		},
		validateOnChange: true,
		validationSchema: Yup.object({
			confirmPassword: Yup.string()
				.required("Please confirm your new password")
				.oneOf([Yup.ref("password")], "Passwords must match"),
			password: Yup.string()
				.required("Password is required")
				.matches(
					/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
					"Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"
				),
		}),
		onSubmit: (values) => {
			const payload = {
				...values,
				token,
			};
			console.log(payload);
		},
	});

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
						<Input
							type="password"
							label="New Password"
							placeholder="***********"
							className="col-span-full"
							name="password"
							onChange={handleChange}
							error={touched.password && errors.password ? errors.password : ""}
						/>
						<Input
							type="password"
							label="Confirm New Password"
							placeholder="***********"
							className="col-span-full"
							name="confirmPassword"
							onChange={handleChange}
							error={
								touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : ""
							}
						/>
						<div className="mt-2 flex flex-col gap-2">
							<Button type="submit" disabled={isPending}>
								{isPending ? <RiLoader2Line /> : "Next"}
							</Button>
						</div>
					</form>
				</div>
			</AuthLayout>
		</>
	);
};

export default Page;
