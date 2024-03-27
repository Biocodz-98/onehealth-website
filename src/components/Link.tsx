import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Icons } from "./Icons";

export interface OneLinkProps{
    index: number;
    to:string;
    linkCls?: string;
    arrowCls?: string;
    action: string;
    strokec?: string;
}
export default function OneLink({index,to,linkCls,arrowCls,action,strokec}:OneLinkProps) {
  return (
		<Link
			to={to}
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
		</Link>
	);
}
