import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Icons } from "./Icons";
import React, { SetStateAction } from 'react';

export interface OneLinkProps {
	index: number;
	to: string;
	linkCls?: string;
	arrowCls?: string;
	actionCls?: string;
	action: string;
	strokec?: string;
	target?: string;
	content?: string;
	arialLabel?: string;
	hasLeadingImage?: React.ReactNode;
	setIsResources?: React.Dispatch<SetStateAction<boolean>>;
}
export default function OneLink({
	index,
	to,
	linkCls,
	arrowCls,
	action,
	actionCls,
	strokec,
	hasLeadingImage,
	target,
	setIsResources,
	content,
	arialLabel,
}: OneLinkProps) {
	return (
		<Link
			to={to}
			target={target}
			content={content}
			aria-label={arialLabel}
			onClick={() => {
				if (to.toLowerCase() === "#resources") {
					setIsResources?.(true);
				}
			}}
			className={cn(
				`border-${index == 0 ? "white" : "secondary"} text-${
					index == 0 ? "white" : "secondary"
				}
                         font-sans font-semibold text-xs leading-5 py-2 px-4 flex justify-between w-fit gap-3 border-2 rounded-full`,
				linkCls
			)}
		>
			{hasLeadingImage}
			<span className={cn("", actionCls)}>{action}</span>{" "}
			<Icons.rightArrow className={cn("", arrowCls)} strokec={strokec} />
		</Link>
	);
}
