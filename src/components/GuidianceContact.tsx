import {useRef,useEffect} from 'react'
import {Link} from "react-router-dom";
import { cn } from '@/lib/utils';
import GuidesCard,{ GuideCardProps } from './cards/GuidesCard';
import ContactGuideMini , {ContactGuideMiniProps} from './ContactGuideMini';
import { Icons } from './Icons';
import { motion, useInView, useAnimation } from "framer-motion";
import {Header, _Header } from "@/animate.data";

export interface GuidianceContactProps {
	guidesCard: GuideCardProps[];
	contactGuideMini: ContactGuideMiniProps[];
    headingText1: string;
    headingText2: string;
	customH1Cls?: string;
	cls?: string;
}

export default function GuidianceContact(props: GuidianceContactProps) {
		const tRef = useRef(null);
		const smView = useInView(tRef, { once: true });
		const smController = useAnimation();
		useEffect(() => {
			if (smView) {
				smController.start("animate");
			}
		}, [smView]);
	return (
		<div
			ref={tRef}
			className={cn(
				"flex flex-wrap justify-between mt-16 items-center px-5 md:px-0",
				props.cls
			)}
		>
			<motion.div
				variants={Header}
				animate={smController}
				initial="initial"
				transition={{ duration: 0.65, delay: 0.3 }}
				exit={Header.exit}
				whileInView="animate"
				viewport={{
					once: true,
				}}
				className="guide-cards flex flex-wrap md:flex-nowrap relative w-fit "
			>
				{props.guidesCard.map((item, index) => (
					<GuidesCard key={index} image={item.image} index={index} />
				))}
			</motion.div>
			<motion.div
				variants={_Header}
				animate={smController}
				initial="initial"
				transition={{ duration: 0.65, delay: 0.3 }}
				exit={_Header.exit}
				whileInView="animate"
				viewport={{
					once: true,
				}}
				className="writer-guide my-4 md:w-[60%] lg:w-[55%] "
			>
				<h1
					className={cn(
						"font-head font-semibold text-[1.6rem] md:text-4xl leading-9 text-secondary",
						props.customH1Cls
					)}
				>
					{props.headingText1}
				</h1>
				<h1 className="font-head font-semibold text-[1.5rem]  md:pr-0 max-w-screen-2xl w-[98%] md:w-full text-wrap  md:text-4xl leading-9 text-secondary">
					{props.headingText2}
				</h1>
				<div className="flex flex-wrap gap-7 items-center mt-6 my-3">
					{props.contactGuideMini.map((item, index) => (
						<ContactGuideMini title={item.title} Icon={item.Icon} key={index} />
					))}
				</div>
			</motion.div>
			<Link
				to={"tel:+2348179017319"}
				className="px-8 py-3 bg-[#8DDE44] flex w-fit gap-3 rounded-3xl text-#004449 font-sans font-semibold leading-5 text-nowrap"
			>
				<span>Call us now</span>
				<Icons.rightArrow strokec="#004449" />
			</Link>
		</div>
	);
}
