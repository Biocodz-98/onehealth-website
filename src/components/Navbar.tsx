import { useState, useEffect } from "react";
import MaxWithWrapper from "./MaxWithWrapper";
import { Link, NavLink, useLocation } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { Icons } from "./Icons";
import NavItems from "./NavItems";
import Search from "./search/Search";
import { MobileNavData } from "./Header/data";
import Whatsapp from "./Whatsapp";
import MobileNavItem from "./MobileNavItem";
import useSearch from "@/hooks/useSearch";
import ResourcePage from "./Header/Resource";
import Popup from "./Popup";
import Login from "./Login";
import Services from "./Services";
import Callus from "./Callus";
import SearchBody from "./SearchBody";

export default function Navbar() {
	const location = useLocation();
	const [isHovered, setIsHovered] = useState<boolean>(false);
	const [hasSearch, setHasSearch] = useState<boolean>(false);
	const [openLogin, setOpenLogin] = useState<boolean>(false);
	const [callUs, setOpenCallUs] = useState<boolean>(false);
	const [showResourceMobile, setShowResourceMobile] = useState<boolean>(false);
	const [showServices, setShowService] = useState<boolean>(false);

	const [showWhatapp, setShowWhatapp] = useState<boolean>(false);
	const [screenSize, setScreenSize] = useState<{
		height: number;
		width: number;
	}>({
		width: window.innerWidth,
		height: window.innerHeight,
	});
	const [hasAdvertisement, setHasAdvertisement] = useState<boolean>(false); //use for displaying advertisement on the screen (default false - no advertisement)
	const [searchQuery, setSearchQuery] = useState<string>(""); //change search query to string

	//mobile devices
	const [active, setActive] = useState<boolean[]>([
		false,
		false,
		false,
		false,
		false,
	]);

	const checkpath = (item: string) => {
		const checker = item.trim().toLowerCase();
		console.log(checker, "item is login", checker === "cart");
		if (checker === "home" || location.pathname.toLowerCase() === "/") {
			setActive([true, false, false, false, false]);
		}
		if (checker === "product") {
			setActive([false, true, false, false, false]);
		}
		if (checker === "call us") {
			setActive([false, false, true, false, false]);
		}
		if (checker === "cart") {
			console.log("should log", item);
			setActive([false, false, false, true, false]);
		}
		if (checker === "login") {
			setActive([false, false, false, false, true]);
		}
		if (
			checker !== "login" &&
			checker !== "product" &&
			checker !== "call us" &&
			checker !== "cart" &&
			checker !== "home"
		) {
			setActive([false, false, false, false, false]);
		}
	};
	const closeAllPopups = () => {
		setShowResourceMobile(false);
		setOpenCallUs(false);
		setOpenLogin(false);
		setHasSearch(false);
		setShowService(false);
	};

	const { error, searchResult, loading, setSearchResult } =
		useSearch(searchQuery);
	console.log(searchResult);

	//pop in whatsapp
	useEffect(() => {
		const timer = setTimeout(() => {
			setShowWhatapp(true);

			// Attempt to play alert sound
			// const alertSound = new Audio(WhatappSound);
			// alertSound.play().catch((error) => {
			// 	console.error("Failed to play alert sound:", error.message);
			// });
		}, 4000);

		return () => clearTimeout(timer);
	}, []);

	//handle screen sizes
	useEffect(() => {
		const handleResize = () => {
			setScreenSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<>
			{hasAdvertisement && (
				<div className="bg-[#10441E] h-fit w-full  py-2 relative flex">
					<div className="px-4  flex flex-col items-center w-full ">
						<p className="text-white font-light text-sm md:text-base text-center">
							Black friday offer 🚨. Get the OneHealth travel kit for ₦3,300
						</p>
						<Link
							to={"#"}
							className="text-[#3DA647] text-sm md:text-base p-3"
							rel="nofollow"
							target="_blank"
						>
							Click here to buy now 👈🏽
						</Link>
					</div>
					<RxCross2
						onClick={() => setHasAdvertisement((prev) => !prev)}
						className="ml-auto text-3xl md:text-4xl text-red-600"
					/>
				</div>
			)}
			<div className="bg-background sticky z-50 top-0 inset-0 md:h-24 h-fit flex items-center md:mb-0 mb-5">
				<MaxWithWrapper className="relative mx-auto w-full max-w-screen-2xl px-2.5 md:px-16 py-2">
					<header className="relative bg-white mx-auto ">
						<div className="border-b  border-gray-100 py-3 shadow-sm w-full">
							<div className="flex  flex-16 items-center relative">
								{/* mobile nav */}
								<div className="ml-4 flex flex-col md:flex-row md:items-start items-center lg:ml-0 w-full">
									<NavLink to={"/"}>
										<Icons.logo className="h-8 w-36" />
									</NavLink>

									<p className="md:hidden font-normal text-sm py-2">
										Africa’s most reliable healthcare platform
									</p>
								</div>
								<div className="hidden z-50 ld:ml-8 lg:block lg:self-stretch">
									<NavItems
										searchQuery={searchQuery}
										setHovered={setIsHovered}
										setSearchQuery={setSearchQuery}
										setHasSearch={setHasSearch}
										setOpenLogin={setOpenLogin}
										setOpenCallUs={setOpenCallUs}
										setSearchResult={setSearchResult}
										setShowServices={setShowService}
										showServices={showServices}
									/>
								</div>
							</div>
							<div className="mobile-search md:hidden flex w-full px-4">
								<Search
									className="w-full"
									setQuery={setSearchQuery}
									query={searchQuery}
									setHasSearch={setHasSearch}
									setSearchResult={setSearchResult}
								/>
							</div>
						</div>
					</header>
					<ResourcePage setIsHovered={setIsHovered} isHovered={isHovered} />
				</MaxWithWrapper>

				<nav className="lg:hidden fixed bottom-0 items-center flex w-full bg-slate-50 pb-3">
					{MobileNavData.map((item, index) => (
						<MobileNavItem
							key={index}
							action={item.action}
							text={item.text}
							Icon={item.icon}
							active={active[index]}
							setActive={checkpath}
							setOpenLogin={setOpenLogin}
							setOpenCallUs={setOpenCallUs}
							setShowServices={setShowService}
						/>
					))}
				</nav>
				{showWhatapp && <Whatsapp />}
			</div>
			{hasSearch && (
				<Popup
					titleHeader="Search medicines, plans etc."
					setOpenPopup={closeAllPopups}
					setHasSearch={setHasSearch}
					setSearchQuery={setSearchQuery}
				>
					<SearchBody
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
						searchResult={searchResult}
						setSearchResult={setSearchResult}
						setShowResourceMobile={setShowResourceMobile}
						loading={loading}
						error={error}
					/>
				</Popup>
			)}

			{openLogin && (
				<Popup
					titleHeader="Login"
					setOpenPopup={closeAllPopups}
					setHasSearch={setHasSearch}
					setSearchQuery={setSearchQuery}
					popcardCls="md:pb-0 md:px-10 md:py-0"
				>
					<Login />
				</Popup>
			)}

			{callUs && (
				<Popup
					titleHeader="Call us"
					setOpenPopup={closeAllPopups}
					popcardCls="pb-4"
				>
					<Callus />
				</Popup>
			)}
			{screenSize.width < 650 && showResourceMobile && (
				<Popup titleHeader="Resources" setOpenPopup={closeAllPopups}>
					<div className="h-full overflow-y-scroll pb-16">
						<ResourcePage resCls="flex relative p-2" />
					</div>
				</Popup>
			)}
			{showServices && (
				<Popup titleHeader="Services" setOpenPopup={closeAllPopups}>
					<Services
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
						setSearchResult={setSearchResult}
					/>
				</Popup>
			)}
		</>
	);
}
