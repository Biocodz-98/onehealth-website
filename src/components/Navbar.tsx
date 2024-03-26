import React,{useState,useEffect} from 'react'
import MaxWithWrapper from './MaxWithWrapper';
import {Link, NavLink,useLocation} from 'react-router-dom';
import { RiMenu3Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { Icons } from './Icons';
import NavItems from './NavItems';
import { motion } from 'framer-motion';
import { MobileNav } from '@/animate.data';
import Search from './Search';

export default function Navbar() {
	const location = useLocation();
	const [open,setOpen] = useState<boolean>(false);
	const [hasAdvertisement,setHasAdvertisement] = useState<boolean>(true);

	useEffect(()=>{
		setOpen(false);
	},[location])

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
										Africa’s most reliable healthcare company
									</p>
								</div>
								<div className="hidden z-50 ld:ml-8 lg:block lg:self-stretch">
									<NavItems />
								</div>
							</div>
							<div className="mobile-search md:hidden flex w-full px-4">
								<Search className="w-full" />
								{/* {!open ? (
									<RiMenu3Line
										onClick={() => setOpen((prev) => !prev)}
										className="md:hidden ml-auto text-4xl"
									/>
								) : (
									<RxCross2
										onClick={() => setOpen((prev) => !prev)}
										className="md:hidden ml-auto text-4xl"
									/>
								)} */}
							</div>
						</div>
					</header>
					{open && (
						<motion.div
							animate="animate"
							initial="initial"
							variants={MobileNav}
							exit={MobileNav.exit}
							whileInView="animate"
							transition={{ duration: 0.65, delay: 0.1, ease: "backOut" }}
							viewport={{
								once: true,
							}}
							className="mobile-nav md:hidden absolute top-36 bg-white pl-2 p-5 pb-10 right-0"
						>
							<NavItems
								cls="flex flex-col"
								cls1="flex-col md:items-center items-start"
								callCls="flex-col md:w-fit w-full md:ml-8 mx-0"
								navCls="md:flex-row flex-col md:w-fit w-full mx-0 md:ml-8"
								hideCls="hidden"
							/>
						</motion.div>
					)}
				</MaxWithWrapper>
			</div>
		</>
	);
}
