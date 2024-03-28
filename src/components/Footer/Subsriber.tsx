import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FiMail } from "react-icons/fi";
import { motion} from "framer-motion";
import { Header ,H1P1L,H1P1R} from "@/animate.data";
export default function Subsriber() {
  return (
		<motion.div
			variants={Header}
			animate="animate"
			initial="initial"
			transition={{ duration: 0.65, delay: 0.5, ease: "backOut" }}
			exit={Header.exit}
			whileInView="animate"
			viewport={{
				once: true,
			}}
			className="bg-[#228821]  w-full p-5 py-9 md:p-9 rounded-3xl col-span-4 flex flex-col gap-5  overflow-hidden "
		>
			<motion.h1
				variants={H1P1L}
				animate="animate"
				initial="initial"
				transition={{ duration: 0.65, delay: 0.5, ease: "backOut" }}
				exit={H1P1L.exit}
				className="font-head font-semibold text-[1.8rem] md:text-4xl leading-8 text-white"
			>
				Subscribe to our newsletter
			</motion.h1>
			<motion.div
				variants={H1P1R}
				animate="animate"
				initial="initial"
				transition={{ duration: 0.65, delay: 0.5, ease: "backOut" }}
				exit={H1P1R.exit}
				whileInView="animate"
				viewport={{
					once: true,
				}}
			>
				<p className="text-white md:pr-20">Feeling a bit lost some times?</p>
				<p className="text-white md:pr-20">
					Get a weekly dose of actionable health advice, secrets, tips, trends,
					and banter in your inbox.
				</p>
			</motion.div>
			<motion.div
				variants={Header}
				animate="animate"
				initial="initial"
				transition={{ duration: 0.65, delay: 0.5, ease: "backOut" }}
				exit={Header.exit}
				whileInView="animate"
				viewport={{
					once: true,
				}}
				className="w-full"
			>
				<div className="flex w-full flex-wrap  gap-2">
					<div className="flex relative w-full max-w-[67%]">
						<Input type="email" placeholder="Email Address" className="pl-6 " />
						<FiMail className="text-[#667185] absolute flex top-[32%] ml-2" />
					</div>
					<Button
						type="submit"
						className="text-secondary text-center bg-[#8DDE44] w-fit p-4 px-5"
					>
						Subscribe
					</Button>
				</div>
			</motion.div>
		</motion.div>
	);
}
