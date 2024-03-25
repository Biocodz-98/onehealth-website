import React,{useRef,useEffect} from 'react'
import { cn } from '@/lib/utils';
import { motion, useInView, useAnimation } from "framer-motion";
import { Header, H1P1L } from "@/animate.data";

export default function SectionHeaderMini({tag,headingText,lineCls,tagCls,secCls}:{tag:string,headingText:string,lineCls?:string,tagCls?:string,secCls?:string}) {
		const smmRef = useRef(null);
		const smView = useInView(smmRef, { once: true });
		const smController = useAnimation();
		const smController1 = useAnimation();

		useEffect(() => {
			if (smView) {
				smController.start("animate");
				smController1.start("animate");
			}
		}, [smView]);
	
  return (
		<motion.div
			className={cn("flex flex-col gap-10", secCls)}
			ref={smmRef}
			variants={Header}
			animate={smController}
			initial="initial"
			transition={{ duration: 0.65, delay: 0.3 }}
			exit={Header.exit}
		>
			<motion.div
				className={cn("first flex items-center  w-full h-full ", tagCls)}
				variants={Header}
				animate={smController}
				initial="initial"
				transition={{ duration: 0.65, delay: 0.3 }}
				exit={Header.exit}
				whileInView="animate"
				viewport={{
					once: true,
				}}
			>
				<p className="bg-[#CFF1D2] rounded-[40px] font-sans font-semibold text-sm leading-5 text-[#475367] p-3 py-2 w-fit  text-nowrap">
					{tag}
				</p>
				<p className={cn("border border-[#CFF1D2] w-[80%]", lineCls)}></p>
			</motion.div>
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
				className="text-secondary font-semibold md:leading-[60px] leading-9 text-[1.8rem] md:text-[2.5rem]  font-head"
			>
				{headingText}
			</motion.h1>
		</motion.div>
	);
}
