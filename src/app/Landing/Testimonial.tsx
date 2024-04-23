import {useRef,useEffect} from 'react';
import {
	TestimonialCardData,
	GuideCardData,
	ContactGuideInfoData,
	TestimonialSholaData,
} from "@/data/generalData";
import {TestimonialB, TestimonialBMobile, TestimonialDoc} from "@/data/imageData"
import MaxWithWrapper from '../../components/MaxWithWrapper';
import TestimonialCard from '../../components/cards/TestimonialCard';
import { motion, useInView, useAnimation } from "framer-motion";
import { H1P1L,H1P1R, Header } from "@/animate.data";
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

const Refills = ({title,body,index}:{title:string,body:string, index:number})=>{
	return (
		<div className="flex border-b-2 border-slate-200/50 md:py-3 py-1">
			<div className="font-body text-xl md:text-3xl  font-semibold leading-16 border-r-2 border-slate-200/50 md:w-16 w-6 md:px-5 px-1 items-center flex">
				{index}
			</div>
			<div className="md:px-5 pl-2">
				<h1 className="font-body md:text-xl text-[0.7rem] font-semibold md:leading-9 leading-5">
					{title}
				</h1>
				<p className="font-body md:text-base text-[0.64rem] font-semibold md:leading-9 leading-5">
					{body}
				</p>
			</div>
		</div>
	);
}
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
		<section ref={tRef} className="md:mt-32 mt-20 flex flex-col ">
			<motion.div
				variants={Header}
				animate={smController}
				initial="initial"
				transition={{ duration: 0.65, delay: 0.3 }}
				exit={Header.exit}
				className="relative w-full md:min-h-[115vh] min-h-[100vh] md:h-[100vh] h-[115vh] p-0 overflow-y-hidden "
			>
				<img
					loading="lazy"
					// srcSet={`${TestimonialBMobile} 320w, ${TestimonialBMobile}  768w, ${TestimonialB}  1200w`}
					// sizes="(max-width: 320px) 280px, (max-width: 768px) 720px, 1000px"
					src={TestimonialB}
					alt="Testimonial image featuring Shola from Yaba, 29, expressing satisfaction with OneHealth online pharmacy in Nigeria, emphasizing worry-free medication management and quick delivery"
					className="absolute z-0 h-full w-full object-cover hidden md:flex "
				/>
				<img
					loading="lazy"
					// srcSet={`${TestimonialBMobile} 320w, ${TestimonialBMobile}  768w, ${TestimonialB}  1200w`}
					// sizes="(max-width: 320px) 280px, (max-width: 768px) 720px, 1000px"
					src={TestimonialBMobile}
					alt="Testimonial image featuring Shola from Yaba, 29, expressing satisfaction with OneHealth online pharmacy in Nigeria, emphasizing worry-free medication management and quick delivery"
					className="absolute z-0 h-full w-full object-cover md:hidden "
				/>
				<div className="relative text-white flex flex-col md:flex-row h-full  md:gap-0 gap-10 justify-between md:py-8 pt-5 pb-2 ">
					<div className="w-full md:pt-10 md:px-20 px-4 md:space-y-9 space-y-5">
						<h1 className="font-head font-semibold text-4xl md:text-6xl text-white md:leading-16">
							I never have to worry about my medications
						</h1>
						<p className="md:text-2xl text-lg font-body">
							Shola, Yaba 29 years old.
						</p>
					</div>
					<div className=" w-[90%] mx-auto md:w-full flex gap-3 self-end bg-red">
						<div className="md:w-32 w-16 relative md:h-36 h-20 md:rounded-[3rem]  rounded-[.7rem] overflow-hidden ">
							<img
								loading="lazy"
								className="h-full w-full scale-110 object-cover"
								src={TestimonialDoc}
								alt="Testimonial image featuring Shola from Yaba, 29, expressing satisfaction with OneHealth online pharmacy in Nigeria, emphasizing worry-free medication management and quick delivery"
							/>
						</div>
						<div className="flex flex-col gap-3">
							<div className="md:space-y-1 space-y-0.5">
								<p className="bg-[#1D1D1F]/60 md:px-2 md:py-1 px-0.5 py-0.5 w-fit md:text-base text-[0.6rem]">
									Shola, your medications are ready for pickup.
								</p>
								<p className="bg-[#1D1D1F]/60 md:px-2 md:py-1 px-0.5 py-0.5 w-fit md:text-base text-[0.6rem]">
									I have set an auto-refill after the next 7 days
								</p>
								<p className="bg-[#1D1D1F]/60 md:px-2 md:py-1 px-0.5 py-0.5 w-fit md:text-base text-[0.6rem]">
									You save 16,000 Naira on this order covered by your HMO
								</p>
								<p className="bg-[#1D1D1F]/60 md:px-2 md:py-1 px-0.5 py-0.5 w-fit md:text-base text-[0.6rem]">
									For side effects & other questions, Send a DM
								</p>
							</div>

							<div className="bg-[#1D1D1F]/75 md:p-5 p-2 rounded-3xl md:pt-7">
								{TestimonialSholaData.map((item, index) => (
									<Refills
										key={index}
										title={item.title}
										body={item.body}
										index={index + 1}
									/>
								))}
								<div className="flex w-full justify-between px-2 md:px-5 items-center py-2">
									<div className="flex font-semibold font-body gap-2">
										<span className="text-xl md:text-3xl">4</span>
										<p className="flex flex-col text-[0.6rem] md:text-xs">
											<span>REFILLS</span>
											<span>LEFT</span>
										</p>
									</div>
									<span className="md:px-3 md:py-2 py-1 px-1.5 bg-slate-200 text-[#036B26] font-medium text-xs md:text-sm rounded-full">
										SUCCESS
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</motion.div>
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
					className="pb-20 border-b border-slate-200"
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
								className="px-3 py-2 text-slate-600 font-sans text-sm leading-5 bg-slate-200 rounded-full w-fit relative z-10 font-semibold"
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
							className="font-head font-semibold md:text-4xl text-[1.9rem] text-secondary leading-[43px] md:leading-[64px] mt-7 text-center"
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
							modules={[Pagination, Autoplay]}
							slidesPerView="auto"
							breakpoints={{
								320: {
									slidesPerView: 2,
									spaceBetween: 4,
								},
								639: {
									slidesPerView: 2,
									spaceBetween: 2,
								},
								865: {
									slidesPerView: 3,
									spaceBetween: 4,
								},
								1025: {
									slidesPerView: 4,
								},
								1225: {
									slidesPerView: 5,
								},
							}}
							loop={true}
							autoplay={{
								delay: 2500,
								disableOnInteraction: false,
							}}
							pagination={{ clickable: true }}
							className="mySwiper"
						>
							{TestimonialCardData.map((item, index) => (
								<SwiperSlide key={index}>
									<TestimonialCard
										image={item.image}
										link={item.link}
										title={item.title}
										index={index}
										alt={item.alt}
										content={item.content}
										arialLabel={item.arialLabel}
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
