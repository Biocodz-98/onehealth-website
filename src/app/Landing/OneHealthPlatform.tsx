"use client"
import { useRef, useEffect } from "react";
import MaxWithWrapper from '../../components/MaxWithWrapper'
import { PlatformCardData } from './data';
import PlatformCard from '../../components/cards/PlatformCard';
// import { Navigation, Pagination, Scrollbar, A11y,Autoplay } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import function to register Swiper custom elements
// import { register} from 'swiper/element/bundle';

import { motion, useInView, useAnimation } from "framer-motion";
import { Header, H1P1L,H1P1R,Scale } from "@/animate.data";
// // register Swiper custom elements
// register();

export default function OneHealthPlatform() {
    //   const swiperElRef = useRef<HTMLDivElement>(null); 
    //   const paginationRef = useRef(null);

//   useEffect(() => {
//     // listen for Swiper events using addEventListener
//     swiperElRef?.current?.addEventListener('swiperprogress', (e:any) => {
//       const [swiper, progress] = e.detail;
//       console.log(progress);
//     });

//     swiperElRef?.current?.addEventListener('swiperslidechange', (e) => {
//       console.log('slide changed');
//     });
//   }, []);
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
						className="px-4 py-2 bg-[#F0F2F5] rounded-[40px] w-fit"
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
						className="text-secondary md:leading-[72px] font-semibold font-head text-center md:text-5xl text-[2.23rem] leading-[52px]"
					>
						Our products powering positive health experience
					</motion.h1>
				</div>

				{/* <Swiper
					// install Swiper modules
					modules={[Pagination, A11y, Autoplay]}
					spaceBetween={4}
					breakpoints={{
						639: {
							slidesPerView: 2,
						},
						// 865: {
						// 	slidesPerView: 4,
						// },
					}}
					slidesPerView={2}
					autoplay={{
						delay: 2500,
						disableOnInteraction: false,
					}}
					pagination={{ clickable: true }}
					onSwiper={(swiper) => console.log(swiper)}
					onSlideChange={() => console.log("slide change")}
					className="mySwiper"
				>
							<SwiperSlide >
                                </SwiperSlide>
                                </Swiper> */}
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
