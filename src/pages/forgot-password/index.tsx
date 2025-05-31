import { RiArrowLeftSLine, RiLoader2Line } from "@remixicon/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { toast } from "sonner";
import * as Yup from "yup";
import React from "react";

import AuthLayout from "@/components/layouts/auth-layout";
import { ForgotPasswordGraphic } from "@/assets/icons";
import { RequestPasswordReset } from "@/queries/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Seo } from "@/components/shared";
import type { HttpError } from "@/types";

const Page = () => {
	const router = useRouter();

	const { isPending, mutateAsync } = useMutation({
		mutationFn: RequestPasswordReset,
		onSuccess: () => {
			toast.success("An email sent has been sent to you");
			router.push("/reset-password");
		},
		onError: (error: HttpError) => {
			const errorMessage = Array.isArray(error?.response.data.message)
				? error?.response.data.message[0]
				: error?.response.data.message;
			const message = errorMessage ?? "Something went wrong, please try again later";
			toast.error(message);
		},
	});

	const { errors, handleChange, handleSubmit, touched } = useFormik({
		initialValues: {
			email: "",
		},
		validateOnChange: true,
		validationSchema: Yup.object({
			email: Yup.string().email("Invalid email address").required("Required"),
		}),
		onSubmit: (values) => {
			mutateAsync(values.email);
		},
	});

	return (
		<>
			<Seo title="Forgot Password" />
			<AuthLayout screen="forgot-password">
				<div className="flex max-w-96 flex-col justify-center gap-6 pt-20">
					<header className="flex flex-col gap-4">
						<ForgotPasswordGraphic />
						<Button onClick={() => router.back()} className="w-fit" size="sm" variant="outline">
							<RiArrowLeftSLine className="size-4" /> Back
						</Button>
						<h2 className="font-body text-2xl font-bold text-neutral-900">Forgot Password</h2>
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
