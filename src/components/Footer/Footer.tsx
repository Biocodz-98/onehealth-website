import {useRef,useEffect} from 'react'
import MaxWithWrapper from '../MaxWithWrapper';
import { GSO } from './data';
import FillButtonC from './FillButton';
import OpenButton from './OpenButton';
import { GetStartedLeft1, GetStartedRight,GetStartedLeft2,GetStartedLeft3 } from '@/data/imageData';
import Subsriber from './Subsriber';
import FooterLinks from './FooterLinks';
import TextWordy from "./TextWordy";
import { motion, useInView, useAnimation } from "framer-motion";
import { Header } from "@/animate.data";

function FooterItem ({title,action,link}:{title:string,action:string,link:string}){
	return (
		<div className='flex flex-col items-center space-y-4 z-20'>
			<FillButtonC href={link} title={title}/>
			<OpenButton href={link} title={action} />
		</div>
	);
}

export default function Footer() {
	const fRef = useRef(null);
	const smView = useInView(fRef, { once: true });
	const smController = useAnimation();
	const smController1 = useAnimation();

	useEffect(() => {
		if (smView) {
			smController.start("animate");
			smController1.start("animate");
		}
	}, [smView]);
  return (
		<motion.section ref={fRef} className="bg-white relative">
			<MaxWithWrapper>
				<div className="lg:h-[480px] h-[95vh] md:h-[50vh] mx-auto flex bg-[#228821] relative rounded-[40px] overflow-hidden mb-12 ">
					<div className="absolute footclipleft h-full w-full bg-[#10441E]/10"></div>
					<div className="absolute footclipright h-full w-full bg-[#27634E]/30"></div>
					<div className="content left-[50%] top-[40%] md:top-[50%] -translate-y-[50%] -translate-x-[50%] flex items-center justify-center gap-10  flex-col absolute w-full h-full">
						<motion.h1
							variants={Header}
							animate={smController1}
							initial="initial"
							transition={{ duration: 0.65, delay: 0.5, ease: "backOut" }}
							exit={Header.exit}
							whileInView="animate"
							viewport={{
								once: true,
							}}
							className="font-head text-white text-[2.1rem] md:text-5xl leading-[40px] md:leading-[64px] text-center font-semibold pt-5"
						>
							Get started with OneHealth
						</motion.h1>
						<div className="grid md:flex flex-wrap justify-center gap-10 md:mt-5">
							{GSO.map((item, index) => (
								// <FillButtonC href={item.link} title={item.title} key={index} />
								<FooterItem
									key={index}
									action={item.action}
									title={item.title}
									link={item.link}
								/>
							))}
						</div>
						{/* <div className="gap-20 flex -mt-3">
							{GSO1.map((item, index) => (
								<OpenButton href={item.link} title={item.title} key={index} />
							))}
						</div> */}
						<div className="flex w-full ">
							<div className="relative left-0 z-10 w-full h-full">
								<img
									src={GetStartedLeft1}
									alt="get started footer images"
									className="absolute -bottom-44 md:-bottom-24 left-14"
								/>
								<img
									src={GetStartedLeft2}
									alt="get started footer images"
									className="absolute -top-9 md:-top-24"
								/>
								<img
									src={GetStartedLeft3}
									alt="get started footer images"
									className="absolute -bottom-14 left-4"
								/>
							</div>
							<div className="relative z-10 w-80  h-full ">
								<img
									src={GetStartedRight}
									alt="get started footer images"
									className="absolute w-full -left-9 top-9 md:-top-[83px] scale-[128%]"
								/>
							</div>
						</div>
					</div>
					<div></div>
				</div>
				<div className=" flex flex-col lg:grid lg:grid-cols-11 gap-6 w-full">
					<Subsriber />
					<FooterLinks />
				</div>
				<TextWordy />
			</MaxWithWrapper>
		</motion.section>
	);
}
