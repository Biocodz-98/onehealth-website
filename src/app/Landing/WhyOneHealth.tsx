import React from 'react';
import { WhyOneHealthcareData } from "./data";
import {WhyOneHealthPills} from "@/data/imageData"
// import WhyOneHealthCard from '@/components/cards/WhyOneHealth';
// import MaxWithWrapper from '@/components/MaxWithWrapper';
import WhyOneHealthHIT from '@/components/WhyOneHealthHIT';


export default function WhyOneHealth() {
  return (
		// <section className="bg-[#F1FCF2] p-10 pt-16 relative overflow-hidden pb-32">
		// 	<img
		// 		src={WhyOneHealthPills}
		// 		alt="why one health image"
		// 		className="absolute right-0  w-[40%] top-0"
		// 	/>
		// 	<MaxWithWrapper>
		// 		<div className="flex flex-col gap-8">
		// 			<div className="first flex items-center  w-full h-full">
		// 				<p className="bg-[#CFF1D2] rounded-[40px] font-sans font-semibold text-sm leading-5 text-[#475367] p-3 py-2 w-fit  text-nowrap">
		// 					WHY ONEHEALTH
		// 				</p>
		// 				<p className="border border-[#CFF1D2] w-[80%]"></p>
		// 			</div>
		// 			<h1 className="text-secondary font-semibold leading-[60px] text-5xl font-head">
		// 				How is OneHealth Different?
		// 			</h1>
		// 			<div className="cards flex gap-16 mx-auto">
		// 				{WhyOneHealthcareData.map((item, index) => (
		// 					<WhyOneHealthCard
		// 						key={index}
		// 						image={item.image}
		// 						heading={item.heading}
		// 						description={item.description}
		// 					/>
		// 				))}
		// 			</div>
		// 		</div>
		// 	</MaxWithWrapper>
		// </section>
		<WhyOneHealthHIT
			sectionImage={WhyOneHealthPills}
			sectionImageAlt="why one health image of a capsule container with pills"
			tag="WHY ONEHEALTH"
			headingText="How is OneHealth Different?"
			sectionList={WhyOneHealthcareData}
		/>
	);
}
