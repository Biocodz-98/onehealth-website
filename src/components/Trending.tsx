import { PiClockThin } from "react-icons/pi";

export default function Trending({
	title,
}: {
	title: string;
	setQuery?: (query: string) => void;
}) {
	return (
		<button className="flex border border-slate-200 items-center gap-2.5 rounded-3xl px-3 md:px-4 py-1 ">
			<PiClockThin className="text-base md:text-xl" />
			<span className="text-xs md:text-base text-nowrap">{title}</span>
		</button>
	);
}
