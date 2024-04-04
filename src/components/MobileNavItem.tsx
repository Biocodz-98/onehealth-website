import { Link } from "react-router-dom";
import React, { SetStateAction } from "react";
export default function MobileNavItem({
	Icon,
	text,
	action,
	active,
	setActive,
	setOpenLogin,
	setOpenCallUs,
	setShowServices,
}: {
	Icon: React.ElementType;
	text: string;
	action: string;
	active: boolean;
	setOpenLogin?: React.Dispatch<SetStateAction<boolean>>;
	setOpenCallUs?: React.Dispatch<SetStateAction<boolean>>;
	setShowServices?: React.Dispatch<SetStateAction<boolean>>;
	setActive: (item: string) => void;
}) {
	return (
		<Link
			to={action}
			onClick={() => {
				setActive(text);
				if (text.toLowerCase() === "login") {
					setOpenLogin?.(true);
				}
				if (text.toLowerCase() === "call us") {
					setOpenCallUs?.(true);
				}
				if (text.toLowerCase() === "services") {
					setShowServices?.(true);
				}
			}}
			className={`w-full flex flex-col items-center p-3${
				active ? "text-[#3DA646]" : "text-[#101928]"
			}`}
		>
			{/* <img src={image} alt="One Health navigation images" /> */}
			<Icon
				className="h-10"
				strokec={active ? "#3DA646" : "#101928"}
				fill={active ? "#3DA646" : "#101928"}
				strokeWidth="0.5"
			/>
			<span className="text-sm flex flex-nowrap font-semibold">{text}</span>
		</Link>
	);
}
