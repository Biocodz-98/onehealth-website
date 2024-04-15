import HeroComponent from "@/components/Hero"
import { HeroCardData } from "./data";
import { HeroInsurer } from "@/data/imageData";

export default function Hero() {
  return (
		<>
			<HeroComponent
				hasBadge={true}
				badgeTag="PHARMACY BENEFITS"
				heroImage={HeroInsurer}
				heroImageAlt="Pharmacy benefit management dashboard for patient medication fulfillment in Nigeria"
				headerText="Reliable medication fulfillment for enrollees in one place"
				heroCardData={HeroCardData}
				subHeader="Pharmacy fulfillment and prescription benefits management for insurers, hospitals and patient-facing health organizations ensuring timely last-mile delivery to members or enrollees anywhere in Nigeria."
				className1="lg:order-last order-first lg:max-w-[65%] gap-8 lg:w-[65%]  px-2 md:px-0 top-14 md:top-0"
				className2="w-full mb-10 pb-10 mt-10 md:mt-0 lg:mt-0 h-[490px] lg:h-[614px] md:max-w-[650px] max-h-[614px] lg:w-[80%] md:h-[600px]"
				className="grid md:flex flex-col md:flex-col lg:flex-row overflow-visible md:gap-0 gap-0 md:mt-24 mt-32 md:px-0 lg:gap-0"
				classNameSection="overflow-hidden lg:min-h-[99vh] lg:pb-32"
				classNameImg="absolute -left-[10.5%] md:-left-[34%] lg:-left-[19%] object-cover"
				wrapperWidth="md:px-4 lg:px-16  px-0"
				cardClassName="p-4 "
				hcCls="lg:w-full md:overflow-x-scroll lg:overflow-x-visible "
				headerTextCls="text-3xl"
			/>
		</>
	);
}
