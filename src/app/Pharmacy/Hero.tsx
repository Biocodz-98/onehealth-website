import React from 'react'
import HeroComponent from '@/components/Hero'
import {HeroCardData} from './data'
import {ComputerHero} from "@/data/imageData"

export default function Hero() {
  return (
		<HeroComponent
			hasBadge={true}
			badgeTag="FOR PHARMACIES"
			heroImage={ComputerHero}
			heroImageAlt="Pharmacy fulfillment & dispensing made easy image"
			headerText="Pharmacy fulfillment & dispensing made easy."
			heroCardData={HeroCardData}
			subHeader="Make more pharma sales by delivering medication & prescription orders to a wider customer base without hassles."
			className1="order-last md:max-w-[600px] gap-8 md:pl-9 top-5"
			className2="order-first h-[750px] w-full  mb-10 pb-10"
			className="flex flex-col md:flex-row -top-20 overflow-visible "
			classNameSection="overflow-hidden md:pb-32"
			classNameImg="absolute md:-left-[19%] scale-100  md:scale-125 "
			wrapperWidth="md:px-4 lg:px-16"
		/>
	);
}
