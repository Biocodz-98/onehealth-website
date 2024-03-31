import { Icons } from "../Icons"
import {Rescandles, Reschart, Respin} from "@/data/imageData"

export const MobileNavData = [
	{
		text: "Home",
		icon: Icons.home,
		action: "/",
	},
	{
		text: "Medicine",
		icon: Icons.product,
		action: "https://onehealthng.com/pharmacy",
	},
	{
		text: "Call Us",
		icon: Icons.call,
		action: "tel:+2348179017319",
	},
	{
		text: "Cart",
		icon: Icons.cart,
		action: "#",
	},
	{
		text: "Login",
		icon: Icons.profile,
		action: "https://onehealthng.com/customer/login",
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
];