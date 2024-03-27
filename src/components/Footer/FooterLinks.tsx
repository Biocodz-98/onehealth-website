import React, { useRef, useEffect } from "react";
import { Icons } from '../Icons';
import { PlatformData, ProductData, ResourceData } from './data';
import {Link} from 'react-router-dom';
import { motion,useAnimation,useInView } from "framer-motion";
import { Header, H1P1L, H1P1R, Scale, Footer } from "@/animate.data";

export default function FooterLinks() {
	const productRef = useRef(null);
	const platformRef = useRef(null);
	const resourceRef = useRef(null);

	const productView = useInView(productRef, { once: true });
	const plaformView = useInView(platformRef, { once: true });
	const resourceView = useInView(resourceRef, { once: true });
	const productController = useAnimation();
	const platformController = useAnimation();
	const resourceController = useAnimation();

			useEffect(() => {
				if (productView) {
					productController.start("animate");
				}
				if (plaformView) {
					platformController.start("animate");
				}
				if (resourceView) {
					resourceController.start("animate");
				}
			}, [productView, plaformView, resourceView]);
  return (
		<motion.div
			variants={Header}
			animate="animate"
			initial="initial"
			transition={{ duration: 0.65, delay: 0.5, ease: "backOut" }}
			exit={Header.exit}
			className="col-span-7 bg-slate-100/75 w-[95vw] md:max-w-screen-2xl md:w-full md:rounded-[20px]"
		>
			<div className="flex md:flex-row  flex-wrap gap-12 md:gap-0 justify-between p-4 md:p-3 lg:p-8 text-[#3E3838] text-sm font-medium">
				<motion.div
					variants={Scale}
					animate="animate"
					initial="initial"
					transition={{ duration: 0.65, delay: 0.5, ease: "backOut" }}
					exit={Scale.exit}
					whileInView="animate"
					viewport={{
						once: true,
					}}
					ref={productRef}
				>
					<motion.h5
						variants={H1P1L}
						animate="animate"
						initial="initial"
						transition={{ duration: 0.65, delay: 0.5, ease: "backOut" }}
						exit={H1P1L.exit}
						whileInView="animate"
						viewport={{
							once: true,
						}}
						className="text-[#3E3838]/75"
					>
						Product
					</motion.h5>
					<ul className="flex flex-col gap-3 top-4 relative">
						{ProductData.map((item, index) => (
							<motion.li
								variants={Footer}
								animate={productController}
								initial="initial"
								transition={{ duration: 0.65, delay: 0.5, ease: "backOut" }}
								exit={Footer.exit}
								whileInView="animate"
								viewport={{
									once: true,
								}}
								custom={index}
								key={index}
								className="list-none"
							>
								<Link to={item.link}>{item.title}</Link>
							</motion.li>
						))}
					</ul>
				</motion.div>
				<motion.div ref={platformRef}>
					<motion.h5
						variants={H1P1L}
						animate="animate"
						initial="initial"
						transition={{ duration: 0.65, delay: 0.55, ease: "backOut" }}
						exit={H1P1L.exit}
						whileInView="animate"
						viewport={{
							once: true,
						}}
						className="text-[#3E3838]/75"
					>
						Platform
					</motion.h5>
					<ul className="flex flex-col gap-3 top-4 relative">
						{PlatformData.map((item, index) => (
							<motion.li
								variants={Footer}
								animate={platformController}
								initial="initial"
								transition={{ duration: 0.65, delay: 0.55, ease: "backOut" }}
								exit={Footer.exit}
								whileInView="animate"
								viewport={{
									once: true,
								}}
								custom={index}
								key={index}
								className="list-none"
							>
								<Link to={item.link} target="_blank">{item.title}</Link>
							</motion.li>
						))}
					</ul>
				</motion.div>
				<motion.div ref={resourceRef}>
					<motion.h5
						variants={H1P1L}
						animate="animate"
						initial="initial"
						transition={{ duration: 0.65, delay: 0.6, ease: "backOut" }}
						exit={H1P1L.exit}
						whileInView="animate"
						viewport={{
							once: true,
						}}
						className="text-[#3E3838]/75"
					>
						Resources
					</motion.h5>
					<ul className="flex flex-col gap-3 top-4 relative">
						{ResourceData.map((item, index) => (
							<motion.li
								variants={Footer}
								animate={resourceController}
								initial="initial"
								transition={{ duration: 0.65, delay: 0.55, ease: "backOut" }}
								exit={Footer.exit}
								whileInView="animate"
								viewport={{
									once: true,
								}}
								custom={index}
								key={index}
								className="flex relative items-center list-none md:w-full w-fit"
							>
								<Link to={item.link} target="_blank">
									{item.title}
								</Link>
								{Boolean(item.tag) && (
									<span className="relative ml-2 px-2 py-1 rounded-sm bg-[#B1FFB8] text-wrap w-fit text-secondary font-sans font-bold text-[0.55rem]">
										{item.tag}
									</span>
								)}
							</motion.li>
						))}
					</ul>
				</motion.div>
				<div className="-order-1 md:order-last">
					<Icons.logo />
				</div>
			</div>
			<div className="flex w-full justify-between p-4 md:p-7 text-[text-[#3E3838] font-semibold text-sm">
				<ul className="flex gap-5 flex-wrap">
					<motion.li
						variants={H1P1R}
						animate="animate"
						initial="initial"
						transition={{ duration: 0.65, delay: 0.55, ease: "backOut" }}
						exit={H1P1R.exit}
						whileInView="animate"
						viewport={{
							once: true,
						}}
						className="list-none"
					>
						<Link to="https://onehealthng.com/privacy-policy" target="_blank">
							Privacy Policy
						</Link>
					</motion.li>
					<motion.li
						variants={H1P1L}
						animate="animate"
						initial="initial"
						transition={{ duration: 0.65, delay: 0.55, ease: "backOut" }}
						exit={H1P1L.exit}
						whileInView="animate"
						viewport={{
							once: true,
						}}
						className="list-none"
					>
						<Link to="https://onehealthng.com/terms" target="_blank">
							Terms & Conditions
						</Link>
					</motion.li>
				</ul>
				<div className="text-nowrap">&copy; 2024withOneHealth</div>
			</div>
		</motion.div>
	);
}
