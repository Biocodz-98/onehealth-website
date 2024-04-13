import { Nutrify,HeroONB,NeedMedicalGuide1,NeedMedicalGuide2,NeedMedicalGuide3,NeedMedicalGuide4, HeroINS, HeroIND } from "@/data/imageData";

export const TrendingData = [
	"Amlodipine",
	"Oraquick",
	"Levofem",
	"Vitamin C",
	"Novarsc",
	"Klovinal",
	"Aquaclav",
	"Vasporin",
	"Ciprotab",
	"Fleming",
	"Lonart",
	"Nutrify",
	"Mycoten",
];

export const PopularOnOneHealthData = [
	{
		title: "#1 IN SUPPLEMENTS",
		Image: Nutrify as string,
		alt: "",
		action: {
			title: "Nutrify",
			// href: "https://onehealthng.com/pharmacy",
			href: "https://onehealthng.com/brand/Nutrify",
		},
	},
	{
		title: "#1 IN ANTI-MALARIA ",
		Image: HeroONB as string,
		alt: "",
		action: {
			title: "Malaria DTP Kit",
			href: "https://onehealthng.com/search?q=malaria+DTP",
		},
	},
	{
		title: "PERIOD PACKAGE",
		Image: HeroONB as string,
		alt: "",
		action: {
			title: "Period Princess",
			href: "https://onehealthng.com/product/period-princess-bundle",
		},
	},
	{
		title: "TOP TRAVEL BUNDLE",
		Image: HeroONB as string,
		alt: "",
		action: {
			title: "Travel Kit",
			href: "https://onehealthng.com/search?q=wellness+travel+kit",
		},
	},
	{
		title: "SEX PERFORMANCE",
		Image: HeroONB as string,
		alt: "",
		action: {
			title: "Pleasure box",
			href: "https://onehealthng.com/product/ultimate-pleasure-bundle",
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
			href: "https://onehealthng.com/book-doctor",
		},
	},
	{
		title: "LAB TEST",
		Image: HeroONB as string,
		action: {
			title: "Book Health Test",
			href: "https://onehealthng.com/lab-test",
		},
	},
];
export const EcosystemData = [
	{
		title: "PHARMACIES",
		Image: HeroONB as string,
		action: {
			title: "Pharmacy fulfilment network",
			// href: "https://onehealthng.com/pharmacy",
			href: "/insurers",
		},
	},
	{
		title: "INSURERS & HOSPITALS",
		Image: HeroINS as string,
		action: {
			title: "Pharmacy Benefit solution",
			// href: "https://onelink.to/rj8abd",
			href: "/pharmacies",
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
			href: "https://wa.link/vww2zy",
		},
	},
	{
		title: "Health cover for teams",
		Image: NeedMedicalGuide2 as string,
		action: {
			name: "Cover for hospitals, medicines, labs & more",
			href: "https://onewellnessapp.com",
		},
	},
	{
		title: "Wellness drive at your office/event",
		Image: NeedMedicalGuide3 as string,
		action: {
			name: "Health talks, checkups, and wellness games",
			href: "https://docs.google.com/forms/d/1SkvfjIZ5Uv-Vkg_IRJQE2gKthFp5wQ55SWNAcCHsig8/edit",
		},
	},
	{
		title: "Emergency",
		Image: NeedMedicalGuide4 as string,
		action: {
			name: "Request immediate help",
			href: "https://wa.link/lm17eg",
		},
	},
];