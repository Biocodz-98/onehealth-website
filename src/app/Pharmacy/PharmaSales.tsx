import React from 'react'
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
		>
			<OneLink
				index={0}
				action="Get on board"
				to="https://partner.onehealthng.com/pharmacy"
				linkCls="bg-[#8DDE44] text-secondary border-[#8DDE44] "
			/>
			<OneLink
				index={1}
				action="Sign in to portal"
				to="https://partner.onehealthng.com/"
			/>
		</WhyOneHealthHIT>
	);
}
