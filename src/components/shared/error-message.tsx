import type { FormikErrors, FormikTouched } from "formik";
import React from "react";

export function ErrorMessage<T>(
	errors: FormikErrors<T>,
	field: keyof T,
	touched: FormikTouched<T>
) {
	if (!touched[field] && !errors[field]) {
		return null;
	}

	return <p className="text-xs text-red-500">{errors[field] as string}</p>;
}
