import { SetStateAction } from 'react'
import { Icons } from '../Icons';
import { cn } from '@/lib/utils';
import { Result } from '@/hooks/useSearch';

export default function Search({
	className,
	query,
	setQuery,
	hasSearchButton,
	clsInput,
	clsButton,
	setHasSearch,
	setSearchResult,
}: {
	className?: string;
	query?: string;
	clsInput?: string;
	clsButton?: string;
	hasSearchButton?: boolean;
	setQuery?: React.Dispatch<SetStateAction<string>>;
	setHasSearch?: React.Dispatch<SetStateAction<boolean>>;
	setSearchResult: React.Dispatch<SetStateAction<Result[]>>;
}) {
	return (
		<div
			onClick={() => setHasSearch?.(true)}
			className={cn(
				"shadow-lg border border-slate-150 rounded-lg bg-slate-200",
				className
			)}
		>
			<form>
				<div className="rounded-lg flex items-center bg-slate-50 focus-within:outline focus-within:outline-primary">
					<button
						type="submit"
						className="p-1.5"
						onClick={(e) => {
							e.preventDefault();
							setQuery?.((query ?? "") + " ");
							console.log(query, "click");
						}}
					>
						<Icons.search className="" />
					</button>
					<input
						className={cn(
							"py-2 placeholder:text-[0.65rem] md:placeholder:text-sm focus:outline-none bg-transparent placeholder:text-slate-500 pr-1.5 w-full md:w-52 md:text-base text-sm",
							clsInput
						)}
						type="search"
						placeholder="Search medicines, plans etc."
						onChange={(e) => {
							setQuery?.(e.target.value);
							if (e.target.value === "") {
								setSearchResult([]);
							}
						}}
						value={query}
					/>
					{hasSearchButton && (
						<button
							type="submit"
							className={cn(
								"md:p-2 md:px-4 px-3 p-1 rounded-3xl ml-auto mr-2 md:mr-4 bg-[#8DDE44] text-[#134F3A] font-body text-xs md:text-base",
								clsButton
							)}
							onClick={(e) => {
								e.preventDefault();
								setQuery?.((query ?? "") + " ");
								console.log(query, "click");
							}}
						>
							search
						</button>
					)}
				</div>
			</form>
		</div>
	);
}
