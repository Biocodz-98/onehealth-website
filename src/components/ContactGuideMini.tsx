import { IconType } from 'react-icons'
import { cn } from '@/lib/utils';
export type ContactGuideMiniProps= {title: string,cls?:string;titleCls?:string; Icon: IconType};
export default function ContactGuideMini({ Icon, title, titleCls,cls }: ContactGuideMiniProps) {
	return (
		<div className={cn("flex gap-2 items-center",cls)}>
			<Icon className="text-[#228821]" stroke="#228821" />
			<p className={cn("font-sans text-base  md:text-lg leading-5 text-slate-500", titleCls)}>
				{title}
			</p>
		</div>
	);
}
