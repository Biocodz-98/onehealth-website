import HeroComponent from '@/components/Hero'
import {HeroCardData} from './data'
import {ComputerHero} from "@/data/imageData"

export default function Hero() {
  return (
		<HeroComponent
			hasBadge={true}
			badgeTag="FOR PHARMACIES"
			heroImage={ComputerHero}
			heroImageAlt="OneHealth Pharmacy Fulfilment & Distribution Network Nigeria - Increase sales from pharmacy operations."
			headerText="Pharmacy fulfillment & dispensing made easy."
			heroCardData={HeroCardData}
			subHeader="Make more pharma sales by delivering medication & prescription orders to a wider customer base without hassles."
			className1="lg:order-last order-first lg:max-w-[50%] gap-10 md:pl-9 lg:w-[50vw] px-2 md:px-0  md:top-10 top-16"
			className2=" w-full  mb-10 pb-10 mt-10 h-[490px] mt-9 lg:h-[650px] md:max-w-[500px] max-h-[560px]"
			className="grid md:flex flex-col md:flex-col lg:flex-row overflow-visible md:gap-9 gap-0 md:mt-24 mt-32"
			classNameSection="overflow-hidden md:pb-32"
			classNameImg="absolute -left-[2.5%] md:-left-[32%] lg:-left-[16%] scale-100  md:scale-125 "
			wrapperWidth="md:px-4 lg:px-16"
			cardClassName="p-4 "
			headerTextCls=" leading-10  md:leading-12 "
		/>
	);
}
