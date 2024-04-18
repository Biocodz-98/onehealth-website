import SectionCard from '@/components/cards/SectionCard'
import { ElevatePharmacyData } from './data';
import {PhoneSection} from "@/data/imageData"

export default function ElevatePharmacy() {
  return (
		<SectionCard
			tag="HOW WE ELEVATE YOUR PHARMACY"
			headingText="Focus on dispensing while we route the orders to you"
			subHeadingText="All the tools you need to expand your pharma sales & revenue by dispensing medication orders from our network"
			contentSectionCards={ElevatePharmacyData}
			contentImage={PhoneSection}
			contentImageAlt="An image showcasing the dashboard where you can dispense pharmacy orders requests of all sizes, quick payouts, live track orders, and access 24/7 member support."
			imageCls="md:w-[200px] lg:w-[250px] mx-auto"
			sectionCls="md:mb-40"
		/>
	);
}
