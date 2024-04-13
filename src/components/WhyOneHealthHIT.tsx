import { useRef, useEffect } from "react";
import MaxWithWrapper from './MaxWithWrapper';
import WhyOneHealthCard ,{ WhyOneHealthProps } from './cards/WhyOneHealth';
import SectionHeaderMini from './SectionHeaderMini';
import { motion, useInView, useAnimation } from "framer-motion";
import { Header, Scale } from "@/animate.data";
import { cn } from "@/lib/utils";

export interface WhyOneHealthHITProps {
	tag: string;
	headingText: string;
	sectionImage: string;
	sectionImageAlt: string;
	sectionCls?: string;
	childCls?: string;
	secCls?: string;
	listCls?: string;
	listChildCls?: string;
	sectionList: WhyOneHealthProps[];
	children?: React.ReactNode;
}

export default function  WhyOneHealthHIT(props: WhyOneHealthHITProps) {
		const whRef = useRef(null);
		const smView = useInView(whRef, { once: true });
		const smController = useAnimation();
		const smController1 = useAnimation();

		useEffect(() => {
			if (smView) {
				smController.start("animate");
				smController1.start("animate");
			}
		}, [smView]);
	return (
		<section
			ref={whRef}
			className={cn("bg-[#F1FCF2] p-1 pt-16 relative overflow-hidden pb-32",props.sectionCls)}
		>
			<motion.img
				variants={{ ...Header, ...Scale }}
				animate={smController}
				initial="initial"
				transition={{ duration: 0.65, delay: 0.3 }}
				exit={{ ...Header.exit, ...Scale.exit }}
				whileInView="animate"
				viewport={{
					once: true,
				}}
				src={props.sectionImage}
				alt={props.sectionImageAlt}
				className="absolute right-0  w-[40%] top-0"
			/>
			<MaxWithWrapper>
				<div className="flex flex-col gap-10">
					<SectionHeaderMini tag={props.tag} headingText={props.headingText} secCls={props.secCls} />
					<motion.div
						variants={Header}
						animate={smController1}
						initial="initial"
						transition={{ duration: 0.65, delay: 0.5, ease: "backOut" }}
						exit={Header.exit}
						whileInView="animate"
						viewport={{
							once: true,
						}}
						className={cn("cards flex flex-wrap justify-center lg:justify-start gap-16 lg:gap-4 mx-auto",props.listCls)}
					>
						{props.sectionList.map((item, index) => (
							<WhyOneHealthCard
								key={index}
								image={item.image}
								heading={item.heading}
								description={item.description}
								alt={item.alt}
								cls={props.listChildCls}
							/>
						))}
					</motion.div>
				</div>
				{props.children && (
					<motion.div
						variants={Header}
						animate={smController1}
						initial="initial"
						transition={{ duration: 0.65, delay: 0.3, ease: "easeIn" }}
						exit={Header.exit}
						whileInView="animate"
						viewport={{
							once: true,
						}}
						className={cn("flex place-content-center gap-14 my-20 ",props.childCls)}
					>
						{props.children}
					</motion.div>
				)}
			</MaxWithWrapper>
		</section>
	);
}
