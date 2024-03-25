import { HeroONB, HeroIND, HeroINS,SponsorAnchorHMO,SponsorAvonHMO,SponsorHYGIA,SponsorMETOHEALTH,SponsorNNPC,SponsorNOVO,SponsorRELIANCE ,CareCart,CareInsure,SpillDrugContainer,MapImage,Clicked,CareDelivery,Express,CustomerCare,AtomEditor,Sheets,TrackOrder,ComputerSupport} from "@/data/imageData";

export const HeroCardData = [
	{
		title: "INSURERS",
		Image: HeroINS as string,
		action: {
			title: "Partner with us",
			href: "https://forms.gle/WMqZerndJfihNqSt5",
		},
	},
	{
		title: "HOSPITALS",
		Image: HeroIND as string,
		action: {
			title: "Partner with us",
			href: "https://forms.gle/cMrKEEi6zDg5JvHNA",
		},
	},
	{
		title: "ALREADY A MEMBER",
		Image: HeroONB as string,
		action: {
			title: "Sign In Portal",
			href: "https://partner.onehealthng.com/",
		},
	},
];

export const SponsorImageList = [
	SponsorRELIANCE,
	SponsorHYGIA,
	SponsorAnchorHMO,
	SponsorAvonHMO,
	SponsorNNPC,
	SponsorNOVO,
	SponsorMETOHEALTH
]

export const ServiceProviderData = [
	{
		title: "QUICK ORDER",
		image: SpillDrugContainer,
		action: "Partner with us",
		href: "https://partner.onehealthng.com/",
		heading: "Quick Fulfilment",
		description:
			"Timely medication supply to enrollees via pickup or delivery, reducing hospitalizations and emergency visits.",
		bgColor: "#E9FFEB",
	},
	{
		title: "TRACK ORDER",
		image: CareInsure,
		action: "Get Pharmacy Service in 2 minutes",
		href: "https://onehealthng.com/pharmacy",
		heading: "Track Orders & Claims",
		description:
			"The much needed visibility into claims and medication delivery status.",
		bgColor: "#F1FFE4",
	},
	{
		title: "COST SAVINGS",
		image: CareCart,
		action: "Start sending orders",
		href: "https://onehealthng.com/pharmacy",
		heading: "Utilization Cost Savings",
		description:
			"Reduce utilization and healthcare costs through on-time enrollee follow-ups, reminders and periodic checkups.",
		bgColor: "#F1FFE4",
	},
];

export const CoverageData = [
	{
		title: "NATIONWIDE COVERAGE",
		image: MapImage,
		action: "Partner with us",
		href: "https://partner.onehealthng.com/",
		heading: "Reach Customers in New Markets",
		description:
			"From Lagos to Maiduguiri, from Abuja to Owerri, our network provides you access to your members in 36 states",
		bgColor: "#F1FFE4",
	},
	{
		title: "COMPETITIVE TARIFFS",
		image: HeroINS,
		action: "Get Pharmacy Service in 2 minutes",
		href: "https://onehealthng.com/pharmacy",
		heading: "Flexible Formulary Tariff",
		description:
			"Updated and well-detailed formulary with tariff options that works for you.",
		bgColor: "#F1FFE4",
	},
]; 

export const EnrolleesData = [
	{
		title: "Request of all Sizes",
		subTitle:
			"From single to bulk orders, easily request patient orders and repeat medications.",
		image: Clicked,
		imageAlt:
			"Order fulfillment, Request of patients orders and repeat medication, one touch click for orders image",
	},
	{
		title: "Live Tracking",
		subTitle:
			"Watch your orders in real time go from pharmacy to patient at home or pickup.",
		image: CareDelivery,
		imageAlt:
			"Live tracking of medication orders image,Watch your orders in real time go from pickups to delivery",
	},
	{
		title: "Member Support",
		subTitle:
			"Automated reminder, patient follow-up to enhance enrollee engagement,  adherence & retention.",
		image: Express,
		imageAlt: "Automating reminder for patient follow-up medication image",
	},
	{
		title: "24/7 support",
		subTitle:
			"Get real-time operational support 24/7 via channels you refer: calls, WhatsApp, emails & SMS.",
		image: CustomerCare,
		imageAlt: "24 hours , 7 days a week live customer support image",
	}
];

export const ReliableItems1 = [
	{
		number: "36",
		description: "States in .Nigeria",
	},
	{
		number: "2 hours",
		description: "Average delivery time",
	},
	{
		number: "100,000+",
		description: "Lives Impacted and counting",
	}
];
export const ReliableItems2 = [
	{
		number: "500,000+",
		description: "Orders delivered",
	},
	{
		number: "1000+",
		description: "Items delivered daily",
	},
	{
		number: "1,200+",
		description: "Pharmacy partners",
	},
]; 

export const CompliantData = [
	{
		title: "Specialty Care for Chronic & Complex Patients",
		image: Sheets,
		description:
			"Specialty drug management and support including Free medication delivery for chronic and complex patients.",
	},
	{
		title: "Optimized Pharmacy Networks for Delivery or Pickup",
		image: TrackOrder,
		description:
			"Safe and affordable access to medications from optimized pharmacy networks encompassing home delivery and pharmacy pickup ",
	},
	{
		title: "Technology & Infrastructure",
		image: ComputerSupport,
		description:
			"Advanced technology supporting logistics, supply chain management and real time tracking for efficient medication delivery.",
	},
	{
		title: "Regulatory Compliance & Data Security",
		image: AtomEditor,
		description:
			"Fully compliant with Nigerian healthcare regulations including stringent data security measures to safeguard enrollee information.",
	},
];