import { LegacyRef, SetStateAction } from 'react'
import { Icons } from '../Icons';
import { cn } from '@/lib/utils';
import { Result } from '@/hooks/useSearch';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function Search({
	className,
	query,
	setQuery,
	hasSearchButton,
	clsInput,
	clsButton,
	setHasSearch,
	setSearchResult,
	hasSearch,
	isAutofocus,
	ref,
}: {
	className?: string;
	query?: string;
	clsInput?: string;
	clsButton?: string;
	hasSearchButton?: boolean;
	hasSearch?: boolean;
	isAutofocus?: boolean;
	ref?:LegacyRef<HTMLInputElement>;
	setQuery?: React.Dispatch<SetStateAction<string>>;
	setHasSearch?: React.Dispatch<SetStateAction<boolean>>;
	setSearchResult: React.Dispatch<SetStateAction<Result[]>>;
}) {
	return (
		<div
			onClick={() => setHasSearch?.(true)}
			className={cn(
				"shadow-lg border border-slate-150 rounded-lg bg-slate-200 focus-within:border-none focus-within:shadow-none focus-within:outline-none focus-within:ring-2 ring-0",
				className
			)}
		>
			{!hasSearch && (
				<form className=" focus-within:outline-none border-none bg-transparent ring-0">
					<div className="rounded-lg flex items-center bg-slate-50 focus-within:outline focus-within:outline-primary focus-within:ring-2 focus-within:ring-primary border-transparent focus-within:scale-100 p-1 border-none">
						<Button
							type="submit"
							className="p-1.5 bg-transparent relative"
							onClick={(e) => {
								e.preventDefault();
								setQuery?.((query ?? "") + " ");
							}}
						> <span className='absolute opacity-0' >search</span>
							<Icons.search className="" />
						</Button>
						<Input
							ref={ref}
							className={cn(
								"py-2 placeholder:text-sm md:placeholder:text-sm focus:outline-none  bg-transparent placeholder:text-slate-500 pr-1.5 w-full md:w-52 text-base border-none focus:border-none focus:border-transparent focus-visible:ring-0 focus-visible:ring-transparent",
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
							autoFocus={isAutofocus}
						/>
						{hasSearchButton && (
							<Button
								type="submit"
								className={cn(
									"px-6 p-2 rounded-3xl ml-auto mr-2 md:mr-4 bg-[#8DDE44] text-[#134F3A] font-body text-xs font-medium md:text-base min-w-[20%] md:min-w-[15%] w-fit",
									clsButton
								)}
								onClick={(e) => {
									e.preventDefault();
									setQuery?.((query ?? "") + " ");
								}}
							>
								search
							</Button>
						)}
					</div>
				</form>
			)}
		</div>
	);
}
