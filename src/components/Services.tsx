import React, { SetStateAction } from 'react'
import { motion } from "framer-motion";
import Search from "./search/Search";
import {
	PopularServicesData,
	QuickActionsData,
	EcosystemData,
} from "./search/data";
import { Result } from '@/hooks/useSearch';
import HeroCard from "./cards/HeroCard";
import SearchItems from "./search/SearchItems";
import { H1P1L, H1P1R, Header, _Header } from "@/animate.data";

export default function Services({
	searchQuery,
	setSearchQuery,
	setSearchResult,
}: {
	searchQuery: string;
	setSearchQuery: React.Dispatch<SetStateAction<string>>;
	setSearchResult: React.Dispatch<SetStateAction<Result[]>>;
}) {
	return (
		<div className="h-[90%] overflow-y-scroll pb-16">
			<div className="flex flex-col gap-5">
				<motion.p
					variants={Header}
					animate="animate"
					initial="initial"
					transition={{ duration: 0.65, delay: 0.2 }}
					exit={Header.exit}
					whileInView="animate"
					viewport={{
						once: true,
					}}
					className="font-body text-sm py-2"
				>
					We provide high-quality and reliable health services in your
					pocket—care whenever you need, for prevention or when sick.
				</motion.p>
				<Search
					hasSearchButton={true}
					setQuery={setSearchQuery}
					query={searchQuery}
					clsInput="md:w-full md:h-16 h-12"
					setSearchResult={setSearchResult}
				/>
			</div>
			<div className="divider md:hidden h-1 w-full bg-slate-200 mt-5"></div>
			<div className="space-y-2 mt-10">
				<motion.h2
					variants={Header}
					animate="animate"
					initial="initial"
					transition={{ duration: 0.65, delay: 0.25 }}
					exit={Header.exit}
					whileInView="animate"
					viewport={{
						once: true,
					}}
					className="font-head font-semibold md:text-xl"
				>
					Popular Services
				</motion.h2>
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
					className="flex overflow-x-auto space-x-3 md:space-x-5 py-5 w-[80vw] mx-auto"
				>
					{PopularServicesData.map((item, index) => (
						<HeroCard
							key={index}
							title={item.title}
							action={item.action}
							imagesrc={item.Image!}
							className="flex flex-col space-y-1 px-2 min-w-44 rounded-2xl"
							imageCls="md:w-full ml-4 md:ml-0 order-1"
							titleCls="text-[0.6rem] md:text-sm"
							actionCls="text-[0.8rem] md:text-sm"
						/>
					))}
				</motion.div>
				<div className="divider md:hidden h-1 w-full bg-slate-200 mt-16"></div>
				<div className="flex flex-col md:flex-row md:gap-5 ">
					<div className="space-y-2 md:space-x-2 mt-10 flex flex-col mb-16 w-full">
						<motion.h2
							variants={H1P1R}
							animate="animate"
							initial="initial"
							transition={{ duration: 0.65, delay: 0.25 }}
							exit={H1P1R.exit}
							whileInView="animate"
							viewport={{
								once: true,
							}}
							className="font-head font-semibold text-xl"
						>
							For Ecosystem Partners
						</motion.h2>
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
							className="flex flex-col w-full px-2 "
						>
							{EcosystemData.map((item, index) => (
								<HeroCard
									key={index}
									title={item.title}
									imagesrc={item.Image!}
									className=" w-full md:max-w-full md:max-h-fit grid md:grid "
									imageCls="mr-5 ml-2.5 md:ml-0 -order-1 md:-order-2 md:flex md:flex-row  md:col-span-6 md:row-span-12"
									action={item.action}
									titleGrp="md:-order-1"
									actionCls="order-2  text-xs md:text-sm"
								/>
							))}
						</motion.div>
					</div>
					<div className="divider md:hidden h-1 w-full bg-slate-200"></div>
					<div className="space-y-2 md:space-x-2 mt-10 flex flex-col mb-16 w-full">
						<motion.h2
							variants={H1P1L}
							animate="animate"
							initial="initial"
							transition={{ duration: 0.65, delay: 0.25 }}
							exit={H1P1L.exit}
							whileInView="animate"
							viewport={{
								once: true,
							}}
							className="font-head font-semibold text-xl"
						>
							Quick Actions
						</motion.h2>
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
							className="flex flex-col "
						>
							{QuickActionsData.map((item, index) => (
								<SearchItems
									url={item.action.href}
									key={index}
									title={item.title}
									name={item.action.name}
									image={item.Image!}
									cls="flex flex-col space-y-1 px-2"
									imageCls="mr-5"
									linkCls="py-5"
									midTitleCls="mr-auto"
								/>
							))}
						</motion.div>
					</div>
				</div>
			</div>
		</div>
	);
}
