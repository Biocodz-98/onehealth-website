import { Link } from "react-router-dom";
export default function MobileNavItem ({
	Icon,
	text,
	action,
	active,
	setActive,
}: {
	Icon: React.ElementType;
	text: string;
	action: string;
	active: boolean;
	setActive: (item: string) => void;
}) {
	return (
		<Link
			to={action}
			onClick={() => setActive(text)}
			className={`w-full flex flex-col items-center p-3 ${
				active ? "text-[#3DA646]" : "text-[#101928]"
			}`}
		>
			{/* <img src={image} alt="One Health navigation images" /> */}
			<Icon
				className="my-2"
				strokec={active ? "#3DA646" : "#101928"}
				fill={active ? "#3DA646" : "#101928"}
			/>
			<span className="text-sm flex flex-nowrap font-semibold">{text}</span>
		</Link>
	);
}
