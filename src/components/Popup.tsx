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
		<div className="searched product flex flex-col lg:p-4 fixed max-h-full w-full bg-[#10441E]/60 l z-30 lg:z-50 h-[100vh]">
			<div
				className={cn(
					"md:rounded-3xl rounded-tr-3xl rounded-tl-3xl bg-white lg:max-w-[80%] lg:w-fit w-full lg:h-[95%] h-full overflow-hidden mx-auto mt-[1.5%] lg:p-10 p-4 pb-[15%]",
					popcardCls
				)}
			>
				<div className="flex justify-between relative my-7">
					<h4 className="font-semibold font-head text-2xl text-[#134F3A]">
						{titleHeader}
					</h4>
					<RxCross2
						onClick={() => {
							setSearchQuery?.("");
							setHasSearch?.(false);
							setOpenPopup(false);
						}}
						className="absolute text-4xl text-[#0E3528] right-0 hover:cursor-pointer bg-[#F1FFE4] p-2 rounded-full font-extrabold"
					/>
				</div>
				{children}
			</div>
		</div>
	);
};
export default Popup;