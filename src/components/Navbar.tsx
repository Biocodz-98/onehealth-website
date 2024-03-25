import React,{useState} from 'react'
import MaxWithWrapper from './MaxWithWrapper';
import {NavLink} from 'react-router-dom';
import { RiMenu3Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { Icons } from './Icons';
import NavItems from './NavItems';
import { motion } from 'framer-motion';
import { MobileNav } from '@/animate.data';

export default function Navbar() {
const [open,setOpen] = useState<boolean>(false);
  return (
		<div className="bg-background sticky z-50 top-0 inset-0 h-24 flex items-center">
			<MaxWithWrapper className="relative mx-auto w-full max-w-screen-2xl px-2.5 md:px-16 py-2">
				<header className="relative bg-white mx-auto ">
					<div className="border-b  border-gray-100 py-3 shadow-sm w-full">
						<div className="flex flex-16 items-center">
							{/* mobile nav */}
							<div className="ml-4 flex lg:ml-0">
								<NavLink to={"/"}>
									<Icons.logo className="h-8 w-36" />
								</NavLink>
							</div>
							<div className="hidden z-50 ld:ml-8 lg:block lg:self-stretch">
								<NavItems />
							</div>
							{!open ? (
								<RiMenu3Line
									onClick={() => setOpen((prev) => !prev)}
									className="md:hidden ml-auto mr-6 text-4xl"
								/>
							) : (
								<RxCross2
									onClick={() => setOpen((prev) => !prev)}
									className="md:hidden ml-auto mr-6 text-4xl"
								/>
							)}
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
						className="mobile-nav md:hidden absolute top-20 bg-white pl-2 p-5 pb-10 right-0"
					>
						<NavItems
							cls="flex flex-col"
							cls1="flex-col md:items-center items-start"
							callCls="flex-col md:w-fit w-full md:ml-8 mx-0"
							navCls="md:flex-row flex-col md:w-fit w-full mx-0 md:ml-8"
						/>
					</motion.div>
				)}
			</MaxWithWrapper>
		</div>
	);
}
