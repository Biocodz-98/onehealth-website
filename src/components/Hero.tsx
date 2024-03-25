import MaxWithWrapper from "./MaxWithWrapper";
import { cn } from "@/lib/utils";
import HeroCard,{HeroCardProps} from "./cards/HeroCard";
import { motion } from "framer-motion";

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
}

export default function Hero(props:HeroProps) {
	return (
			<motion.section
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
							"content grid md:grid-cols-12 gap-9 md:gap-0 lg:gap-9 md:px-10 relative md:top-8 h-fit md:items-center md:justify-items-around md:justify-around ",
							props.className
						)}
					>
						<div
							className={cn(
								" left flex flex-col gap-10 md:col-span-6 top-10 relative ",
								props.className1
							)}
						>
							{props.hasBadge && (
								<p className="bg-[#B1FFB8] text-[#10461F] font-bold font-sans text-sm p-3 leading-4 rounded-md w-fit ">
									{props.badgeTag}
								</p>
							)}
							<div className=" flex flex-col gap-10">
								<h1 className={cn("text-wrap w-full text-start font-bold leading-10 md:leading-12 font-head text-[2.4rem] lg:text-5xl text-primary",props.headerTextCls)}>
									{props.headerText}
								</h1>
								<p className="leading-7 text-xl font-normal text-slate-600 pr-10 md:pr-0 lg:pr-20">
									{props.subHeader}
								</p>
							</div>
							<div className={cn("cards flex gap-4 md:w-full w-[98vw] overflow-x-scroll md:overflow-visible py-5 md:py-0 md:mt-5 lg:mt-0",props.hcCls)}>
								{props.heroCardData.map((item, index) => (
									<HeroCard
										key={index}
										title={item.title}
										action={item.action}
										imagesrc={item.Image!}
										className={props.cardClassName}
									/>
								))}
							</div>
						</div>
						<div></div>
						<div
							className={cn(
								"right md:w-[20rem] lg:w-[504px] md:h-[500px] w-[25rem] mx-auto md:mx-0 -order-1 md:order-1 top-8 relative lg:col-span-4 mt-0 md:-mt-52 lg:mt-0 ",
								props.className2
							)}
						>
							<img
								src={props.heroImage}
								alt={props.heroImageAlt}
								className={cn("h-full w-full", props.classNameImg)}
								// width={504}
								// height={500}
							/>
						</div>
					</div>
				</MaxWithWrapper>
			</motion.section>
	);
}
