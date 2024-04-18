import {HeroONB,HeroINS,CareInsure,CareCart,SpillDrugContainer,CareDelivery,CustomerCare,Express,Clicked,SignUpPharmacy,VerifyPharmacy,DispensePharmacy} from "@/data/imageData"

export const HeroCardData = [
	{
		title: "NEW PHARMACIES",
		Image: HeroONB as string,
		alt: "Pharmacy Fulfillment & Distribution Network: Register your pharmacy to make more pharmacy sales.",
		action: {
			title: "Get Onboard",
			href: "https://forms.gle/Z38NAhYRH2uXUcEZA",
			newPage: false,
		},
	},
	{
		title: "LIVE PHARMACIES",
		Image: HeroINS as string,
		alt: "Pharmacy Fulfillment & Distribution Network: Login to the OneHealth Pharmacy fulfilment portal to dispense new orders",
		action: {
			title: "Sign In Portal",
			href: "https://partner.onehealthng.com/",
			newPage: false,
		},
	},
];

export const PhamaCustomerData = [
	{
		title: "QUICK",
		image: SpillDrugContainer,
		alt:
			"Efficient Pharmacy Prescription Order Fulfillment with Quick Delivery and Live Tracking - OneHealth Pharmacy Fulfilment & Distribution Network.",
		action: "Get Onboard",
		// href: "https://onehealthng.com/pharmacy",
		href: "https://docs.google.com/forms/d/e/1FAIpQLScSD2POuwZhfQlP22whd8AAgCoj7SAYs64SvqciC0p4j2truw/viewform",
		heading: "Swift Fulfillment & Real-Time Tracking",
		description:
			"Efficiently meet & deliver prescription orders with quick fulfillment and live tracking, empowering your pharmacy to exceed customer expectations.",
		bgColor: "#E9FFEB",
	},
	{
		title: "AFFORDABLE",
		image: CareCart,
		alt:
			"Quality Medications at Competitive Prices for Your Pharmacy - OneHealth pharmacy fulfilment & distribution network.",
		action: "Join Our Network",
		// href: "https://partner.onehealthng.com/",
		href: "https://docs.google.com/forms/d/e/1FAIpQLScSD2POuwZhfQlP22whd8AAgCoj7SAYs64SvqciC0p4j2truw/viewform",
		heading: "Affordable Medication Prices",
		description:
			"Provide quality medications at competitive prices, enabling your pharmacy to offer affordability without compromising on excellence",
		bgColor: "#F1FFE4",
	},
	{
		title: "EASY CLAIMS",
		image: CareInsure,
		alt:
			"Simplified Claims and Reconciliation - OneHealth Pharmacy Fulfilment and Distribution Network",
		action: "Start Processing Orders",
		// href: "https://onehealthng.com/pharmacy",
		href: "https://docs.google.com/forms/d/e/1FAIpQLScSD2POuwZhfQlP22whd8AAgCoj7SAYs64SvqciC0p4j2truw/viewform",
		heading: "Simplified payouts & reconciliation",
		description:
			"Simplified claims and reconciliation, freeing up your time to focus on what you do best – fulfilling orders and boosting your pharmacy's revenue",
		bgColor: "#F1FFE4",
	},
];


export const ElevatePharmacyData = [
	{
		title: "Easy Order Fulfilment",
		subTitle:
			"Easily view and fulfill patient orders and repeat medications digitally at your local pharmacy",
		image: Clicked,
		imageAlt: "Order fulfillment, one touch click for orders image",
	},
	{
		title: "Live Tracking",
		subTitle:
			"Watch your orders go from dispensing to delivered in real time. Get report as well as the live medication order status",
		image: CareDelivery,
		imageAlt: "Live tracking of medication orders image",
	},
	{
		title: "Quick Payouts",
		subTitle:
			"Receive confirmed payouts for medications fulfilled in your wallet at anytime",
		image: Express,
		imageAlt: "Quick payouts for medication image",
	},
	{
		title: "24/7 support",
		subTitle:
			"Get real-time operational support 24/7 via channels you refer: calls, WhatsApp, emails & SMS.",
		image: CustomerCare,
		imageAlt: "24 hours , 7 days a week live customer support image",
	},
];

export const PharmaSalesData = [
	{
		heading: "Onboard",
		image: SignUpPharmacy,
		imageAlt:
			"Onboard Your Pharmacy in Minutes - OneHealth Pharmacy Fulfilment and Distribution Network",
		description:
			"Submit a few information about your pharmacy and get onboard in minutes",
	},
	{
		heading: "Verify",
		image: VerifyPharmacy,
		imageAlt:
			"Verify Compliance and Capacity - Join OneHealth Pharmacy Fulfilment and Distribution Network",
		description:
			"Get verified for compliance and capacity to deliver on expectations",
	},
	{
		heading: "Dispense",
		image: DispensePharmacy,
		imageAlt:
			"Dispense Orders, Grow Sales - Join OneHealth Pharmacy Fulfilment and Distribution Network",
		description:
			"Start dispensing orders on the pharmacy fulfillment portal and grow weekly sales",
	},
];

