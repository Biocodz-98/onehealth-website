import React from 'react'
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
			contentImageAlt='Tracking your orders in real time, get live notifications , phone image'
			imageCls='md:w-[200px] lg:w-full'
			sectionCls='md:mb-40'
		/>
	);
}
