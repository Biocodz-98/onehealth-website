import OneHealthServiceSuits from "@/components/OneHealthServiceSuits";
import { ServiceProviderData, CoverageData } from "./data";
import CareCard from "@/components/cards/CareCard";
// import { CoverageData } from "./data";
import MaxWithWrapper from "@/components/MaxWithWrapper";

export default function ServiceProvider() {
	return (
		<OneHealthServiceSuits
			tag="RELIABLE PHARMACY SERVICE PROVIDER"
			headingText="Independent, full-service pharmacy benefit manager (PBM)"
			subHeadingText="Deliver innovative, cost-efficient pharmacy solutions anywhere for your enrollees. Designed to continuously improve member quality of care, while containing cost."
			containsNoStyles={false}
			serviceCollections={ServiceProviderData}
			sectionCls="md:pb-56"
			sectionHeaderCls="px-4 md:px-0"
		>
			<MaxWithWrapper>
				<div className="flex md:flex-row flex-col h-full  w-full mx-auto my-7 md:my-28  md:px-6 justify-around gap-10 items-center md:items-stretch">
					{CoverageData.map((item, index) => (
						<CareCard
							key={index}
							title={item.title}
							action={item.action}
							href={item.href}
							heading={item.heading}
							description={item.description}
							bgColor={item.bgColor}
							image={item.image}
							showBackground={true}
							index={0}
							arrLength={2}
							imageWidth={150}
							imgcls="md:absolute relative order-1 -right-10 md:bottom-0 -bottom-10 ml-auto w-[40%] "
							contentCls="h-full gap-0"
							cls="w-full"
							headCls="md:w-[83%] mt-20"
							desCls="w-[65%]"
							extendClsLeft="display-card-clip-left-extend"
							extendClsRight="display-card-clip-right-extend"
						/>
					))}
				</div>
			</MaxWithWrapper>
		</OneHealthServiceSuits>
	);
}
