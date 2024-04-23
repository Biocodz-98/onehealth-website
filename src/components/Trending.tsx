import { PiClockThin } from "react-icons/pi";
import { Button } from "./ui/button";

export default function Trending({
	title,
}: {
	title: string;
	setQuery?: (query: string) => void;
}) {
	return (
		<Button className="flex border border-slate-200 items-center gap-2.5 rounded-3xl px-3 md:px-4 py-1 bg-transparent text-[#344054] ">
			<PiClockThin className="text-base md:text-xl" />
			<span className="text-xs md:text-base text-nowrap">{title}</span>
		</Button>
	);
}
