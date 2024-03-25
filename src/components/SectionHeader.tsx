import React,{useRef,useEffect} from 'react'
import { cn } from '@/lib/utils';
import {motion,useInView,useAnimation} from "framer-motion"
import {Header,H1P1L,H1P1R} from "@/animate.data"

export interface SectionHeaderProps{
    tag: string;
    headingText: string;
    subHeadingText: string;
	className?: string;
}



export default function SectionHeader(props:SectionHeaderProps) {
	const smRef = useRef(null);
	const smView = useInView(smRef,{once: true});
	const smController = useAnimation();
	const smController1 = useAnimation();
	const smController2 = useAnimation();

	useEffect(() => {
		if(smView){
			smController.start("animate");
			smController1.start("animate");
			smController2.start("animate");
		}
	},[smView])
	
  return (
		<motion.div
			variants={Header}
			animate={smController}
			initial="initial"
			transition={{ duration: 0.65, delay: 0.3 }}
			exit={Header.exit}
			className={cn(
				`text flex flex-col items-center lg:w-[70vw] w-[90vw] gap-2 mb-4`,
				props.className
			)}
			ref={smRef}
		>
			<p className="font-sans bg-[#F0F2F5] font-semibold text-sm leading-5 text-slate-600 w-fit p-2 px-4 rounded-full">
				{props.tag}
			</p>
			<motion.h1
				variants={H1P1L}
				animate={smController1}
				initial="initial"
				transition={{ duration: 0.65, delay: 0.3 }}
				exit={H1P1L.exit}
				whileInView="animate"
				viewport={{
					once: true,
				}}
				className="font-semibold font-head md:text-[38px] text-[1.9rem] md:leading-[45px] leading-[25px] text-center text-secondary mt-3 w-full"
			>
				{props.headingText}
			</motion.h1>
			<motion.p
				variants={H1P1R}
				animate={smController}
				initial="initial"
				transition={{ duration: 0.65, delay: 0.3 }}
				exit={H1P1R.exit}
				whileInView="animate"
				viewport={{
					once: true,
				}}
				className="font-normal text-xl leading-7 mt-4 md:w-3/4 md:text-center text-secondary-foreground font-body"
			>
				{props.subHeadingText}
			</motion.p>
		</motion.div>
	);
}
