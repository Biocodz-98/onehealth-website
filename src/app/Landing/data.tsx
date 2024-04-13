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
			// href: "https://forms.gle/WMqZerndJfihNqSt5",
			href: "/insurers",
		},
	},
	{
		title: "PROVIDERS",
		Image: HeroONB as string,
		action: {
			title: "Get On Board",
			// href: "https://forms.gle/Z38NAhYRH2uXUcEZA",
			href: "/pharmacies",
		},
	},
];

export const CareSolutionData = [
	{
		title: "FOR INSURERS",
		image: CareInsure,
		action: "Get Started",
		// href: "https://partner.onehealthng.com/hmo",
		href: "/insurers",
		heading: "Medication & pharmacy benefits for patients",
		description: "Enrollee-friendly Pharmacy Benefit & Fulfilment Solution",
		bgColor: "#E9FFEB",
		alt: "Medication and Pharmacy Benefits for Enrollees - Online Pharmacy in Nigeria",
	},
	{
		title: "FOR PHARMACIES",
		image: CareCart,
		action: "Partner with us",
		// href: "https://onehealthng.com/pharmacy",
		href: "/pharmacies",
		heading: "Pharmacy fulfillment & dispensing",
		description:
			"Healthcare fulfillment to transform healthcare service provision in Nigeria",
		bgColor: "#F1FFE4",
		alt: "Pharmacy Fulfillment & Dispensing Services - OneHealth Pharmacy in Nigeria",
	},
];

export const WhyOneHealthcareData = [
	{
		heading: "Lowest prices",
		image: WhyOneHealth1,
		description:
			"We offer the lowest prices and discounts to give you the best deal on your medications & healthcare solutions",
		alt: "Image highlighting lowest prices offered by OneHealth Online Pharmacy",
	},
	{
		heading: "Medication Support",
		image: WhyOneHealth2,
		description:
			"We manage & automate your refills, provide convenient medication support, patient follow-up and advisory.",

		alt: "Image depicting medication support as part of OneHealth Nigeria services",
	},
	{
		heading: "Same Day, Last Mile Care",
		image: WhyOneHealth3,
		description:
			"Before work, in the evening, at home or right to your office. We deliver your quality healthcare right to your door.",
		alt: " Image showcasing same-day last mile delivery service provided by OneHealth Online Pharmacy",
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
		alt: "Image showcasing Pillmova, the leading Pharma logistics and mobility platform in Nigeria, a product of OneHealth online pharmacy.",
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
		alt: "Image displaying Pillfinda, the Pharma procurement and inventory intelligence solution for pharmacies in Africa | OneHealth Nigeria",
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
