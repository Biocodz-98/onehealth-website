import { IconType } from 'react-icons'
import { cn } from '@/lib/utils';
export type ContactGuideMiniProps= {title: string,titleCls?:string; Icon: IconType};
export default function ContactGuideMini({ Icon, title, titleCls }: ContactGuideMiniProps) {
	return (
		<div className="flex gap-2 items-center">
			<Icon className="text-[#228821]" stroke="#228821" />
			<p className={cn("font-sans text-lg leading-5 text-slate-500", titleCls)}>
				{title}
			</p>
		</div>
	);
}
