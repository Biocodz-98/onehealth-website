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
				<div className="flex md:flex-row flex-col md:h-[20.5rem] w-full mx-auto my-7 md:my-28  px-6 justify-around gap-10 items-center">
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
							imgcls="absolute -right-10 md:bottom-0 -bottom-3"
							contentCls="h-full"
							cls="h-full  w-full md:min-h-[400px]"
							headCls="md:w-[83%]"
							desCls="md:w-[58%]"
							extendClsLeft="display-card-clip-left-extend"
							extendClsRight="display-card-clip-right-extend"
						/>
					))}
				</div>
			</MaxWithWrapper>
		</OneHealthServiceSuits>
	);
}
