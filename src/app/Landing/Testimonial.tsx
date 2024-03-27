import React,{useRef,useEffect} from 'react';
import { TestimonialCardData, GuideCardData, ContactGuideInfoData} from "@/data/generalData";
import {TestimonialB} from "@/data/imageData"
import MaxWithWrapper from '../../components/MaxWithWrapper';
import TestimonialCard from '../../components/cards/TestimonialCard';
import { motion, useInView, useAnimation } from "framer-motion";
import { H1P1L,H1P1R, Header, Scale } from "@/animate.data";
import { Pagination,Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// import function to register Swiper custom elements
import { register } from "swiper/element/bundle";
// import GuidesCard from '@/components/cards/GuidesCard';
// import ContactGuideMini from '@/components/ContactGuideMini';
// import {Link} from 'react-router-dom';
// import { Icons } from '@/components/Icons';
import GuidianceContact from '@/components/GuidianceContact';

// register Swiper custom elements
register();


export default function Testimonial() {
		const tRef = useRef(null);
		const smView = useInView(tRef, { once: true });
		const smController = useAnimation();
		const smController1 = useAnimation();

		useEffect(() => {
			if (smView) {
				smController.start("animate");
				smController1.start("animate");
			}
		}, [smView]);
  return (
		<section ref={tRef} className="mt-9 md:pt-32 flex flex-col">
			<motion.img
				variants={{ ...Header, ...Scale }}
				animate={smController}
				initial="initial"
				transition={{ duration: 0.65, delay: 0.3 }}
				exit={{ ...Header.exit, ...Scale.exit }}
				src={TestimonialB}
				alt="testimonial hero image"
			/>
			<MaxWithWrapper>
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
					className="pb-20 lg:px-20 border-b border-slate-200"
				>
					<div className="mt-28">
						<div className="flex flex-col items-center relative">
							<motion.p
								variants={H1P1L}
								animate={smController1}
								initial="initial"
								transition={{ duration: 0.65, delay: 0.3 }}
								exit={H1P1L.exit}
								whileInView="animate"
								viewport={{
									once: true,
								}}
								className="px-3 py-2 text-slate-600 font-sans text-sm leading-5 bg-slate-200 rounded-full w-fit relative z-10"
							>
								OUR PHARMACY
							</motion.p>
							<p className="w-full h-1 bg-slate-200 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-0"></p>
						</div>
						<motion.p
							variants={H1P1R}
							animate={smController1}
							initial="initial"
							transition={{ duration: 0.65, delay: 0.5 }}
							exit={H1P1L.exit}
							whileInView="animate"
							viewport={{
								once: true,
							}}
							className="font-head font-semibold md:text-4xl text-3xl text-secondary leading-[43px] md:leading-[64px] mt-7 text-center"
						>
							Better care for all health categories
						</motion.p>
					</div>
					<motion.div
						variants={Header}
						animate={smController1}
						initial="initial"
						transition={{ duration: 0.65, delay: 0.4 }}
						exit={Header.exit}
						whileInView="animate"
						viewport={{
							once: true,
						}}
						className="testimonial flex mt-10 max-w-screen w-[98.6vw] md:w-full overflow-auto py-5 relative"
					>
						<Swiper
							// install Swiper modules
							modules={[Pagination,  Autoplay]}
							slidesPerView="auto"
							breakpoints={{
								320: {
									slidesPerView: 2,
									spaceBetween :4
								},
								639: {
									slidesPerView: 2,
									spaceBetween :2,
								},
								865: {
									slidesPerView: 3,
									spaceBetween : 4,
								},
								1025: {
									slidesPerView: 4,
								},
								1225: {
									slidesPerView: 5,
								},
							}}
							// slidesPerView={1}
							loop={true}
							// centeredSlides={true} 							centeredSlidesBounds={true}
							autoplay={{
								delay: 2500,
								disableOnInteraction: false,
							}}
							pagination={{ clickable: true }}
							// onSwiper={(swiper) => console.log(swiper)}
							// onSlideChange={() => console.log("slide change")}
							className="mySwiper"
						>
							{TestimonialCardData.map((item, index) => (
								<SwiperSlide key={index}>
									<TestimonialCard
										image={item.image}
										link={item.link}
										title={item.title}
										index={index}
										// key={index}
									/>
								</SwiperSlide>
							))}
						</Swiper>
					</motion.div>

					{/* 
					<div className="flex gap-3 mt-10 justify-center w-full mb-10">
						{TestimonialCardData.map((item, index) => (
							<p
								className={`h-1 w-16 rounded-3xl ${
									index == 0 ? "bg-[#8DDE44]" : "bg-[#8DDE44]/15"
								}`}
								key={index}
							/>
						))}
					</div> */}
					<GuidianceContact
						headingText1="Need medical guidance? "
						headingText2="Speak with our in-house care team"
						guidesCard={GuideCardData}
						contactGuideMini={ContactGuideInfoData}
					/>
					{/* <div className="flex justify-between mt-16 items-center">
						<div className="guide-cards flex relative w-fit">
							{GuideCardData.map((item, index) => (
								<GuidesCard key={index} image={item.image} index={index} />
							))}
						</div>
						<div className="writer-guide">
							<h1 className="font-head font-semibold text-4xl leading-9 text-secondary">
								Need medical guidance?
							</h1>
							<h1 className="font-head font-semibold text-4xl leading-9 text-secondary">
								Speak with our in-house care team
							</h1>
							<div className="flex gap-7 items-center mt-6">
								{ContactGuideInfoData.map((item, index) => (
									<ContactGuideMini
										title={item.title}
										Icon={item.Icon}
										key={index}
									/>
								))}
							</div>
						</div>
						<Link
							to={"#"}
							className="px-8 py-3 bg-[#8DDE44] text-wrap flex w-fit gap-3 rounded-3xl text-#004449 font-sans font-semibold leading-5"
						>
							<span>Call us now</span>
							<Icons.rightArrow strokec="#004449" />
						</Link>
					</div> */}
				</motion.div>
			</MaxWithWrapper>
		</section>
	);
}
