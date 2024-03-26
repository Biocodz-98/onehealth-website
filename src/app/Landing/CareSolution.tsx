import React from 'react'
import { CareDelivery, CareImage, OneWellness } from '@/data/imageData';
import { CareSolutionData } from './data';
import CareCard from '../../components/cards/CareCard';
import OneHealthServiceSuits from '@/components/OneHealthServiceSuits';
import {motion} from "framer-motion";

export default function CareSolution() {
  return (
		// <section className="flex items-center flex-col pt-16 my-3 pb-24">
		// 	<div className="text flex flex-col items-center w-[70vw] gap-2 mb-4">
		// 		<p className="font-sans bg-[#F0F2F5] font-semibold text-sm leading-5 text-slate-600 w-fit p-2 px-4 rounded-full">
		// 			INDUSTRY LEADERS IN LAST MILE CARE
		// 		</p>
		// 		<h1 className="font-semibold font-head text-5xl leading-[72px] text-center text-secondary mt-3 w-full">
		// 			A fully integrated suite of healthcare solutions driving a healthier
		// 			Africa.
		// 		</h1>
		// 		<p className="font-normal text-xl leading-7 w-3/4 text-center text-secondary-foreground">
		// 			As a full-service pharmacy and healthcare solutions provider, we
		// 			connect individuals, providers, payers, and their enrollees with
		// 			quality medications and unique health solutions that drive positive
		// 			health outcomes.
		// 		</p>
		// 	</div>
		// 	<div className="cards mt-14 flex gap-8">
		// 		<div className="item-1 w-[20.5rem]">
		// 			<div className="h-18 w-fit p-3 bg-[#F1FFE4] rounded-full">
		// 				<img src={CareDelivery} alt="care delivery image" />
		// 			</div>
		// 			<h1 className="font-head font-bold text-4xl leading-10 text-start mt-5">
		// 				Pharmacy Benefits Management
		// 			</h1>
		// 			<p className="text-slate-600 text-xl leading-7 text-start mt-4">
		// 				For payers and providers to access their medications for their
		// 				patients
		// 			</p>
		// 		</div>
		// 		{CareSolutionData.map((item, index) => (
		// 			<CareCard
		// 				title={item.title}
		// 				action={item.action}
		// 				heading={item.heading}
		// 				description={item.description}
		// 				bgColor={item.bgColor}
		// 				image={item.image}
		// 				showBackground={true}
		// 				key={index}
		// 				index={index}
		// 			/>
		// 		))}
		// 	</div>
		// 	<div className="overflow-hidden relative h-[510px]  w-[83vw] bg-[#117754] rounded-[45px] mt-10 mx-auto">
		// 		<div className="leftbg w-full h-full clip-right bg-[#114920]/75 absolute z-0"></div>
		// 		<div className="rightbg w-full h-full bg-[#114920]/75 clip-left absolute z-0"></div>
		// 		<div className="relative z-10 flex p-5 gap-20 bg-cover items-center">
		// 			<CareCard
		// 				title="FOR INDIVIDUALS & EMPLOYERS"
		// 				heading="Affordable health cover for individuals & business"
		// 				description="Health coverage, medication management  and adherence support."
		// 				image={OneWellness}
		// 				action="Learn more"
		// 				showBackground={false}
		// 				headCls="-mt-16 text-white"
		// 				desCls="text-white"
		// 				linkCls="border-white text-white"
		// 				arrowCls="text-white"
		// 				contextcls="gap-7"
		// 				strokec={"#ffffff"}

		// 			/>
		// 			<img
		// 				src={CareImage}
		// 				alt="care contact image"
		// 				className="object-contain h-full relative -top-10 -right-5"
		// 			/>
		// 		</div>
		// 	</div>
		// </section>
		<motion.div
			initial={{ opacity: 0, scaleZ: -10 }}
			animate={{ opacity: 1, scaleZ: 1 }}
			transition={{ duration: 0.75, ease: "easeOut" }}
			exit={{ opacity: 1, scaleZ: -10 }}
			whileInView="animate"
			viewport={{
				once: true,
			}}
		>
			<OneHealthServiceSuits
				tag="INDUSTRY LEADERS IN LAST MILE CARE"
				headingText="A fully integrated suite of healthcare solutions driving a healthier Africa."
				subHeadingText="As a full-service pharmacy and healthcare solutions provider, we connect individuals, providers, payers, and their enrollees with quality medications and unique health solutions that drive positive health outcomes."
				containsNoStyles={true}
				noStyleContentText="For payers and providers to access their medications for their patients"
				noStyleHeading="Pharmacy Benefits Management"
				noStyleImage={CareDelivery}
				noStyleImageAlt="care delivery image"
				serviceCollections={CareSolutionData}
				sectionHeaderCls='px-4'
			>
				<div className="overflow-hidden relative h-fit  md:h-[37rem] lg:h-[520px]  lg:w-[83vw] w-[95vw] bg-[#117754] rounded-[45px] mt-10 mx-auto">
					<div className="leftbg w-full h-full clip-right bg-[#114920]/75 absolute z-0"></div>
					<div className="rightbg w-full h-full bg-[#114920]/75 clip-left absolute z-0"></div>
					<div className="relative z-10 grid md:flex md:p-5 lg:gap-20 bg-cover items-center">
						<CareCard
							title="FOR INDIVIDUALS & EMPLOYERS"
							heading="Health partner for people & companies in Nigeria."
							description="The all-in-one health partner, tailored to your healthcare needs with the help of an in-house dedicated (health) care team."
							image={OneWellness}
							href="https://onewellnessapp.com/"
							action="Learn more"
							showBackground={false}
							headCls="-mt-16 text-white md:text-2xl lg:text-[1.9rem]"
							desCls="text-white"
							linkCls="border-white text-white"
							arrowCls="text-white"
							contextcls="gap-7 mt-0"
							paraCls="md:text-sm lg:text-md"
							strokec={"#ffffff"}
							cls=" md:w-[450px] md:h-[622px]"
						/>
						<img
							src={CareImage}
							alt="care contact image"
							className="object-contain h-full relative md:w-[25rem] lg:w-[35rem] md:-top-10 -right-5 -order-1 p-3 md:p-0 md:order-1"
						/>
					</div>
				</div>
			</OneHealthServiceSuits>
		</motion.div>
	);
}
