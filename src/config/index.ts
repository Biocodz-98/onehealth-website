import { Icons } from "@/components/Icons";

export const PRODUCTS_CATEGORY = ["Medicine", "Consultant", "Appointment"];

export const NAV_LINKS = [
	{
		label: "Pharmacies",
		value: "pharmacies" as const,
		href: "/pharmacies" as const,
	},
	{
		label: "Insurers",
		value: "insurers" as const,
		href: "/insurers" as const,
	},
	{
		label: "Resources",
		value: "resources" as const,
		href: "#" as const,
	},
	{
		label: "About",
		value: "about" as const,
		href: "https://onehealthng.com/about-us" as const,
	},
];

export const CALL_TO_ACTION = [
	{
		label: "Call us",
		value: "call-us" as const,
		icon: Icons.call,
		href: "tel:+2348179017319",
		variant: "btn-white",
	},
	{
		label: "Sign in",
		value: "sign-in" as const,
		icon: "<></>",
		href: "https://onehealthng.com/customer/login" as const,
		variant: "btn-light-green",
	},
	{
		label: "Enter Pharmarcy",
		value: "enter-pharmarcy" as const,
		icon: "<></>",
		href: "https://onehealthng.com/pharmacy" as const,
		variant: "btn-green",
	},
];
