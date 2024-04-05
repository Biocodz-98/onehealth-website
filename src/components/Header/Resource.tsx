import React,{ SetStateAction } from 'react'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Resource } from '@/data/imageData';
import { ResourceNav } from '@/animate.data';
import { ResourceData } from './data';
import { ComplaintItem } from "@/app/Insurers/Compliant";
import { cn } from '@/lib/utils';
import OneLink from '../Link';

export default function ResourcePage({isHovered,setIsHovered,resCls}:{isHovered?:boolean,setIsHovered?:React.Dispatch<SetStateAction<boolean>>,resCls?:string}) {
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
			className={cn(
				`${
					isHovered ? "flex" : "hidden "
				}  md:flex-row flex-col gap-13 lg:left-[5%] md:w-[94%] lg:w-[90%] w-full absolute bg-white justify-between p-10 `,
				resCls
			)}
			onMouseEnter={() => {
				setIsHovered?.(true);
			}}
			onMouseLeave={() => {
				setIsHovered?.(false);
			}}
		>
			<div className="first flex md:flex-row flex-col gap-7 md:w-[60%] items-center ">
				<img
					src={Resource}
					alt="One health laboratory drug test image, how unilever affects drug prices"
				/>
				<div className="gap-10 flex flex-col ">
					<p className="w-fit p-10 rounded-lg py-2 bg-[#B1FFB8] text-[#10461F] font-bold text-sm">
						WHITE PAPER
					</p>
					<h2 className="md:text-2xl text-lg text-center md:text-start font-semibold font-head">
						Managing Medicine Shortages Due to Pharmaceutical Companies Exiting
						Nigeria
					</h2>
					<OneLink
						to={"https://onehealthng.com/guides/drug-shortages"}
						index={1}
						target="_blank"
						action="Get Access"
						linkCls="text-secondary font-semibold font-body"
					/>
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
