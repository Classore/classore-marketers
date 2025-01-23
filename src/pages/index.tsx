import { useMutation } from "@tanstack/react-query";
import { RiLoader2Line } from "@remixicon/react";
import { useFormik } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import React from "react";

import AuthLayout from "@/components/layouts/auth-layout";
import { Button } from "@/components/ui/button";
import { AuthGraphic } from "@/assets/icons";
import { Input } from "@/components/ui/input";
import { Seo } from "@/components/shared";

const Page = () => {
	const { isPending } = useMutation({});

	const { errors, handleChange, handleSubmit, touched } = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validateOnChange: true,
		validationSchema: Yup.object({
			email: Yup.string()
				.required("Email is required")
				.email("Please enter a valid email address"),
			password: Yup.string()
				.required("Password is required")
				.matches(
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
					"Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"
				),
		}),
		onSubmit: (values) => {
			console.log(values);
		},
	});

	return (
		<>
			<Seo title="Welcome back" />
			<AuthLayout screen="signin">
				<div className="flex max-w-96 flex-col justify-center gap-6 pt-20">
					<header className="flex flex-col gap-4">
						<AuthGraphic />
						<h2 className="font-body text-2xl font-bold text-neutral-900">Welcome Back</h2>
					</header>

					<form onSubmit={handleSubmit} className="flex flex-col gap-4 font-body font-normal">
						<Input
							type="email"
							label="Email Address"
							placeholder="name@email.com"
							className="col-span-full"
							name="email"
							onChange={handleChange}
							error={touched.email && errors.email ? errors.email : ""}
						/>
						<div className="flex flex-col gap-4">
							<Input
								type="password"
								label="Password"
								placeholder="***************"
								className="col-span-full"
								name="password"
								onChange={handleChange}
								error={touched.password && errors.password ? errors.password : ""}
							/>
							<div className="flex items-center justify-between gap-1 text-sm">
								<label className="col-span-full flex items-center gap-3 font-normal">
									<input
										type="checkbox"
										name="agree"
										id="agree"
										className="size-5 rounded border border-neutral-200 text-primary-300"
									/>
									<p className="text-neutral-500">Remember me</p>
								</label>
								<Link href="/forgot-password" className="text-secondary-300 hover:underline">
									Forgot Password ?
								</Link>
							</div>
						</div>
						<div className="mt-2 flex flex-col gap-2">
							<Button type="submit" disabled={isPending}>
								{isPending ? <RiLoader2Line /> : "Sign In"}
							</Button>
						</div>
					</form>
				</div>
			</AuthLayout>
		</>
	);
};

export default Page;
