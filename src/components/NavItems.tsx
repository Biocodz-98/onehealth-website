"use client";
import { SetStateAction, useState } from "react";
import { NAV_LINKS, CALL_TO_ACTION, PRODUCTS_CATEGORY } from "@/config";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Icons } from "./Icons";
import Search from "./search/Search";
import { Result } from "@/hooks/useSearch";

interface NavigationItemProps {
	cls?: string;
	cls1?: string;
	logoCls?: string;
	navCls?: string;
	callCls?: string;
	hideCls?: string;
	searchQuery?: string;
	setHovered?: React.Dispatch<SetStateAction<boolean>>;
	setHasSearch?: React.Dispatch<SetStateAction<boolean>>;
	setSearchQuery?: React.Dispatch<SetStateAction<string>>;
	setOpenPopup?: React.Dispatch<SetStateAction<boolean>>;
	setSearchResult?: React.Dispatch<SetStateAction<Result[]>>;
}

export default function NavItems(props: NavigationItemProps) {
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const [showProduct, setShowProduct] = useState<boolean>(false);
	return (
		<div
			className={cn(
				"flex h-full gap-4 text-secondary items-center ml-8",
				props.cls
			)}
		>
			<div className={cn("h-full items-center flex gap-4", props.cls1)}>
				<ul className={cn("flex relative", props.logoCls)}>
					<li
						onClick={() => setShowProduct((prev) => !prev)}
						className="flex gap-2 cursor-pointer items-center list-none"
					>
						<Icons.product className="text-secondary" />
						<span className="text-sm">Product</span>
						<Icons.downArrow
							className={`${
								showProduct ? "rotate-180" : ""
							}  transition-all duration-300`}
						/>
					</li>
					<li
						className={`${
							showProduct ? "opacity-100" : "opacity-0 "
						} bg-muted absolute left-0 top-10 transition-all duration-500 flex p-2 fade-in-75 list-none overflow-visible`}
					>
						{showProduct && (
							<ul className="flex flex-col ">
								{PRODUCTS_CATEGORY.map((item, index) => (
									<li
										className="bg-slate-150 hover:bg-slate-200 px-3 py-2 rounded-full text-sm list-none z-40"
										key={index}
									>
										<NavLink to={item.link}>{item.name}</NavLink>
									</li>
								))}
							</ul>
						)}
					</li>
				</ul>
				<div className={props.hideCls}>
					<Search
						setQuery={props.setSearchQuery}
						query={props.searchQuery}
						setHasSearch={props.setHasSearch}
						className="md:-w-52"
						setSearchResult={props.setSearchResult!}
					/>
				</div>
			</div>

			<ul className={cn("nav-links flex gap-1 ml-8", props.navCls)}>
				{NAV_LINKS.map((items, index) => (
					<li
						className={`bg-slate-150 hover:bg-slate-200 px-3 py-2 rounded-full text-sm list-none transition-all duration-300 ${
							activeIndex == index ? "bg-slate-200" : ""
						}`}
						key={index}
						onClick={() => {
							setActiveIndex(index);
							if (items.label?.toLowerCase() === "resources") {
								props.setHovered?.((prev) => !prev);
							}
						}}
						onMouseEnter={() => {
							if (items.label?.toLowerCase() === "resources") {
								props.setHovered?.(true);
							}
						}}
					>
						<NavLink to={`${items.href}`} className={items.label}>
							{items.label}
						</NavLink>
					</li>
				))}
			</ul>
			<ul className={cn("call-to-action flex ml-8 gap-2", props.callCls)}>
				{CALL_TO_ACTION.map((items, index) => (
					<NavLink
						key={index}
						className={`${items.variant} text-sm whitespace-nowrap flex items-center gap-2`}
						to={`${items.href}`}
						target={
							items.label.toLowerCase() === "enter pharmarcy"? "_blank": ""
						}
						onClick={() => {
							if (items.label.toLowerCase() === "sign in") {
								props.setOpenPopup?.(true);
								props.setHasSearch?.(false);
								props.setSearchQuery?.("");
							}
						}}
					>
						{items.label == "Call us" && <Icons.call />}

						{items.label}
					</NavLink>
				))}
			</ul>
		</div>
	);
}
