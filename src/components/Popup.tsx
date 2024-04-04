import React,{SetStateAction} from 'react'
import { RxCross2 } from "react-icons/rx";
import { cn } from '@/lib/utils';
interface PopupProp {
	titleHeader: string;
	popcardCls?: string;
	setHasSearch?: React.Dispatch<SetStateAction<boolean>>;
	setOpenPopup: React.Dispatch<SetStateAction<boolean>>;
	setSearchQuery?: React.Dispatch<SetStateAction<string>>;
	children: React.ReactNode;
}
const Popup: React.FC<PopupProp> = ({
	titleHeader,
	setOpenPopup,
	setHasSearch,
	setSearchQuery,
	popcardCls,
	children,
}) => {
	return (
		<div className="searched product flex flex-col p-4 fixed max-h-full w-full bg-[#10441E]/60 max-w-full z-50 h-[100vh]">
			<div
				className={cn(
					"rounded-3xl bg-white min-w-[70%] md:h-[95%] h-[98%] overflow-hidden mx-auto mt-[1.5%] md:p-10 p-4 pb-[15%]",
					popcardCls
				)}
			>
				<div className="flex justify-between relative my-7">
					<h4 className="font-semibold font-head text-lg md:text-2xl">
						{titleHeader}
					</h4>
					<RxCross2
						onClick={() => {
							setSearchQuery?.("");
							setHasSearch?.(false);
							setOpenPopup(false);
						}}
						className="absolute text-4xl text-[#0E3528] right-0 hover:cursor-pointer bg-[#F1FFE4] p-2 rounded-full"
					/>
				</div>
				{children}
			</div>
		</div>
	);
};
export default Popup;