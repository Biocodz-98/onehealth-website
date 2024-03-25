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
		title: "Cough & Cold",
		link: "https://onehealthng.com/category/cough-cold",
	},
	{
		image: HerHealthTestimonial,
		title: "Her Health",
		link: "https://onehealthng.com/category/her-health",
	},
	{
		image: HisHealthTestimonial,
		title: "His Health",
		link: "https://onehealthng.com/category/his-health",
	},
	{
		image: SexualHealthTestimonial,
		title: "Sexual Health",
		link: "https://onehealthng.com/category/sexual-health",
	},
	{
		image: MultivitaminsTestimonial,
		title: "Multivitamins",
		link: "https://onehealthng.com/category/vitamins",
	},
	{
		image: MultivitaminsTestimonial,
		title: "Cough & flu",
		link: "https://onehealthng.com/category/cough-cold-and-flu",
	},
	{
		image: MultivitaminsTestimonial,
		title: "Mother & Child",
		link: "https://onehealthng.com/category/mother-child",
	},
	{
		image: MultivitaminsTestimonial,
		title: "Maleria Medication",
		link: "https://onehealthng.com/category/malaria-medications",
	},
	{
		image: MultivitaminsTestimonial,
		title: "Antibiotics",
		link: "https://onehealthng.com/category/antibiotics",
	},
	{
		image: MultivitaminsTestimonial,
		title: "Contraceptives",
		link: "https://onehealthng.com/category/contraceptives",
	},
];