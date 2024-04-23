import MaxWithWrapper from "./MaxWithWrapper";
import { cn } from "@/lib/utils";
import HeroCard,{HeroCardProps} from "./cards/HeroCard";
// import { motion } from "framer-motion";

interface HeroProps {
	headerText: string;
	subHeader: string;
	className?: string;
	className1?: string;
	className2?: string;
	classNameSection?: string;
	classNameImg?: string;
	heroCardData: HeroCardProps[];
	heroImage: string;
	heroImageAlt: string;
	hasBadge: boolean;
	badgeTag?: string;
	wrapperWidth?: string;
	cardClassName?: string;
	hcCls?: string;
	headerTextCls?: string;
	isLanding?: boolean;
	motherImage?: string;
	sholaImage?: string;
	productImage?: string;
	shockImage?: string;
	textImage?: string;
}

export default function Hero(props:HeroProps) {
	return (
		<section
			className={cn(
				"relative  w-full md:min-h-[65vh] lg:min-h-[88.5vh] h-fit border-b-8 border-[#E9F9DB] ",
				props.classNameSection
			)}
			// initial={{ y: 300, opacity: 0 }}
			// animate={{ y: 0, opacity: 1 }}
			// exit={{ y: -300, opacity: 0 }}
			// transition={{duration:0.6, delay:0.3}}
		>
			{/* <Background /> */}
			<div className="bghero">
				<div className="left-hero-bg absolute w-full h-full bg-[#09453008]"></div>
				<div className="right-hero-bg absolute w-full h-full bg-[#09453008]"></div>
			</div>
			<MaxWithWrapper className={props.wrapperWidth}>
				<div
					className={cn(
						"content flex md:flex-row flex-col gap-9 md:gap-0 lg:gap-9 md:px-10 relative h-fit md:items-center md:justify-items-around md:justify-around ",
						props.className
					)}
				>
					<div
						className={cn(
							" left flex flex-col gap-10 md:col-span-6 top-10 relative items-center md:items-start lg:max-w-[50%]",
							props.className1
						)}
					>
						{props.hasBadge && (
							<p className="bg-[#B1FFB8] text-[#10461F] font-bold font-sans text-sm p-3 leading-4 rounded-md w-fit md:text-center">
								{props.badgeTag}
							</p>
						)}
						<div className=" flex flex-col gap-4 md:gap-10 md:px-0 ">
							<h1
								className={cn(
									"text-wrap w-full md:text-start text-center font-bold leading-5  md:leading-12 font-head text-[2.3rem] lg:text-5xl text-primary",
									props.headerTextCls
								)}
							>
								{props.headerText}
							</h1>
							<p className="leading-7 text-base md:text-xl font-normal text-slate-600  md:pr-0 lg:pr-20 md:text-start text-center font">
								{props.subHeader}
							</p>
						</div>
						<div
							className={cn(
								"cards flex gap-1.5 w-full md:flex-row flex-col flex-wrap  md:overflow-visible  md:py-0 md:mt-5 m-0 lg:mt-0 pr-1 md:px-0 pb-6",
								props.hcCls
							)}
						>
							{props.heroCardData.map((item, index) => (
								<HeroCard
									key={index}
									title={item.title}
									action={item.action}
									imagesrc={item.Image!}
									className={`${props.cardClassName} px-2 py-2 rounded-xl md:rounded-3xl md:p-3 md:px-5`}
									imageCls="h-20"
									actionCls="text-[0.7rem] sm:text-[0.8rem] md:text-sm"
									titleGrp="text-[0.6rem] md:text-sm"
									alt={item.alt}
									newPage={item.action.newPage}
								/>
							))}
						</div>
					</div>
					{/* <div></div> */}
					<div
						className={cn(
							"right lg:w-[504px] md:h-[500px] mx-auto md:mx-0 -order-1 md:order-1 top-8 relative lg:col-span-4 lg:mt-0",
							props.className2
						)}
					>
						{/* {!props.isLanding ? ( */}
						<img
							loading="eager"
							// @ts-ignore
							fetchpriority="high"

							src={props.heroImage}
							alt={props.heroImageAlt}
							
							className={cn(
								"md:h-full w-full object-fit scale-100 md:scale-105 aspect-square",
								props.classNameImg
							)}
							// width={504}
							// height={500}
						/>
						{/* ) : (
		
						)} */}
					</div>
				</div>
			</MaxWithWrapper>
		</section>
	);
}
					// <div className="grid gap-3 col-span-2 h-full w-full">
					// 			<div className="col-span-7 row-start-1 row-end-12 rounded-3xl relative">
					// 				<img
					// 					loading="lazy"
					// 					src={props.motherImage}
					// 					alt={props.heroImageAlt}
					// 					className="h-full w-full"
					// 				/>
					// 				<div className="absolute bottom-7 flex items-center gap-1 px-1 left-[7%]">
					// 					<img
					// 						loading="lazy"
					// 						src={props.sholaImage}
					// 						alt={props.heroImageAlt}
					// 						className=""
					// 					/>
					// 					<div className="flex flex-col gap-[0.1rem] ">
					// 						<p className="shola">
					// 							Shola, your meds are ready for pickup.
					// 						</p>
					// 						<p className="shola">
					// 							I have set 2 auto-refill for the next 30 days
					// 						</p>
					// 						<p className="shola">You save NGN16,000 order</p>
					// 						<p className="shola">For drug reactions, Send a DM</p>
					// 					</div>
					// 				</div>
					// 			</div>
					// 			<div className="bg-black col-span-6 row-start-1 row-end-7 rounded-3xl overflow-hidden bg-cover p-3">
					// 				<img
					// 					loading="lazy"
					// 					src={props.textImage}
					// 					alt={props.heroImageAlt}
					// 					className="w-full"
					// 				/>
					// 				<img
					// 					loading="lazy"
					// 					src={props.shockImage}
					// 					alt={props.heroImageAlt}
					// 					className="w-full object-contain"
					// 				/>
					// 			</div>
					// 			<div className="bg-[#E5F5D7] col-span-6 row-start-7 row-end-12 rounded-3xl overflow-hidden flex items-center">
					// 				<img
					// 					loading="lazy"
					// 					src={props.productImage}
					// 					alt={props.heroImageAlt}
					// 				/>
					// 			</div>
					// 		</div>