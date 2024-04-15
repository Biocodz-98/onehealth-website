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
				className1="lg:order-last order-first lg:max-w-[60%] gap-8 md:pl-9 lg:w-[60%]  px-2 md:px-0 md:top-10 top-14"
				className2=" w-full  mb-10 pb-10 mt-10 h-[490px] mt-9 lg:h-[650px] md:max-w-[500px] max-h-[560px]"
				className="grid md:flex flex-col md:flex-col lg:flex-row overflow-visible md:gap-9 gap-0 md:mt-24 mt-32"
				classNameSection="overflow-hidden lg:min-h-[99vh] lg:pb-32"
				classNameImg="absolute -left-[10.5%] md:-left-[34%] lg:-left-[19%]  scale-100  md:scale-110"
				wrapperWidth="md:px-4 lg:px-16  px-0"
				cardClassName="p-4 "
				hcCls="lg:w-full md:overflow-x-scroll lg:overflow-x-visible "
				headerTextCls="text-3xl"
			/>
		</>
	);
}
