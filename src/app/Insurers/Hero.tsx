import React from 'react'
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
				heroImageAlt="Pharmacy benefits for insures , hospital and patients,ensuring timely last-mile delivery to all parts of the country image"
				headerText="Reliable medication fulfillment for enrollees, in one place"
				heroCardData={HeroCardData}
				subHeader="Pharmacy fulfillment and prescription benefits management for insurers, hospitals and patient-facing health organizations ensuring timely last-mile delivery to members or enrollees anywhere in Nigeria."
				className1="md:order-last order-first lg:max-w-[50%] gap-8 md:pl-9 top-20 lg:w-[55vw] md:top-10 px-2 md:px-0"
				className2=" h-[400px] md:top-0 md:h-[750px] w-full  mb-10 pb-10"
				className="grid md:flex flex-col md:flex-row -top-20 md:top-32 overflow-visible md:gap-9 gap-0 md:h-[46vh]"
				classNameSection="overflow-hidden lg:min-h-[99vh] lg:pb-32"
				classNameImg="absolute md:-left-[19%] md:top-0 top-16 scale-100  md:scale-125"
				wrapperWidth="md:px-4 lg:px-16 "
				cardClassName="p-4 "
				hcCls="lg:w-full md:overflow-x-scroll lg:overflow-x-visible "
				headerTextCls='text-3xl'
			/>
		</>
	);
}
