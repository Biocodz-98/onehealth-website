import {motion} from "framer-motion"
import { FaWhatsapp } from "react-icons/fa";
import { Header, _Header } from "@/animate.data";
import { Icons } from "./Icons";
import OneLink from "./Link";
import { GuideCardData, ContactGuideInfoData } from "@/data/generalData";
import GuidesCard from "./cards/GuidesCard";
import ContactGuideMini from "@/components/ContactGuideMini";

export default function Callus() {
  return (
		<div className="overflow-y-scroll h-full">
			<div className="relative  overflow-y-scroll h-[90%] pb-20 md:p-10">
				<div className=" relative min-h-60 h-fit bg-[#E9FFEB] rounded-3xl overflow-hidden">
					<div className="w-full h-full  overflow-hidden absolute ">
						<div className="searchbgleft bg-[#D8F7DB]  w-full h-full absolute  z-0"></div>
						<div className="searchbgright bg-[#DEF7E1] w-full h-full absolute  z-0"></div>
					</div>
					<motion.div
						variants={Header}
						animate="animate"
						initial="initial"
						transition={{ duration: 0.65, delay: 0.3 }}
						exit={Header.exit}
						whileInView="animate"
						viewport={{
							once: true,
						}}
						className="flex flex-col relative z-10 p-5 "
					>
						<div className="guide-cards flex flex-nowrap relative w-fit">
							{GuideCardData.map((item, index) => (
								<GuidesCard
									key={index}
									image={item.image}
									index={index}
									imgCls="w-[70%] md:w-full"
									cls={`${
										index == 0
											? ""
											: index == 1
											? "md:right-3  right-9"
											: "md:right-6 right-[4.4rem]"
									}`}
								/>
							))}
						</div>
						<div className="writer-guide my-4 ">
							<h1 className="font-head font-semibold text-[1rem] md:text-2xl leading-9 text-[#8DDE44]">
								Have Enquiries?{" "}
							</h1>
							<h1 className="font-head font-semibold text-[1rem] md:text-2xl  md:pr-0 w-full text-wrap leading-9 text-secondary">
								Speak with our in-house pharmacy support team
							</h1>
						</div>
					</motion.div>
				</div>
				<div className="flex flex-wrap justify-between items-center md:px-0">
					<motion.div
						variants={_Header}
						animate="animate"
						initial="initial"
						transition={{ duration: 0.65, delay: 0.3 }}
						exit={_Header.exit}
						whileInView="animate"
						viewport={{
							once: true,
						}}
						className={
							"writer-guide my-4 flex w-full flex-col md:flex-row justify-between gap-4"
						}
					>
						<div className="flex flex-col flex-wrap gap-5 md:gap-10 items-start mt-6 my-3">
							{ContactGuideInfoData.map((item, index) => (
								<ContactGuideMini
									title={item.title}
									Icon={item.Icon}
									key={index}
									titleCls="text-wrap text-sm md:text-lg "
									cls=""
								/>
							))}
						</div>
						<div className="flex flex-col gap-4 place-content-end ">
							<OneLink
								index={0}
								action="Call us now"
								hasLeadingImage={<Icons.call strokec="#004449" />}
								to="tel:+2348179017319"
								target="_blank"
								actionCls="text-[#004449]"
								linkCls="items-center max-w-[75%] md:max-w-full w-full bg-[#8DDE44] border-[#8DDE44]"
							/>
							<OneLink
								index={1}
								action="Chat on WhatsApp"
								hasLeadingImage={
									<FaWhatsapp className="text-2xl text-[#8DDE44]" />
								}
								to="https://wa.me/+2348179017319"
								target="_blank"
								linkCls="items-center max-w-[75%] w-full md:max-w-full text-nowrap"
							/>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
