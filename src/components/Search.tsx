import React, { SetStateAction } from 'react'
import { Icons } from './Icons';
import { cn } from '@/lib/utils';

export default function Search({className,query,setQuery}:{className?: string,query?:string;setQuery?:React.Dispatch<SetStateAction<string>>}) {
  return (
		<div className={cn("shadow-lg border border-slate-150 rounded-lg bg-slate-200",className)}>
			<form>
				<div className="rounded-lg flex items-center bg-slate-50 focus-within:outline focus-within:outline-primary">
					<button type="submit" className="p-1.5" 
						onClick={(e)=>{
							e.preventDefault();
							setQuery?.(query??"");
							console.log(query,"click");
						}}
					>
						<Icons.search className="" />

					</button>
					<input
						className="py-2 placeholder:text-sm focus:outline-none bg-transparent placeholder:text-slate-500 pr-1.5 w-full md:w-52"
						type="search"
						placeholder="Search medicines, plans etc."
						onChange={(e)=>{
							setQuery?.(e.target.value);
						}}
					/>
				</div>
			</form>
		</div>
	);
}
