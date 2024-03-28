import React,{ SetStateAction } from 'react'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Resource } from '@/data/imageData';
import { ResourceNav } from '@/animate.data';
import { ResourceData } from './data';
import { ComplaintItem } from "@/app/Insurers/Compliant";

export default function ResourcePage({isHovered,setIsHovered}:{isHovered:boolean,setIsHovered:React.Dispatch<SetStateAction<boolean>>}) {
  return (
		<motion.div
			animate="animate"
			initial="initial"
			variants={ResourceNav}
			exit={ResourceNav.exit}
			whileInView="animate"
			transition={{ duration: 0.65, delay: 0.1, ease: "backOut" }}
			viewport={{
				once: true,
			}}
			className={`${
				isHovered ? "flex" : "hidden"
			}  md:flex-row flex-col gap-13 lg:left-[10%] md:w-[90%] lg:w-[80%] w-full absolute bg-white justify-between p-10 `}
			onMouseEnter={() => {
				setIsHovered?.(true);
			}}
			onMouseLeave={() => {
				setIsHovered?.(false);
			}}
		>
			<div className="first flex gap-7 md:w-[46%] items-center ">
				<img
					src={Resource}
					alt="One health laboratory drug test image, how unilever affects drug prices"
				/>
				<div className="gap-10 flex flex-col">
					<h2 className="text-3xl font-semibold font-head">
						How exodus of PG & Unilever affects drug prices
					</h2>
					<Link
						to={"#"}
						target="_blank"
						className="text-[#1C7A37] font-semibold font-body"
					>
						Read Article
					</Link>
				</div>
			</div>
			<div className="last flex flex-col gap-3 pt-10 md:pt-0">
				{ResourceData.map((item, index) => (
					<Link key={index} to={item.link} target="_blank">
						<ComplaintItem
							key={index}
							title={item.title}
							desc={item.desc}
							image={item.image}
							imageCls="w-12 py-2"
							comCls="w-full items-start"
							textCls="space-y-1"
						/>
					</Link>
				))}
			</div>
		</motion.div>
	);
}
