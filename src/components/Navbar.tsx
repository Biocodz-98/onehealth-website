import { useState, useEffect } from "react";
import MaxWithWrapper from "./MaxWithWrapper";
import { Link, NavLink, useLocation } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { FaWhatsapp } from "react-icons/fa";
import { Icons } from "./Icons";
import NavItems from "./NavItems";
import Search from "./search/Search";
import { MobileNavData } from "./Header/data";
import Whatsapp from "./Whatsapp";
import MobileNavItem from "./MobileNavItem";
import useSearch from "@/hooks/useSearch";
import ResourcePage from "./Header/Resource";
import SearchItems from "./search/SearchItems";
import OneLink from "./Link";
import { SpillDrugContainer } from "@/data/imageData";
import Popup from "./Popup";
import { LoginCardData } from "./Header/data";
import HeroCard from "./cards/HeroCard";
import { HiOutlineMail } from "react-icons/hi";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import Trending from "./Trending";
import {
	TrendingData,
	PopularOnOneHealthData,
	PopularServicesData,
	QuickActionsData,
	EcosystemData,
} from "./search/data";
import { Header, _Header } from "@/animate.data";
import { motion } from "framer-motion";
import GuidesCard from "./cards/GuidesCard";
import ContactGuideMini from "@/components/ContactGuideMini";
import { GuideCardData, ContactGuideInfoData } from "@/data/generalData";

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
	const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

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
										setOpenPopup={setOpenLogin}
										setSearchResult={setSearchResult}
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
					<div className=" relative h-full overflow-y-scroll">
						<Search
							hasSearchButton={true}
							setQuery={setSearchQuery}
							query={searchQuery}
							clsInput="md:w-full md:h-16 h-12"
							setSearchResult={setSearchResult}
						/>

						<div className="py-3 flex w-full"></div>
						{loading && (
							<div className="mx-auto text-center self-center text-xl w-full ">
								Loading products ...
							</div>
						)}
						{Object.keys(error).length > 0 && (
							<div className="mx-auto text-center self-center text-xl text-red-500 w-full">
								Something went wrong, try again ...
							</div>
						)}
						{!loading &&
							searchResult.length === 0 &&
							Boolean(searchQuery) != false && (
								<div className="mx-auto text-center self-center text-xl text-red-500  w-full flex min-w-[80%]">
									No Product Found!
								</div>
							)}
						{searchResult.length === 0 && (
							<>
								<div className="space-y-2">
									<h2 className="font-head font-semibold text-xl">
										Trending searches
									</h2>
									<div className="flex flex-wrap items-center gap-2.5">
										{TrendingData.map((item, index) => (
											<Trending
												key={index}
												title={item}
												setQuery={setSearchQuery}
											/>
										))}
									</div>
								</div>
								<div className="space-y-2 mt-10">
									<h2 className="font-head font-semibold md:text-xl">
										Popular on OneHealth
									</h2>
									<div className="flex overflow-x-auto space-x-2 md:space-x-5 py-5 w-[80vw] mx-auto">
										{PopularOnOneHealthData.map((item, index) => (
											<HeroCard
												key={index}
												title={item.title}
												action={item.action}
												imagesrc={item.Image!}
												className="flex flex-col space-y-1 px-2 rounded-2xl min-w-44"
												imageCls="md:w-full ml-4 md:ml-0 order-1"
												titleCls="text-[0.6rem] md:text-sm"
												actionCls="text-[0.8rem] md:text-sm"
											/>
										))}
									</div>
								</div>
								<div className="max-h-14 w-[80%] h-12 flex items-center rounded-3xl overflow-hidden  relative mt-10  mx-auto md:hidden">
									<div className="w-full h-full  overflow-hidden absolute z-10 bg-[#E9FFEB] cursor-pointer">
										<div className="searchbgleft bg-[#D8F7DB]  w-full h-full absolute  z-0"></div>
										<div className="searchbgright bg-[#DEF7E1] w-full h-full absolute  z-0"></div>
									</div>
									<OneLink
										linkCls="relative z-10 w-full border-transparent h-full items-center"
										index={0}
										to="#resources"
										action="Resources"
										actionCls="text-[#0E3528] font-semibold"
										setIsResources={setShowResourceMobile}
									/>
								</div>
								<div className="space-y-2 md:space-x-2 mt-10 flex flex-col mb-16">
									<h2 className="font-head font-semibold text-xl">
										Quick Actions
									</h2>
									<div className="flex flex-col ">
										{QuickActionsData.map((item, index) => (
											<SearchItems
												url={item.action.href}
												key={index}
												title={item.title}
												name={item.action.name}
												image={item.Image!}
												cls="flex flex-col space-y-1 px-2"
												imageCls="mr-5"
												linkCls="py-5"
												midTitleCls="mr-auto"
											/>
										))}
									</div>
								</div>
							</>
						)}
						{searchResult.length > 0 && (
							<div className=" overflow-y-scroll h-full">
								<div className="numsearch mb-5">
									<p className="font-semibold text-xl md:text-2xl font-body">
										{searchResult.length} result for &quot;{searchQuery}&quot;
									</p>
								</div>

								{searchResult.map((item, index) => (
									<SearchItems
										key={index}
										// image={item.image}
										url={item.url ?? "#"}
										name={item.name}
									/>
								))}
								<div className="mt-8 relative min-h-44 h-fit bg-[#E9FFEB] rounded-3xl overflow-hidden mb-[45%] md:mb-[30%]">
									<div className="w-full h-full  overflow-hidden absolute ">
										<div className="searchbgleft bg-[#D8F7DB]  w-full h-full absolute  z-0"></div>
										<div className="searchbgright bg-[#DEF7E1] w-full h-full absolute  z-0"></div>
									</div>

									<div className="content w-full h-full flex flex-col items-center relative z-10 p-4  md:p-5 space-y-4">
										<h4 className="font-head font-semibold">
											Don’t see what you’re looking for
										</h4>
										<img
											src={SpillDrugContainer}
											alt="Image of searched onehealth pills"
											className="md:w-32 w-24"
										/>
										<p className="font-body">
											Chat a pharmacist on WhatsApp to get product
											recommendation
										</p>
										<OneLink
											index={1}
											target="_blank"
											to={"https://wa.me/+2348179017319"}
											action="Chat on WhatsApp"
											hasLeadingImage={
												<FaWhatsapp className="text-green-500 text-[1rem]" />
											}
										/>
									</div>
								</div>
							</div>
						)}
					</div>
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
					<div className="relative  overflow-y-scroll h-[80%]">
						<div className=" relative min-h-44 h-fit bg-[#E9FFEB] rounded-3xl overflow-hidden">
							<div className="w-full h-full  overflow-hidden absolute ">
								<div className="searchbgleft bg-[#D8F7DB]  w-full h-full absolute  z-0"></div>
								<div className="searchbgright bg-[#DEF7E1] w-full h-full absolute  z-0"></div>
							</div>
							<div className=" relative z-10">
								<div className="flex items-center flex-col mt-10">
									<Icons.logo />
									<p className="md:text-base text-sm">
										Africa’s most reliable healthcare platform
									</p>
								</div>
							</div>
						</div>
						<div className="card bg-white rounded-3xl md:max-w-[80%]   mx-auto p-5 flex flex-col items-center  w-full z-20 relative -mt-16 shadow-md space-y-4">
							<h4 className="font-head font-semibold text-2xl">Login</h4>
							<p className="font-body font-base md:text-base text-sm text-slate-500 text-center">
								Enter your credentials to access your account
							</p>
							<div className="min-w-[87%] mb-16">
								<form className="space-y-3">
									<div className="min-w-[90%] space-y-2 relative">
										<label htmlFor="email" className="text-slate-800">
											Email Address
										</label>
										<input
											type="email"
											name="emai"
											id="email"
											className="w-full outline outline-[#8DDE44] rounded-lg p-3"
										/>
										<HiOutlineMail className="absolute right-[5%] top-[50%]" />
									</div>
									<div className="min-w-[90%] space-y-2 relative">
										<label htmlFor="password" className="text-slate-800">
											Password
										</label>
										<input
											type={isShowPassword ? "text" : "password"}
											name="password"
											id="password"
											className="w-full outline outline-[#8DDE44] rounded-lg p-3"
										/>
										{!isShowPassword ? (
											<FaEyeSlash
												className="absolute right-[5%] top-[50%]"
												onClick={() => setIsShowPassword(true)}
											/>
										) : (
											<FaEye
												className="absolute right-[5%] top-[50%]"
												onClick={() => setIsShowPassword(false)}
											/>
										)}
									</div>
									<div className="flex flex-col items-center md:p-4 space-y-8">
										<Link to="#forgotPassword" className="text-[#228821]">
											Forgot Password?
										</Link>
										<button
											type="submit"
											className="rounded-3xl bg-[#8DDE44] text-[#10441E] p-3 px-5 flex w-full place-content-center"
										>
											{" "}
											Log into Account
										</button>
										<p className="flex items-center md:flex-row flex-col md:gap-6 gap-2 md:text-base text-sm">
											<span> Are you new here?</span>{" "}
											<Link
												to="#create-account"
												className="text-[#228821] md:text-base text-sm"
											>
												Create Account?
											</Link>{" "}
										</p>
									</div>
								</form>
							</div>
						</div>
						<div className="h-fit w-full flex gap-4 items-center flex-col md:max-w-[80%] mx-auto mt-14 space-y-4">
							<h3 className="font-head font-semibold text-xl text-[#134F3A]">
								Login as a Provider or Partner
							</h3>
							<div className="flex gap-4 items-center flex-col md:flex-row  w-full">
								{LoginCardData.map((item, index) => (
									<HeroCard
										key={index}
										title={item.title}
										action={item.action}
										imagesrc={item.Image!}
										className="md:max-w-[100%] md:max-h-[180px] w-full"
										imageCls="md:w-full ml-1 md:ml-0"
									/>
								))}
							</div>
						</div>
					</div>
				</Popup>
			)}

			{callUs && (
				<Popup
					titleHeader="Call us"
					setOpenPopup={closeAllPopups}
					popcardCls="pb-4"
				>
					<div className="overflow-y-scroll h-full">
						<div className="relative  overflow-y-scroll h-[80%]">
							<div className=" relative min-h-60 h-fit bg-[#E9FFEB] rounded-3xl overflow-hidden">
								<div className="w-full h-full  overflow-hidden absolute ">
									<div className="searchbgleft bg-[#D8F7DB]  w-full h-full absolute  z-0"></div>
									<div className="searchbgright bg-[#DEF7E1] w-full h-full absolute  z-0"></div>
								</div>
								<motion.div
									variants={Header}
									animate="animate"
									initial="initial"
									transition={{ duration: 0.65, delay: 0.3 }}
									exit={Header.exit}
									whileInView="animate"
									viewport={{
										once: true,
									}}
									className="flex flex-col relative z-10 p-5 "
								>
									<div className="guide-cards flex flex-nowrap relative w-fit">
										{GuideCardData.map((item, index) => (
											<GuidesCard
												key={index}
												image={item.image}
												index={index}
												imgCls="w-[70%] md:w-full"
												cls={`${
													index == 0
														? ""
														: index == 1
														? "md:right-3  right-9"
														: "md:right-6 right-[4.4rem]"
												}`}
											/>
										))}
									</div>
									<div className="writer-guide my-4 ">
										<h1 className="font-head font-semibold text-[1rem] md:text-2xl leading-9 text-[#8DDE44]">
											Have Enquiries?{" "}
										</h1>
										<h1 className="font-head font-semibold text-[1rem] md:text-2xl  md:pr-0 w-full text-wrap leading-9 text-secondary">
											Speak with our in-house pharmacy support team
										</h1>
									</div>
								</motion.div>
							</div>
							<div className="flex flex-wrap justify-between items-center px-5 md:px-0">
								<motion.div
									variants={_Header}
									animate="animate"
									initial="initial"
									transition={{ duration: 0.65, delay: 0.3 }}
									exit={_Header.exit}
									whileInView="animate"
									viewport={{
										once: true,
									}}
									className={
										"writer-guide my-4 flex w-full flex-col md:flex-row justify-between gap-4"
									}
								>
									<div className="flex flex-col flex-wrap gap-10 items-start mt-6 my-3">
										{ContactGuideInfoData.map((item, index) => (
											<ContactGuideMini
												title={item.title}
												Icon={item.Icon}
												key={index}
												titleCls="text-wrap text-sm md:text-lg"
											/>
										))}
									</div>
									<div className="flex flex-col gap-4 place-content-end ">
										<Link
											to={"tel:+2348179017319"}
											className="px-8 py-3 bg-[#8DDE44] flex w-fit gap-3 rounded-3xl text-#004449 font-sans font-semibold leading-5 text-nowrap"
										>
											<span>Call us now</span>
											<Icons.rightArrow strokec="#004449" />
										</Link>
										<OneLink
											index={1}
											action="Chat on WhatsApp"
											hasLeadingImage={
												<FaWhatsapp className="text-2xl text-[#8DDE44]" />
											}
											to="https://wa.me/+2348179017319"
											linkCls="items-center"
										/>
									</div>
								</motion.div>
							</div>
						</div>
					</div>
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
					<div className="h-full overflow-y-scroll pb-16">
						<div className="flex flex-col gap-5">
							<p className="font-body text-sm py-2">
								We provide high-quality and reliable health services in your
								pocket—care whenever you need, for prevention or when sick.
							</p>
							<Search
								hasSearchButton={true}
								setQuery={setSearchQuery}
								query={searchQuery}
								clsInput="md:w-full md:h-16 h-12"
								setSearchResult={setSearchResult}
							/>
						</div>
						<div className="space-y-2 mt-10">
							<h2 className="font-head font-semibold md:text-xl">
								Popular Services
							</h2>
							<div className="flex overflow-x-auto space-x-3 md:space-x-5 py-5 w-[80vw] mx-auto">
								{PopularServicesData.map((item, index) => (
									<HeroCard
										key={index}
										title={item.title}
										action={item.action}
										imagesrc={item.Image!}
										className="flex flex-col space-y-1 px-2 min-w-44 rounded-2xl"
										imageCls="md:w-full ml-4 md:ml-0 order-1"
										titleCls="text-[0.6rem] md:text-sm"
										actionCls="text-[0.8rem] md:text-sm"
									/>
								))}
							</div>
							<div className="flex flex-col md:flex-row gap-5">
								<div className="space-y-2 md:space-x-2 mt-10 flex flex-col mb-16 w-full">
									<h2 className="font-head font-semibold text-xl">
										For Ecosystem Partners
									</h2>
									<div className="flex flex-col w-full px-2 ">
										{EcosystemData.map((item, index) => (
											<HeroCard
												key={index}
												title={item.title}
												imagesrc={item.Image!}
												className=" w-full md:max-w-full md:max-h-fit grid md:grid "
												imageCls="mr-5 ml-2.5 md:ml-0 -order-1 md:-order-2 md:flex md:flex-row  md:col-span-6 md:row-span-12"
												action={item.action}
												titleGrp="md:-order-1"
												actionCls="order-2  text-xs md:text-sm"
											/>
										))}
									</div>
								</div>
								<div className="space-y-2 md:space-x-2 mt-10 flex flex-col mb-16 w-full">
									<h2 className="font-head font-semibold text-xl">
										Quick Actions
									</h2>
									<div className="flex flex-col ">
										{QuickActionsData.map((item, index) => (
											<SearchItems
												url={item.action.href}
												key={index}
												title={item.title}
												name={item.action.name}
												image={item.Image!}
												cls="flex flex-col space-y-1 px-2"
												imageCls="mr-5"
												linkCls="py-5"
												midTitleCls="mr-auto"
											/>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</Popup>
			)}
		</>
	);
}
