import React from 'react'
import {Link}  from 'react-router-dom';
import { Icons } from '@/components/Icons';
import { cn } from '@/lib/utils';
export interface HeroCardProps {
	title: string;
	imagesrc?: string;
	action: { title: string; href: string };
	Image?: string;
	className?: string;
}
export default function HeroCard({
	title,
	imagesrc,
	action,
	className,
}: HeroCardProps) {
	return (
		<div
			className={cn(
				" grid grid-cols-12 grid-rows-12 md:flex md:flex-col md:max-w-[205px] md:max-h-[201px] w-[98%] md:w-full p-5 rounded-3xl shadow-xs shadow-[#101928]/15 bg-white inset-0 drop-shadow-md md:px-5 px-1 m-1 border",
				className
			)}
		>
			<div className="text-xs uppercase font-sans tracking-wide font-semibold flex items-center gap-3 text-slate-600 leading-4 order-1 md:-order-1 col-span-6 row-span-6 pl-2 md:pl-0">
				<p className="w-5 bg-slate-600 h-0.5" />
				<p className="flex flex-nowrap">
					{"  "} {title}
				</p>
			</div>
			<div className="bg-[#F4F4F4] md:p-1.5 md:m-1.5 px-3 md:mx-0 rounded-md relative h-24 w-40 md:my-3 overflow-hidden -order-1 md:order-1 col-span-6 row-span-12 mr-5 md:mr-0">
				<div className="absolute top-3 -right-0">
					<img src={imagesrc} alt="hero image" width={90} height={90} />
				</div>
			</div>
			<div className="action font-bold text-md leading-4 flex items-center justify-between text-primary mt-2 order-2 col-span-6 row-span-6 pl-2 md:pl-0">
				<Link to={action.href} target="_blank">
					{action.title}
				</Link>
				<Icons.downArrow className="-rotate-90 text-primary font-bold" />
			</div>
		</div>
	);
}
