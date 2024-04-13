import WhyOneHealthHIT from "@/components/WhyOneHealthHIT";
import { PharmaSalesData } from "./data";
import { PharmaSalesPills } from "@/data/imageData";
import OneLink from '@/components/Link';


export default function PharmaSales() {
  return (
		<WhyOneHealthHIT
			sectionImage={PharmaSalesPills}
			sectionImageAlt="why one health image of a capsule container with pills"
			tag="HOW IT WORKS"
			headingText="Dispense & grow pharma sales in 3,2,1..."
			sectionList={PharmaSalesData}
			sectionCls="md:pb-36"
			childCls="md:gap-14 gap-4 md:flex-row flex-col items-center"
			secCls="w-[95%] ml-auto"
			listCls="w-[95%] mx-auto md:justify-between lg:justify-between px-4 "
			listChildCls="w-full"
		>
			<OneLink
				index={0}
				action="Get on board"
				to="https://partner.onehealthng.com/pharmacy"
				linkCls="bg-[#8DDE44] text-base text-secondary border-[#8DDE44] text-nowrap md:w-fit w-[70%] px-5 py-3"
			/>
			<OneLink
				index={1}
				action="Sign in to portal"
				to="https://partner.onehealthng.com/"
				linkCls="text-nowrap md:w-fit w-[70%] text-base px-5 py-3"
			/>
		</WhyOneHealthHIT>
	);
}
