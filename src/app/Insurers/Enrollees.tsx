import SectionCard from "@/components/cards/SectionCard";
import { EnrolleesData } from "./data";
import { HomeScreen, HomeScreenMobile } from "@/data/imageData";

export default function Enrollees() {
  return (
		<SectionCard
			tag="WE MAKE YOUR ENROLLEES STAY"
			headingText="Focus on delivering exceptional member care We got your enrollees covered."
			subHeadingText="Deliver innovative, cost-efficient PBM solutions designed to continuously improve member quality of care, while containing cost."
			contentSectionCards={EnrolleesData}
			contentImage={HomeScreen}
			contentImageMobile={HomeScreenMobile}
			contentImageAlt="An image showcasing the dashboard where you can make requests of all sizes, live track your orders, and access 24/7 member support."
			parentCls=" px-2 flex flex-col md:flex-col pb-0 overflow-hidden md:overflow-visible"
			clsContent2="flex flex-wrap"
			imageWCls=" min-h-[15rem] md:min-h-[25rem] lg:min-h-[32rem] -right-7 md:right-0 mt-10 h-full relative overflow-hidden w-full mx-auto md:w-full"
			imageCls="md:object-cover object-cover absolute  scale-[100%] md:scale-100 md:w-full rounded-[2rem] md:rounded-none "
			borderClip=" md:border-t-[16px] md:border-t-[3px] md:border-x-[3px] md:border-x-[16px] rounded-t-[.5rem] md:rounded-t-[2.2rem] md:border-black border-transparent absolute w-[100%] md:w-full h-[105%] z-10"
			contentCls="px-4 pb-0 md:pb-0 lg:pb-0 lg:p-0 lg:pt-20 lg:items-center"
			sectionCls="md:mb-44"
		/>
	);
}
