import { Nutrify,HeroONB,NeedMedicalGuide1,NeedMedicalGuide2,NeedMedicalGuide3,NeedMedicalGuide4, HeroINS, HeroIND } from "@/data/imageData";

export const TrendingData = [
	"Amlodipine",
	"Oraquick",
	"Levofem",
	"Vitamin C",
	"Novarsc",
	"Klovinal",
];

export const PopularOnOneHealthData = [
	{
		title: "#1 IN SUPPLEMENTS",
		Image: Nutrify as string,
		action: {
			title: "Nutrify",
			href: "https://onehealthng.com/pharmacy",
		},
	},
	{
		title: "#1 IN ANTIMALARIA ",
		Image: HeroONB as string,
		action: {
			title: "Malaria DTP Kit",
			href: "https://forms.gle/WMqZerndJfihNqSt5",
		},
	},
	{
		title: "PERIOD PACKAGE",
		Image: HeroONB as string,
		action: {
			title: "Period Princess",
			href: "https://forms.gle/WMqZerndJfihNqSt5",
		},
	},
	{
		title: "TOP TRAVEL BUNDLE",
		Image: HeroONB as string,
		action: {
			title: "Travel Kit",
			href: "https://forms.gle/WMqZerndJfihNqSt5",
		},
	},
	{
		title: "SEX PERFORMANCE",
		Image: HeroONB as string,
		action: {
			title: "Pleasure box",
			href: "https://forms.gle/WMqZerndJfihNqSt5",
		},
	},
];
export const PopularServicesData = [
	{
		title: "ORDER MEDICINES",
		Image: Nutrify as string,
		action: {
			title: "Enter Pharmacy",
			href: "https://onehealthng.com/pharmacy",
		},
	},
	{
		title: "GET HEALTH COVER",
		Image: HeroONB as string,
		action: {
			title: "Download App",
			href: "https://onelink.to/rj8abd",
		},
	},
	{
		title: "SPEAK TO A DOCTOR",
		Image: HeroONB as string,
		action: {
			title: "Book Consult",
			href: "https://forms.gle/WMqZerndJfihNqSt5",
		},
	},
	{
		title: "LAB TEST",
		Image: HeroONB as string,
		action: {
			title: "Book Health Test",
			href: "https://forms.gle/WMqZerndJfihNqSt5",
		},
	},
];
export const EcosystemData = [
	{
		title: "PHARMACIES",
		Image: HeroONB as string,
		action: {
			title: "Pharmacy fulfilment network",
			href: "https://onehealthng.com/pharmacy",
		},
	},
	{
		title: "INSURERS & HOSPITALS",
		Image: HeroINS as string,
		action: {
			title: "Pharmacy Benefit solution",
			href: "https://onelink.to/rj8abd",
		},
	},
	{
		title: "DISTRIBUTON PARTNER",
		Image: HeroIND as string,
		action: {
			title: "Advertise on OneHealth",
			href: "https://forms.gle/WMqZerndJfihNqSt5",
		},
	},
];

export const QuickActionsData = [
	{
		title: "Talk to a pharmacist",
		Image: NeedMedicalGuide1 as string,
		action: {
			name: "Settle your health concerns on a quick chat",
			href: "#",
		},
	},
	{
		title: "Get health protection cover",
		Image: NeedMedicalGuide2 as string,
		action: {
			name: "Cover for hospitals, medicines, labs & more",
			href: "#",
		},
	},
	{
		title: "Wellness drive at your office/event",
		Image: NeedMedicalGuide3 as string,
		action: {
			name: "Health talks, checkups, and wellness games",
			href: "#",
		},
	},
	{
		title: "Emergency",
		Image: NeedMedicalGuide4 as string,
		action: {
			name: "Request immediate help",
			href: "#",
		},
	},
];