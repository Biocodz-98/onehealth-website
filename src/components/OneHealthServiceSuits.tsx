import React from 'react'
import CareCard, { CareCardProps } from './cards/CareCard';
import SectionHeader from './SectionHeader';
import { cn } from '@/lib/utils';

export interface OneHealthServiceSuitsProps {
	tag: string;
	headingText: string;
	subHeadingText: string;
	containsNoStyles: boolean;
	noStyleHeading?: string;
	noStyleImage?: string;
	noStyleImageAlt?: string;
	noStyleContentText?: string;
	serviceCollections: CareCardProps[];
	children?: React.ReactNode;
	sectionCls?: string;
	sectionHeaderCls?: string;
}
export default function  OneHealthServiceSuits(props: OneHealthServiceSuitsProps) {
	return (
		<section
			className={cn(
				"flex items-center flex-col pt-16 my-3 pb-24 md:pb-36 md:pt-32",
				props.sectionCls
			)}
		>
			{/* <div className="text flex flex-col items-center w-[70vw] gap-2 mb-4">
				<p className="font-sans bg-[#F0F2F5] font-semibold text-sm leading-5 text-slate-600 w-fit p-2 px-4 rounded-full">
					{props.tag}
				</p>
				<h1 className="font-semibold font-head text-5xl leading-[72px] text-center text-secondary mt-3 w-full">
					{props.headingText}
				</h1>
				<p className="font-normal text-xl leading-7 w-3/4 text-center text-secondary-foreground">
					{props.subHeadingText}
				</p>
			</div> */}
			<SectionHeader
				tag={props.tag}
				headingText={props.headingText}
				subHeadingText={props.subHeadingText}
				className={props.sectionHeaderCls}
			/>
			<div className="cards mt-14 flex flex-wrap px-2 md:flex-row flex-col gap-8 place-content-center lg:place-content-start">
				{props.containsNoStyles && (
					<div className="item-1 w-[20.5rem] mx-4 md:mx-0">
						<div className="h-18 w-fit p-3 bg-[#F1FFE4] rounded-full">
							<img src={props.noStyleImage} alt={props.noStyleImageAlt} />
						</div>
						<h1 className="font-head font-bold text-4xl leading-10 text-start mt-5">
							{props.noStyleHeading}
						</h1>
						<p className="text-slate-600 text-xl leading-7 text-start mt-4">
							{props.noStyleContentText}
						</p>
					</div>
				)}
				{props.serviceCollections.map((item, index) => (
					<CareCard
						title={item.title}
						action={item.action}
						heading={item.heading}
						description={item.description}
						href={item.href}
						bgColor={item.bgColor}
						image={item.image}
						showBackground={true}
						key={index}
						index={index}
						cls="md:w-[400px] grow"
						arrLength={props.serviceCollections.length}
						imageWidth={150}
						alt={item.alt}
					/>
				))}
			</div>
			{/* <div className="overflow-hidden relative h-[510px]  w-[83vw] bg-[#117754] rounded-[45px] mt-10 mx-auto">
				<div className="leftbg w-full h-full clip-right bg-[#114920]/75 absolute z-0"></div>
				<div className="rightbg w-full h-full bg-[#114920]/75 clip-left absolute z-0"></div>
				<div className="relative z-10 flex p-5 gap-20 bg-cover items-center">
					<CareCard
						title="FOR INDIVIDUALS & EMPLOYERS"
						heading="Affordable health cover for individuals & business"
						description="Health coverage, medication management  and adherence support."
						image={OneWellness}
						action="Learn more"
						showBackground={false}
						headCls="-mt-16 text-white"
						desCls="text-white"
						linkCls="border-white text-white"
						arrowCls="text-white"
						contextcls="gap-7"
						strokec={"#ffffff"}
					/>
					<img
						src={CareImage}
						alt="care contact image"
						className="object-contain h-full relative -top-10 -right-5"
					/>
				</div>
			</div> */}
			{props.children}
		</section>
	);
}
