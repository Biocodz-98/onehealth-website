import { BsWhatsapp } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import { Icons } from "../../components/Icons";
import {HeroIND,HeroINS,HeroONB,CareInsure,CareCart,WhyOneHealth1,WhyOneHealth2,WhyOneHealth3,PlatformImgF1,PlatformImgF2,PlatformImgH1,PlatformImgH2,NeedMedicalGuide1,NeedMedicalGuide2,NeedMedicalGuide3} from "@/data/imageData"

export const HeroCardData = [
	{
		title: "INDIVIDUALS",
		Image: HeroIND as string,
		action: {
			title: "Enter Pharmacy",
			href: "https://onehealthng.com/pharmacy",
		},
	},
	{
		title: "INSURERS",
		Image: HeroINS as string,
		action: {
			title: "Partner With Us",
			href: "https://forms.gle/WMqZerndJfihNqSt5",
		},
	},
	{
		title: "PROVIDERS",
		Image: HeroONB as string,
		action: {
			title: "Get On Board",
			href: "https://forms.gle/Z38NAhYRH2uXUcEZA",
		},
	},
];

export const CareSolutionData = [
	{
		title: "FOR INSURERS",
		image: CareInsure,
		action: "Learn more",
		href: "https://partner.onehealthng.com/hmo",
		heading: "Medication & pharmacy benefits for patients",
		description: "Enrollee-friendly Pharmacy Benefit & Fulfilment Solution",
		bgColor: "#E9FFEB",
	},
	{
		title: "FOR PHARMACIES",
		image: CareCart,
		action: "Learn more",
		href: "https://onehealthng.com/pharmacy",
		heading: "Pharmacy fulfillment & dispensing",
		description:
			"Healthcare fulfillment to transform healthcare service provision in Nigeria",
		bgColor: "#F1FFE4",
	},
];

export const WhyOneHealthcareData = [
	{
		heading: "Lowest prices",
		image: WhyOneHealth1,
		description:
			"We offer the lowest prices and discounts to give you the best prices on your medications & healthcare solutions",
	},
	{
		heading: "Medication Support",
		image: WhyOneHealth2,
		description:
			"We manage & automate your refills, provide convenient medication support, patient follow-up and advisory.",
	},
	{
		heading: "Same Day, Last Mile Care",
		image: WhyOneHealth3,
		description:
			"Before work, in the evening, at home or right to your office. We deliver your quality healthcare right to your door.",
	},
];

export const PlatformCardData = [
	{
		title: "Pillmova",
		description: "#1 Pharma logistics and mobility platform in Nigeria",
		action: "Learn more",
		href: "https://pillmova.co/",
		imageHeader: PlatformImgH1,
		imageFooter: PlatformImgF1,
		bgColor: "#228821",
		bgColorSec: "#379A44",
	},
	{
		title: "Pillfinda",
		description:
			"Pharma procurement, inventory intelligence for pharmacies in Africa",
		action: "Learn more",
		href: "https://pillmova.com/",
		imageHeader: PlatformImgH2,
		imageFooter: PlatformImgF2,
		bgColor: "#EAFBDA",
		bgColorSec: "#61AC1A",
	},
];


export const GuideCardData = [
	{
		image: NeedMedicalGuide1,
	},
	{
		image: NeedMedicalGuide2,
	},
	{
		image: NeedMedicalGuide3,
	},
];

export const ContactGuideInfoData = [
	{
		Icon: BsWhatsapp,
		title: "08179017319",
	},
	{
		Icon: Icons.call,
		title: "08179017319",
	},
	{
		Icon: FiMail,
		title: "customerservice@onehealthng.com",
	},
];
