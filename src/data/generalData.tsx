import { BsWhatsapp } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import { Icons } from "@/components/Icons";
import {
	NeedMedicalGuide1,
	NeedMedicalGuide2,
	NeedMedicalGuide3,
	CoughColdTestimonial,
	HerHealthTestimonial,
	HisHealthTestimonial,
	MultivitaminsTestimonial,
	SexualHealthTestimonial,
	MotherChildCat,
	Antimaleria,
	Antibiotics,
	Contraceptives,
} from "./imageData";

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

export const TestimonialCardData = [
	{
		image: CoughColdTestimonial,
		alt: "Cough and cold medication from OneHealth online pharmacy in Nigeria.",
		title: "Cough & Cold",
		link: "https://onehealthng.com/category/cough-cold",
	},
	{
		image: HerHealthTestimonial,
		alt: "Women's health medication from OneHealth online pharmacy in Nigeria.",
		title: "Her Health",
		link: "https://onehealthng.com/category/her-health",
	},
	{
		image: HisHealthTestimonial,
		alt: " Image for men's health medication from OneHealth online pharmacy in Nigeria.",
		title: "His Health",
		link: "https://onehealthng.com/category/his-health",
	},
	{
		image: SexualHealthTestimonial,
		alt: "Sexual health medication from OneHealth online pharmacy in Nigeria.",
		title: "Sexual Health",
		link: "https://onehealthng.com/category/sexual-health",
	},
	{
		image: MultivitaminsTestimonial,
		alt: "Multivitamins from OneHealth online pharmacy in Nigeria.",
		title: "Multivitamins",
		link: "https://onehealthng.com/category/vitamins",
	},
	{
		image: CoughColdTestimonial,
		alt: "Cough and cold medication from OneHealth online pharmacy in Nigeria.",
		title: "Cough & flu",
		link: "https://onehealthng.com/category/cough-cold-and-flu",
	},
	{
		image: MotherChildCat,
		alt: "Mother and child medication from OneHealth online pharmacy in Nigeria",
		title: "Mother & Child",
		link: "https://onehealthng.com/category/mother-child",
	},
	{
		image: Antimaleria,
		alt: "Anti-malarial medication from OneHealth online pharmacy in Nigeria.",
		title: "Anti-maleria",
		link: "https://onehealthng.com/category/malaria-medications",
	},
	{
		image: Antibiotics,
		alt: "Antibiotics from OneHealth online pharmacy in Nigeria.",
		title: "Antibiotics",
		link: "https://onehealthng.com/category/antibiotics",
	},
	{
		image: Contraceptives,
		alt: "Contraceptives from OneHealth online pharmacy in Nigeria.",
		title: "Contraceptives",
		link: "https://onehealthng.com/category/contraceptives",
	},
];

export const TestimonialSholaData = [
	{
		title: "Amlodipine x26 500mg, Qty 12",
		body: "Take 2 by mouth every 8 hours",
	},
	{
		title: "Omeprazole 40mg, Qty 50",
		body: "Take 2 by mouth 3 times daily",
	},
];