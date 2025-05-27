import  { useRef, useEffect } from "react";
import { Icons } from '../Icons';
import { PlatformData, ProductData, ResourceData, Socials } from './data';
import {Link} from 'react-router-dom';
import { motion,useAnimation,useInView } from "framer-motion";
import { Header, H1P1L, H1P1R, Scale, Footer } from "@/animate.data";

export default function FooterLinks() {
	const productRef = useRef(null);
	const platformRef = useRef(null);
	const resourceRef = useRef(null);
	const addressRef = useRef(null);

	const productView = useInView(productRef, { once: true });
	const plaformView = useInView(platformRef, { once: true });
	const resourceView = useInView(resourceRef, { once: true });
	const addressView = useInView(addressRef, { once: true });
	const productController = useAnimation();
	const platformController = useAnimation();
	const resourceController = useAnimation();
	const addressController = useAnimation();

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
				if (addressView) {
					addressController.start("animate");
				}
			}, [productView, plaformView, resourceView, addressController]);
  return (
		<motion.div
			variants={Header}
			animate="animate"
			initial="initial"
			transition={{ duration: 0.65, delay: 0.5, ease: "backOut" }}
			exit={Header.exit}
			className="col-span-8 bg-slate-100/75 w-[95vw] md:max-w-screen-2xl md:w-full md:rounded-[20px]"
		>
			<div className="flex md:flex-row flex-wrap gap-8  justify-between p-4 md:p-3 lg:p-8 text-[#3E3838] text-sm font-medium ">
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
					<motion.strong
						variants={H1P1L}
						animate="animate"
						initial="initial"
						transition={{ duration: 0.65, delay: 0.5, ease: "backOut" }}
						exit={H1P1L.exit}
						whileInView="animate"
						viewport={{
							once: true,
						}}
						className="text-[#3E3838]/75 relative top-2 font-semibold"
					>
						Product
					</motion.strong>
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
								<Link
									to={item.link}
									target={item.target}
									aria-label={item.arialLabel}
									content={item.content}
								>
									{item.title}
								</Link>
							</motion.li>
						))}
					</ul>
				</motion.div>
				<motion.div ref={platformRef}>
					<motion.strong
						variants={H1P1L}
						animate="animate"
						initial="initial"
						transition={{ duration: 0.65, delay: 0.55, ease: "backOut" }}
						exit={H1P1L.exit}
						whileInView="animate"
						viewport={{
							once: true,
						}}
						className="text-[#3E3838]/75 relative top-2 font-semibold"
					>
						Platform
					</motion.strong>
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
								<Link
									to={item.link}
									target="_blank"
									content="Link opens in a different tab"
								>
									{item.title}
								</Link>
							</motion.li>
						))}
					</ul>
				</motion.div>
				<motion.div ref={resourceRef}>
					<motion.strong
						variants={H1P1L}
						animate="animate"
						initial="initial"
						transition={{ duration: 0.65, delay: 0.6, ease: "backOut" }}
						exit={H1P1L.exit}
						whileInView="animate"
						viewport={{
							once: true,
						}}
						className="text-[#3E3838]/75 relative top-2 font-semibold"
					>
						Resources
					</motion.strong>
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
								<Link
									to={item.link}
									target="_blank"
									content="Link opens in a different tab"
								>
									{item.title}
								</Link>
								{Boolean(item.tag) && (
									<span className="relative ml-2 px-2 py-1 rounded-sm bg-[#B1FFB8] text-wrap w-fit text-secondary font-sans font-bold text-[0.55rem]">
										{item.tag}
									</span>
								)}
							</motion.li>
						))}
						<li className="socials flex flex-wrap max-w-[17rem] gap-2 mt-6">
							{Socials.map((item, index) => (
								<Link
									key={index}
									to={item.link}
									className="p-2 rounded-full bg-black"
									target="_blank"
									content={item.content}
									aria-label={item.ariaLabel}
									rel="noopener noreferrer"
								>
									{" "}
									{item.icon}
								</Link>
							))}
						</li>
					</ul>
				</motion.div>
				<div>
					<motion.div ref={addressRef}>
						<motion.strong
							variants={H1P1L}
							animate="animate"
							initial="initial"
							transition={{ duration: 0.65, delay: 0.6, ease: "backOut" }}
							exit={H1P1L.exit}
							whileInView="animate"
							viewport={{
								once: true,
							}}
							className="text-[#3E3838]/75 relative top-2 font-semibold"
						>
							Pharmacy Address
						</motion.strong>

						<div className='py-6'>

							<motion.p
								variants={Footer}
								animate={resourceController}
								initial="initial"
								transition={{ duration: 0.65, delay: 0.55, ease: "backOut" }}
								exit={Footer.exit}
								whileInView="animate"
								viewport={{
									once: true,
								}}
								className="flex relative items-center list-none md:w-full w-fit"
							>
								<p>
									Block 6, Suite 3,
									<br/> Elegushi Modern
									<br/> Plaza Jakande (4th)
									<br/>Roundabout, Lekki-Epe
									<br/>Expressway,
									<br/>Lekki, Lagos
								</p>
							</motion.p>

						</div>

					</motion.div>
					<motion.div ref={addressRef}>
						<motion.strong
							variants={H1P1L}
							animate="animate"
							initial="initial"
							transition={{ duration: 0.65, delay: 0.6, ease: "backOut" }}
							exit={H1P1L.exit}
							whileInView="animate"
							viewport={{
								once: true,
							}}
							className="text-[#3E3838]/75 relative top-2 font-semibold"
						>
							Office Address
						</motion.strong>

						<div className='py-6'>

							<motion.p
								variants={Footer}
								animate={resourceController}
								initial="initial"
								transition={{ duration: 0.65, delay: 0.55, ease: "backOut" }}
								exit={Footer.exit}
								whileInView="animate"
								viewport={{
									once: true,
								}}
								className="flex relative items-center list-none md:w-full w-fit"
							>
								<p>
									56 Opebi, Ikeja, Lagos
								</p>
							</motion.p>

						</div>

					</motion.div>

				</div>
				<div className="-order-1 md:order-last ">
					<Link
						to={"/"}
						content="Links to the same page"
						aria-label="Link to home page of Onehealthng"
					>
						<Icons.logo />
					</Link>
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
						<Link
							to="https://onehealthng.com/privacy-policy"
							target="_blank"
							content="Links to a different page"
							aria-label="Link to Privacy Policy of Onehealthng"
						>
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
						<Link
							to="https://onehealthng.com/terms"
							target="_blank"
							content="Links to a different page"
							aria-label="Link to Terms and Conditions of Onehealthng"
						>
							Terms & Conditions
						</Link>
					</motion.li>
				</ul>
				<div className="text-nowrap">&copy; 2025 with OneHealth</div>
			</div>
		</motion.div>
	);
}
