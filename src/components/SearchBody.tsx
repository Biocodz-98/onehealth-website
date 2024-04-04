import React,{SetStateAction} from 'react';
import { FaWhatsapp } from "react-icons/fa";
import Search from "./search/Search";
import SearchItems from "./search/SearchItems";
import { Result,errorType } from '@/hooks/useSearch';
import Trending from "./Trending";
import HeroCard from "./cards/HeroCard";
import OneLink from "./Link";
import { SpillDrugContainer } from "@/data/imageData";
import {
	TrendingData,
	PopularOnOneHealthData,
	QuickActionsData,
} from "./search/data";

export default function SearchBody({
	searchQuery,
	setSearchQuery,
	searchResult,
	setSearchResult,
    setShowResourceMobile,
	loading,
	error,
}: {
	searchQuery: string;
	setSearchQuery: React.Dispatch<SetStateAction<string>>;
	setSearchResult: React.Dispatch<SetStateAction<Result[]>>;
	setShowResourceMobile: React.Dispatch<SetStateAction<boolean>>;
	loading: boolean;
	error: errorType;
	searchResult: Result[];
}) {
	return (
		<div className=" relative h-full overflow-y-scroll">
			<Search
				hasSearchButton={true}
				setQuery={setSearchQuery}
				query={searchQuery}
				clsInput="md:w-full md:h-16 h-12"
				setSearchResult={setSearchResult}
			/>

			<div className="py-3 flex w-full"></div>
			{loading && (
				<div className="mx-auto text-center self-center text-xl w-full ">
					Loading products ...
				</div>
			)}
			{Object.keys(error).length > 0 && (
				<div className="mx-auto text-center self-center text-xl text-red-500 w-full">
					Something went wrong, try again ...
				</div>
			)}
			{!loading &&
				searchResult.length === 0 &&
				Boolean(searchQuery) != false && (
					<div className="mx-auto text-center self-center text-xl text-red-500  w-full flex min-w-[80%]">
						No Product Found!
					</div>
				)}
			{searchResult.length === 0 && (
				<>
					<div className="space-y-2">
						<h2 className="font-head font-semibold text-xl">
							Trending searches
						</h2>
						<div className="flex flex-wrap items-center gap-2.5">
							{TrendingData.map((item, index) => (
								<Trending key={index} title={item} setQuery={setSearchQuery} />
							))}
						</div>
					</div>
					<div className="space-y-2 mt-10">
						<h2 className="font-head font-semibold md:text-xl">
							Popular on OneHealth
						</h2>
						<div className="flex overflow-x-auto space-x-2 md:space-x-5 py-5 w-[80vw] mx-auto">
							{PopularOnOneHealthData.map((item, index) => (
								<HeroCard
									key={index}
									title={item.title}
									action={item.action}
									imagesrc={item.Image!}
									className="flex flex-col space-y-1 px-2 rounded-2xl min-w-44"
									imageCls="md:w-full ml-4 md:ml-0 order-1"
									titleCls="text-[0.6rem] md:text-sm"
									actionCls="text-[0.8rem] md:text-sm"
								/>
							))}
						</div>
					</div>
					<div className="max-h-14 w-[80%] h-12 flex items-center rounded-3xl overflow-hidden  relative mt-10  mx-auto md:hidden">
						<div className="w-full h-full  overflow-hidden absolute z-10 bg-[#E9FFEB] cursor-pointer">
							<div className="searchbgleft bg-[#D8F7DB]  w-full h-full absolute  z-0"></div>
							<div className="searchbgright bg-[#DEF7E1] w-full h-full absolute  z-0"></div>
						</div>
						<OneLink
							linkCls="relative z-10 w-full border-transparent h-full items-center"
							index={0}
							to="#resources"
							action="Resources"
							actionCls="text-[#0E3528] font-semibold"
							setIsResources={setShowResourceMobile}
						/>
					</div>
					<div className="space-y-2 md:space-x-2 mt-10 flex flex-col mb-16">
						<h2 className="font-head font-semibold text-xl">Quick Actions</h2>
						<div className="flex flex-col ">
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
						</div>
					</div>
				</>
			)}
			{searchResult.length > 0 && (
				<div className=" overflow-y-scroll h-full">
					<div className="numsearch mb-5">
						<p className="font-semibold text-xl md:text-2xl font-body">
							{searchResult.length} result for &quot;{searchQuery}&quot;
						</p>
					</div>

					{searchResult.map((item, index) => (
						<SearchItems
							key={index}
							// image={item.image}
							url={item.url ?? "#"}
							name={item.name}
						/>
					))}
					<div className="mt-8 relative min-h-44 h-fit bg-[#E9FFEB] rounded-3xl overflow-hidden mb-[45%] md:mb-[30%]">
						<div className="w-full h-full  overflow-hidden absolute ">
							<div className="searchbgleft bg-[#D8F7DB]  w-full h-full absolute  z-0"></div>
							<div className="searchbgright bg-[#DEF7E1] w-full h-full absolute  z-0"></div>
						</div>

						<div className="content w-full h-full flex flex-col items-center relative z-10 p-4  md:p-5 space-y-4">
							<h4 className="font-head font-semibold">
								Don’t see what you’re looking for
							</h4>
							<img
								src={SpillDrugContainer}
								alt="Image of searched onehealth pills"
								className="md:w-32 w-24"
							/>
							<p className="font-body">
								Chat a pharmacist on WhatsApp to get product recommendation
							</p>
							<OneLink
								index={1}
								target="_blank"
								to={"https://wa.me/+2348179017319"}
								action="Chat on WhatsApp"
								hasLeadingImage={
									<FaWhatsapp className="text-green-500 text-[1rem]" />
								}
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
