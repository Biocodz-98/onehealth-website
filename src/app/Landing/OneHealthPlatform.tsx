"use client"
import { useRef, useEffect } from "react";
import MaxWithWrapper from '../../components/MaxWithWrapper'
import { PlatformCardData } from './data';
import PlatformCard from '../../components/cards/PlatformCard';
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { motion, useInView, useAnimation } from "framer-motion";
import { Header, H1P1L,H1P1R,Scale } from "@/animate.data";

export default function OneHealthPlatform() {
	const opRef = useRef(null);
	const smView = useInView(opRef, { once: true });
	const smController = useAnimation();
	const smController1 = useAnimation();

	useEffect(() => {
		if (smView) {
			smController.start("animate");
			smController1.start("animate");
		}
	}, [smView]);

  return (
		<motion.section
			variants={Header}
			animate={smController}
			initial="initial"
			transition={{ duration: 0.65, delay: 0.5 }}
			exit={Header.exit}
			ref={opRef}
			className="pt-24 mb-12"
		>
			<MaxWithWrapper>
				<div className="flex flex-col gap-5 items-center mb-10">
					<motion.p
						variants={H1P1L}
						animate={smController}
						initial="initial"
						transition={{ duration: 0.65, delay: 0.5 }}
						exit={H1P1L.exit}
						whileInView="animate"
						viewport={{
							once: true,
						}}
						className="px-4 py-2 bg-[#F0F2F5] rounded-[40px] w-fit font-semibold"
					>
						THE ONEHEALTH PLATFORM
					</motion.p>
					<motion.h1
						variants={H1P1R}
						animate={smController}
						initial="initial"
						transition={{ duration: 0.65, delay: 0.5 }}
						exit={H1P1R.exit}
						whileInView="animate"
						viewport={{
							once: true,
						}}
						className="text-secondary md:leading-[72px] font-semibold font-head text-center md:text-5xl text-[1.9rem] leading-[52px]"
					>
						Our products powering positive health experience
					</motion.h1>
				</div>
				<motion.div
					variants={Scale}
					animate={smController}
					initial="initial"
					transition={{ duration: 0.65, delay: 0.4 }}
					exit={Scale.exit}
					whileInView="animate"
					viewport={{
						once: true,
					}}
					className="flex md:gap-10 gap-10 flex-col md:flex-row w-full justify-center items-center"
				>
					{PlatformCardData.map((item, index) => (
						<PlatformCard
							key={index}
							action={item.action}
							description={item.description}
							image1={item.imageHeader}
							image2={item.imageFooter}
							heading={item.title}
							bgColorSec={item.bgColorSec}
							bgColor={item.bgColor}
							index={index}
							alt={item.alt}
							href={item.href}
							arialLabel={item.arialLabel}
							content={item.content}
							target={item.target}
						/>
					))}

				</motion.div>
				<div className="md:flex hidden gap-2 justify-center mt-20">
					<p className="w-20 h-2 rounded-md bg-[#8DDE44]"></p>
					<p className="w-20 h-2 rounded-md bg-[#8DDE44]/15"></p>
				</div>
			</MaxWithWrapper>
		</motion.section>
	);
}
