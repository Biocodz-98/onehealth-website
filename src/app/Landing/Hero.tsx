import {  HeroCardData} from './data';
import {Motherchild,ProductHero,Shola ,FemaleNurseHero,PrescriptionHero, HeroLanding} from '@/data/imageData';
// import HeroCard from '../../components/cards/HeroCard';
// import Background from '../../components/Background';
// import MaxWithWrapper from '../../components/MaxWithWrapper';
import HeroComponent from "@/components/Hero"



export default function Hero() {
  return (
		// <section className="relative  w-full h-[88.5vh] border-b-8 border-[#E9F9DB] ">
		// 	{/* <Background /> */}
		// 	<div className="bghero">
		// 		<div className="left-hero-bg absolute w-full h-full bg-[#09453008]"></div>
		// 		<div className="right-hero-bg absolute w-full h-full bg-[#09453008]"></div>
		// 	</div>
		// 	<MaxWithWrapper>
		// 		<div className="content grid grid-cols-12 px-10 relative top-8 h-fit items-center justify-items-around justify-around">
		// 			<div className=" left flex flex-col gap-10 col-span-6 top-10 relative">
		// 				<div className=" flex flex-col gap-10">
		// 					<h1 className="text-wrap w-full text-start font-bold leading-12 font-head text-5xl text-primary">
		// 						Online Pharmacy & Healthcare Solutions
		// 					</h1>
		// 					<p className="leading-7 text-xl font-normal text-slate-600 pr-10 md:pr-20">
		// 						Digital infrastructure for Individuals, Payers & Providers for
		// 						easy access to quality medicines & healthcare solutions
		// 					</p>
		// 				</div>
		// 				<div className="cards flex gap-4 ">
		// 					{HeroCardData.map((item, index) => (
		// 						<HeroCard
		// 							key={index}
		// 							title={item.title}
		// 							action={item.action}
		// 							imagesrc={item.Image}
		// 						/>
		// 					))}
		// 				</div>
		// 			</div>
		// 			<div></div>
		// 			<div className="right w-[504px] h-[500px]  top-8 relative col-span-4 ">
		// 				<img
		// 					src={HeroWomen}
		// 					alt="elegant healthy women"
		// 					className="h-full w-full"
		// 					// width={504}
		// 					// height={500}
		// 				/>
		// 			</div>
		// 		</div>
		// 	</MaxWithWrapper>
		// </section>
		<HeroComponent
			hasBadge={false}
			headerText="Online Pharmacy & Healthcare Solutions"
			subHeader="Digital infrastructure for Individuals, Payers & Providers for easy access to quality medicines & healthcare solutions"
			heroCardData={HeroCardData}
			heroImage={HeroLanding}
			motherImage={Motherchild}
			sholaImage={Shola}
			productImage={ProductHero}
			shockImage={FemaleNurseHero}
			textImage={PrescriptionHero}
			heroImageAlt="elegant woman and child reminded to pickup their medication"
			wrapperWidth="md:px-4 "
			cardClassName="p-4"
			className="grid md:flex flex-col md:flex-col justify-between lg:flex-row  overflow-visible md:pb-32 lg:px-28"
			className1="order-first gap-8 md:gap-14 md:pl-0  px-2 md:px-0 w-full relative lg:w-[65%]"
			className2="h-[490px] mt-9 lg:h-[650px] w-full mb-10 pb-5 order-last px-5 lg:px-0 md:max-w-[500px] relative max-h-[560px]"
			classNameImg="relative "
			headerTextCls=" leading-10  md:leading-12 "
			isLanding={false}
		/>
	);
}
