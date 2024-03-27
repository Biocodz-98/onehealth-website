// import {Link} from 'react-router-dom';
import React from 'react'
// import { Icons } from '../Icons';
import { cn } from '@/lib/utils';
import OneLink from '../Link';

interface PlatformCardProps {
	image1: string;
	image2: string;
	heading: string;
	description: string;
	action: string;
	href?: string;
	cls?: string;
	desCls?: string;
	headCls?: string;
	linkCls?: string;
	arrowCls?: string;
	strokec?: string;
	bgColorSec?: string;
    bgColor?: string;
    index?: number;
}

export default function PlatformCard({
	image1,
	image2,
	heading,
	description,
	action,
	cls,
	desCls,
	headCls,
	linkCls,
	strokec,
	href,
	// bgColorSec,
	arrowCls,
    // bgColor,
    index
}: PlatformCardProps) {
    strokec = index == 0 ? "#ffff" : "#228821";
	return (
		<div
			className={cn(
				`${
					index == 0 ? "bg-[#228821] " : "bg-[#EAFBDA]"
				}  flex flex-col max-w-96 w-full relative h-fit  z-0 rounded-3xl overflow-hidden `,
				cls
			)}
		>
			<div
				className={`${
					index == 0 ? "bg-[#379A44] " : "bg-[#61AC1A]/15 "
				} absolute backg clip-platform-right w-full h-full z-0`}
			></div>
			<div
				className={`${
					index == 0 ? "bg-[#379A44] " : "bg-[#61AC1A]/15 "
				}  absolute backg clip-platform-left w-full h-full`}
			></div>
			<div
				className={`content flex flex-col gap-4 !text-${
					index == 0 ? "white" : "inherit"
				}  z-10 p-6 w-full h-full`}
			>
				<div className=" bg-secondary w-12 h-12 rounded-lg flex items-center justify-center ">
					<img src={image1} alt="platform header image" />
				</div>
				<h1
					className={cn(
						`text-${
							index == 0 ? "white" : "secondary"
						} font-bold text-3xl font-head leading-8`,
						headCls
					)}
				>
					{heading}
				</h1>
				<p
					className={cn(
						`text-${
							index == 0 ? "white" : "secondary-foreground"
						} text-lg leading-5`,
						desCls
					)}
				>
					{description}
				</p>
				{/* <Link
					to={"#"}
					className={cn(
						`border-${index == 0 ? "white" : "secondary"} text-${
							index == 0 ? "white" : "secondary"
						}
                         font-sans font-semibold text-xs leading-5 py-2 px-4 flex justify-between w-fit gap-3 border-2 rounded-full`,
						linkCls
					)}
				>
					<span>{action}</span>{" "}
					<Icons.rightArrow className={cn("", arrowCls)} strokec={strokec} />
				</Link> */}
				<OneLink
					to={href??"#"}
					index={index!}
					linkCls={linkCls}
					action={action}
					arrowCls={arrowCls}
					strokec={strokec}
				/>
			</div>
			<div className={`border-4 ${index==0?"border-slate-200/15":"border-slate-900/15"} absolute z-0 h-[260px] w-[450px] rounded-tl-lg left-20 bottom-2`}></div>
			<div className="border-4 border-black relative h-[260px] w-[450px] rounded-tl-lg overflow-hidden z-20 -bottom-2 left-7">
				<img
					src={image2}
					alt="platform header image"
					className="relative object-cover pl-6 w-full h-full absolute] -left-7 top-0"
				/>
			</div>
		</div>
	);
}
