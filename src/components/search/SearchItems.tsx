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
}: {
	name: string;
	title?: string;
	cls?: string;
	image?: string;
	linkCls?: string;
	imageCls?: string;
	midTitleCls?: string;
	url: string;
}) {
	return (
		<div
			className={cn("flex border-t border-b border-slate-100 md:p-4 p-1", cls)}
		>
			<Link
				to={url}
				className={cn("flex md:gap-10  items-center w-full", linkCls)}
			>
				{image && (
					<img
						src={image}
						alt="one health product images"
						className={cn("h-12 w-12", imageCls)}
					/>
				)}
				<p className={cn("", midTitleCls)}>
					{title && (
						<h3 className="font-head font-semibold text-lg">{title}</h3>
					)}
					<p className="font-light font-body text-sm md:text-base">{name}</p>
				</p>
				<span className="bg-[#F1FFE4] rounded-full p-3 ml-auto">
					<Icons.rightArrow className="text-[#0E3528]" />
				</span>
			</Link>
		</div>
	);
}
