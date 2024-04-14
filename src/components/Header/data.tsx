import { Icons } from "../Icons"
import {
	Rescandles,
	Reschart,
	Respin,
	HeroINS,
	HeroONB,
	ResBox,
	ResPlus,
} from "@/data/imageData";

export const MobileNavData = [
	{
		text: "Home",
		icon: Icons.home,
		action: "/",
	},
	{
		text: "Services",
		icon: Icons.productMobile,
		// action: "https://onehealthng.com/pharmacy",
		action: "#",
	},
	{
		text: "Call Us",
		icon: Icons.call,
		// action: "tel:+2348179017319",
		action: "#",
	},
	// {
	// 	text: "Cart",
	// 	icon: Icons.cart,
	// 	action: "#",
	// },
	{
		text: "Login",
		icon: Icons.profile,
		// action: "https://onehealthng.com/customer/login",
		action: "#",
	},
];

export const ResourceData = [
	{
		title: "Wall of life | Our Blog",
		image: Reschart,
		desc: "Expert-reviewed health advice",
		link: "https://onehealthng.com/blog",
	},
	{
		title: "Health Calculators",
		image: Rescandles,
		desc: "Custom health & wellness calculators ",
		link: "https://onehealthng.com/calculators",
	},
	{
		title: "Drug Reaction",
		image: Respin,
		desc: "Report adverse health reaction",
		link: "https://primaryreporting.who-umc.org/NG",
	},
	{
		title: "Get Product Recommendation",
		image: ResBox,
		desc: "Get the right medications just for you.",
		link: "https://onehealthng.com/bot/sexual-health",
	},
	{
		title: "Ask a Pharmacist",
		image: ResPlus,
		desc: "Get guidance for pressing health asks",
		link: "https://wa.link/vww2zy",
	},
];

export const LoginCardData = [
	{
		title: "INSURERS & PARTNERS",
		Image: HeroONB as string,
		action: {
			title: "Sign in to portal",
			href: "https://onehealthng.com/pharmacy",
			newPage:true
		},
	},
	{
		title: "PHARMACIES",
		Image: HeroINS as string,
		action: {
			title: "Sign in to portal",
			href: "https://partner.onehealthng.com",
			newPage:false
		},
	},
];