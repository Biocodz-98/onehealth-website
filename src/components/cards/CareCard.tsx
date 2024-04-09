"use client"
// import Background from '../Background'
import {Link} from 'react-router-dom'
import { Icons } from '../Icons'
import { cn } from '@/lib/utils'
// import Background from '../Background'

export interface CareCardProps {
	title: string;
	image: string;
	action: string;
	heading: string;
	description: string;
	bgColor?: string;
	cls?: string;
	linkCls?: string;
	href?: string;
	desCls?: string;
	headCls?: string;
	contentCls?: string;
	paraCls?: string;
	arrowCls?: string;
	strokec?: string;
	contextcls?: string;
	extendClsLeft?: string;
	extendClsRight?: string;
	imgcls?: string;
	showBackground?: boolean;
	index?: number;
	arrLength?: number;
	imageWidth?: number;
	isDownloadable?: boolean;
	downloadActionAndriod?: string;
	downloadActionIOS?: string;
	hrefAndriod?: string;
	hrefIOS?: string;
	downloadableCls?: string;
	alt?: string;
}

export default function CareCard({
	title,
	image,
	action,
	heading,
	description,
	// bgColor,
	showBackground,
	cls,
	linkCls,
	desCls,
	headCls,
	contentCls,
	paraCls,
	arrowCls,
	strokec,
	contextcls,
	imgcls,
	imageWidth,
	index,
	arrLength,
	extendClsLeft,
	extendClsRight,
	href,
	isDownloadable,
	downloadActionAndriod,
	downloadActionIOS,
	hrefAndriod,
	hrefIOS,
	downloadableCls,
	alt
}: CareCardProps) {
	const colorIndex0 = index == 0 ? "bg-[#E9FFEB]" : "";
	const colorIndex1 = arrLength! > 2 && index == 1 ? "bg-[#E9FFEB]" : "";
	const colorIndex1Arr = arrLength! <= 2 && index == 1 ? "bg-[#F1FFE4]" : "";
	const colorIndex2 = index == 2 ? "bg-[#F1FFE4]" : "";

	const bgClip =
		(colorIndex0 || colorIndex1 || colorIndex1Arr || colorIndex2) ==
		"bg-[#F1FFE4]"
			? { bgLeft: "#9bc6723e", bgRight: "#85cb4321" }
			: { bgLeft: "#D8F7DB", bgRight: "#DEF7E1" };

	return (
		<div
			className={cn(
				`${colorIndex0 || colorIndex1 || colorIndex1Arr || colorIndex2} 
				 relative mx-4 md:mx-0 overflow-hidden rounded-[40px]`,
				cls
			)}
		>
			{showBackground && (
				// <Background
				// 	cls="absolute z-10 h-full w-full top-5 flex -bottom-0 border-0 "
				// 	cls2="w-full absolute  top-2 z-20"
				// 	cls1="top-36 absolute z-10"
				// />
				<div className="absolute h-full w-full z-10  ">
					<div
						className={cn(
							`display-card-clip-left absolute w-full h-full z-20 
						${bgClip.bgLeft == "#9bc6723e" ? "bg-[#9bc6723e]" : "bg-[#D8F7DB]"}
					
					`,
							extendClsLeft
						)}
					></div>
					<div
						className={cn(
							`display-card-clip-right w-full h-full absolute z-20 ${
								bgClip.bgRight == "#85cb4321"
									? "bg-[#85cb4321]"
									: "bg-[#DEF7E1]"
							}`,
							extendClsRight
						)}
					></div>
				</div>
			)}
			<div
				className={cn(
					"content relative z-10 p-10 px-4 md:px-10 gap-20 flex flex-col",
					contentCls
				)}
			>
				<p
					className={cn(
						"bg-[#B1FFB8] font-sans font-bold leading-5 px-3 py-1.5 rounded-md w-fit",
						paraCls
					)}
				>
					{title}
				</p>
				<img
					src={image}
					alt={alt}
					width={imageWidth}
					className={cn("", imgcls)}
				/>
				<div className={cn("flex flex-col gap-6 -mt-9", contextcls)}>
					<h2
						className={cn(
							"font-bold text-[29px] text-secondary font-head leading-8",
							headCls
						)}
					>
						{heading}
					</h2>
					<p
						className={cn(
							"md:text-lg text-secondary-foreground leading-5 font-body",
							desCls
						)}
					>
						{description}
					</p>
					{!isDownloadable ? (
						<Link
							to={href ?? "#"}
							className={cn(
								`font-sans font-semibold text-xs leading-5 py-2 px-4 flex justify-between w-fit gap-3 border-2 border-secondary rounded-full z-10 `,
								linkCls
							)}
						>
							<span>{action}</span>{" "}
							<Icons.rightArrow
								className={cn("", arrowCls)}
								strokec={strokec}
							/>
						</Link>
					) : (
						<div className={cn("flex gap-2", downloadableCls)}>
							<Link
								to={hrefAndriod ?? "#"}
								target="_blank"
								className={cn(
									`font-sans font-semibold text-[0.78rem] md:text-xs leading-5 py-2 px-3 text-nowrap items-center flex justify-between w-fit gap-3 border-2 border-secondary rounded-full z-10 `,
									linkCls
								)}
							>
								<span>{downloadActionAndriod}</span>{" "}
								<Icons.rightArrow
									className={cn("", arrowCls)}
									strokec={strokec}
									fill="#ffffff"
								/>
							</Link>
							<Link
								to={hrefIOS ?? "#"}
								target="_blank"
								className={cn(
									`font-sans font-semibold text-[0.78rem] md:text-xs leading-5 py-2 md:px-3 px-2 text-nowrap items-center  flex justify-between w-fit gap-3 border-2 border-secondary rounded-full z-10 `,
									linkCls
								)}
							>
								<span>{downloadActionIOS}</span>{" "}
								<Icons.rightArrow
									className={cn("", arrowCls)}
									strokec={strokec}
									fill="#ffffff"
								/>
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
