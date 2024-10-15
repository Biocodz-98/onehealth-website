import { Link } from "react-router-dom";
import React, { SetStateAction,useEffect } from "react";
import { useLocation } from "react-router-dom";

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
	const location = useLocation();
	useEffect(() => {
		const text = location.pathname == "/"?"home":location.pathname; 
		setActive(text);
	}, [location.pathname]);
	return (
		<Link
			to={action}
			onClick={() => {
				setActive(text);
				if (text.toLowerCase() === "login") {
					window.open('https://onehealthng.com/customer/login', '_blank')
				}
				if (text.toLowerCase() === "call us") {
					setOpenCallUs?.(true);
					setOpenLogin?.(false);
					setShowServices?.(false);
				}
				if (text.toLowerCase() === "services") {
					setShowServices?.(true);
					setOpenLogin?.(false);
					setOpenCallUs?.(false);
				}
				if (text.toLowerCase() === "home") {
					setShowServices?.(false);
					setOpenLogin?.(false);
					setOpenCallUs?.(false);
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
			<span
				className={`text-sm flex flex-nowrap font-semibold text-[${
					active ? "#3DA646" : "#101928"
				}]`}
			>
				{text}
			</span>
		</Link>
	);
}
