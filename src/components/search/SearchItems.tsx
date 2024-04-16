import { Link } from 'react-router-dom'
import {Icons} from "../Icons"
import { cn } from '@/lib/utils';

export default function SearchItems({
	name,
	title,
	url,
	image,
	cls,
	linkCls,
	imageCls,
	midTitleCls,
	newPage,
	titleCls,
	pCls
}: {
	name: string;
	title?: string;
	cls?: string;
	image?: string;
	linkCls?: string;
	imageCls?: string;
	midTitleCls?: string;
	url: string;
	newPage?: boolean;
	titleCls?: string;
	pCls?: string;
}) {
	return (
		<div
			className={cn("flex border-t border-b border-slate-100 md:p-4 p-1", cls)}
		>
			<Link
				to={url}
				className={cn("flex md:gap-10  items-center w-full", linkCls)}
				target={newPage == true?"":"_blank "}
			>
				{image && (
					<img
						loading="lazy"
						src={image}
						alt="one health product images"
						className={cn("h-12 w-12", imageCls)}
					/>
				)}
				<p className={cn("", midTitleCls)}>
					{title && (
						<h3 className={cn("font-head font-semibold text-base md:text-lg",titleCls)}>
							{title}
						</h3>
					)}
					<p className={cn("font-light font-body text-sm md:text-base",pCls)}>{name}</p>
				</p>
				<span className="bg-[#F1FFE4] rounded-full p-3 ml-auto">
					<Icons.rightArrow className="text-[#0E3528]" />
				</span>
			</Link>
		</div>
	);
}
