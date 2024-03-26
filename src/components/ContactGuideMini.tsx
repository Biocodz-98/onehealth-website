import { IconType } from 'react-icons'
export type ContactGuideMiniProps= {title: string, Icon: IconType};
export default function ContactGuideMini({ Icon, title }: ContactGuideMiniProps) {
	return (
		<div className="flex gap-2 items-center">
			{/* //@ts-ignore */}
			<Icon className="text-[#228821]" stroke="#228821" />
			<p className="font-sans text-lg leading-5 text-slate-500">{title}</p>
		</div>
	);
}
