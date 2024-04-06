import { useState } from "react";
import { LoginCardData } from "./Header/data";
import { motion } from "framer-motion";
import { Icons } from "./Icons";
import { HiOutlineMail } from "react-icons/hi";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Link} from "react-router-dom";
import HeroCard from "./cards/HeroCard";
import { H1P1L, H1P1R, Header, _Header } from "@/animate.data";
import Spinner from "./Spinner";

export default function Login() {
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
	const [isProcessing, setIsProcessing] = useState<boolean>(false);
	const [email,setEmail] = useState<string>("");
	const [password,setPassword] = useState<string>("");

	const handleLogin = (e:React.FormEvent)=>{
		e.preventDefault();
		if(!(Boolean(email) && Boolean(password))) return;
		setIsProcessing(true);
		console.log(email,password);
		setTimeout(()=> setIsProcessing(false),3000)
	}

	return (
		<div className="relative  overflow-y-scroll h-[90%] pb-14">
			<div className=" relative min-h-64 h-fit bg-[#E9FFEB] rounded-3xl overflow-hidden">
				<div className="w-full h-full  overflow-hidden absolute ">
					<div className="searchbgleft bg-[#D8F7DB]  w-full h-full absolute  z-0"></div>
					<div className="searchbgright bg-[#DEF7E1] w-full h-full absolute  z-0"></div>
				</div>
				<div className=" relative z-10">
					<div className="flex items-center flex-col mt-16">
						<Icons.logo />
						<motion.p
							variants={H1P1L}
							animate="animate"
							initial="initial"
							transition={{ duration: 0.65, delay: 0.2 }}
							exit={H1P1L.exit}
							whileInView="animate"
							viewport={{
								once: true,
							}}
							className="md:text-base text-sm"
						>
							Africa’s most reliable healthcare platform
						</motion.p>
					</div>
				</div>
			</div>
			<div className="card bg-white rounded-3xl md:max-w-[80%]   mx-auto p-5 flex flex-col items-center  w-full z-20 relative -mt-28 shadow-md space-y-4">
				<motion.h4
					variants={H1P1L}
					animate="animate"
					initial="initial"
					transition={{ duration: 0.65, delay: 0.2 }}
					exit={H1P1L.exit}
					whileInView="animate"
					viewport={{
						once: true,
					}}
					className="font-head font-semibold text-2xl"
				>
					Login
				</motion.h4>
				<motion.p
					variants={H1P1R}
					animate="animate"
					initial="initial"
					transition={{ duration: 0.65, delay: 0.2 }}
					exit={H1P1R.exit}
					whileInView="animate"
					viewport={{
						once: true,
					}}
					className="font-body font-base md:text-base text-sm text-slate-500 text-center"
				>
					Enter your credentials to access your account
				</motion.p>
				<div className="min-w-[87%] mb-16">
					<form className="space-y-3 relative" onSubmit={handleLogin}>
						<motion.div
							variants={Header}
							animate="animate"
							initial="initial"
							transition={{ duration: 0.5, delay: 0.2 }}
							exit={Header.exit}
							whileInView="animate"
							viewport={{
								once: true,
							}}
							className="min-w-[90%] space-y-2 relative"
						>
							<label htmlFor="email" className="text-slate-800">
								Email Address
							</label>
							<input
								type="email"
								name="emai"
								id="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								disabled={isProcessing}
								className="w-full outline outline-[#8DDE44] rounded-lg p-3 disabled:bg-slate-300"
							/>
							<HiOutlineMail className="absolute right-[5%] top-[50%]" />
						</motion.div>
						<motion.div
							variants={Header}
							animate="animate"
							initial="initial"
							transition={{ duration: 0.5, delay: 0.2 }}
							exit={Header.exit}
							whileInView="animate"
							viewport={{
								once: true,
							}}
							className="min-w-[90%] space-y-2 relative"
						>
							<label htmlFor="password" className="text-slate-800">
								Password
							</label>
							<input
								type={isShowPassword ? "text" : "password"}
								name="password"
								id="password"
								value={password}
								disabled={isProcessing}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full outline outline-[#8DDE44] rounded-lg p-3 disabled:bg-slate-300"
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
						</motion.div>
						<div className="flex flex-col items-center md:p-4 space-y-8">
							<Link to="#forgotPassword" className="text-[#228821]">
								Forgot Password?
							</Link>
							<motion.button
								variants={_Header}
								animate="animate"
								initial="initial"
								transition={{ duration: 0.5, delay: 0.2 }}
								exit={_Header.exit}
								whileInView="animate"
								viewport={{
									once: true,
								}}
								type="submit"
								className="rounded-3xl bg-[#8DDE44] text-[#10441E] p-3 px-5 flex w-full place-content-center"
							>
								{" "}
								{isProcessing ? <Spinner /> : <span>Log into Account</span>}
							</motion.button>
							<motion.p
								variants={H1P1R}
								animate="animate"
								initial="initial"
								transition={{ duration: 0.5, delay: 0.2 }}
								exit={H1P1R.exit}
								whileInView="animate"
								viewport={{
									once: true,
								}}
								className="flex items-center md:flex-row flex-col md:gap-6 gap-2 md:text-base text-sm"
							>
								<span> Are you new here?</span>{" "}
								<Link
									to="#create-account"
									className="text-[#228821] md:text-base text-sm"
								>
									Create Account?
								</Link>{" "}
							</motion.p>
						</div>
						{isProcessing && <Spinner />}
					</form>
				</div>
			</div>
			<div className="h-fit w-full flex gap-4 items-center flex-col md:max-w-[80%] mx-auto mt-14 space-y-4">
				<motion.h3
					variants={Header}
					animate="animate"
					initial="initial"
					transition={{ duration: 0.5, delay: 0.2 }}
					exit={Header.exit}
					whileInView="animate"
					viewport={{
						once: true,
					}}
					className="font-head font-semibold text-xl text-[#134F3A]"
				>
					Login as a Provider or Partner
				</motion.h3>
				<motion.div
					variants={Header}
					animate="animate"
					initial="initial"
					transition={{ duration: 0.5, delay: 0.3 }}
					exit={Header.exit}
					whileInView="animate"
					viewport={{
						once: true,
					}}
					className="flex gap-4 items-center flex-col md:flex-row  w-full"
				>
					{LoginCardData.map((item, index) => (
						<HeroCard
							key={index}
							title={item.title}
							action={item.action}
							imagesrc={item.Image!}
							className="md:max-w-[100%] md:max-h-[180px] w-full"
							imageCls="md:w-full ml-1 md:ml-0 bg-contain"
							actionCls="text-[0.7rem] md:text-sm "
							titleGrp="md:-order-1 text-[0.6rem] md:text-sm"
						/>
					))}
				</motion.div>
			</div>
		</div>
	);
}
