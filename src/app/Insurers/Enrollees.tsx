import React from 'react'
import SectionCard from "@/components/cards/SectionCard";
import { EnrolleesData } from "./data";
import { HomeScreen } from "@/data/imageData";

export default function Enrollees() {
  return (
		<SectionCard
			tag="WE MAKE YOUR ENROLLEES STAY"
			headingText="Focus on delivering exceptional member care We got your enrollees covered."
			subHeadingText="Deliver innovative, cost-efficient PBM solutions designed to continuously improve member quality of care, while containing cost."
			contentSectionCards={EnrolleesData}
			contentImage={HomeScreen}
			contentImageAlt="Tracking your orders in real time, get live notifications , phone image"
			parentCls=" px-2 flex flex-col md:flex-col pb-0 "
			clsContent2="flex flex-wrap "
			imageWCls=" min-h-[11rem] md:min-h-[32rem] mt-10 h-full relative overflow-hidden w-[90%] mx-auto md:w-full"
			imageCls="object-fill absolute scale-[105%] md:scale-100 md:w-full rounded-[2rem] md:rounded-none "
			borderClip=" md:border-t-[16px] border-t-[3px] border-x-[3px] md:border-x-[16px] rounded-t-[.5rem] md:rounded-t-[2.2rem] border-black absolute w-[100%] md:w-full h-[105%] z-10"
			contentCls="px-4 pb-0 md:pb-0 lg:pb-0 lg:p-0 lg:pt-20 lg:items-center"
			sectionCls="md:mb-44"
		/>
	);
}
