// import { motion} from "framer-motion";
// import { Header } from "@/animate.data";
// export default function TextWordy() {
//   return (
// 		<motion.div className="text-word mb-10 w-full flex flex-col mt-20 gap-5 text-[#8D8484] text-sm pb-20 bg-white">
// 			<motion.h1
// 				variants={Header}
// 				animate="animate"
// 				initial="initial"
// 				transition={{ duration: 0.65, delay: 0.5, ease: "backOut" }}
// 				exit={Header.exit}
// 				whileInView="animate"
// 				viewport={{
// 					once: true,
// 				}}
// 				className="w-full font-bold leading-4 text-sm mb-3"
// 			>
// 				Welcome to OneHealth Nigeria – Your Trusted Pharmacy Benefits Provider
// 				and Online Pharmacy in Nigeria
// 			</motion.h1>
// 			<motion.p
// 				variants={Header}
// 				animate="animate"
// 				initial="initial"
// 				transition={{ duration: 0.65, delay: 0.6, ease: "backOut" }}
// 				exit={Header.exit}
// 				whileInView="animate"
// 				viewport={{
// 					once: true,
// 				}}
// 				className="mb-3"
// 			>
// 				OneHealth is a pioneering consumer healthcare company revolutionizing
// 				the healthcare landscape in Nigeria. As a technology-driven platform, we
// 				offer on-demand, home-delivered access to a comprehensive range of
// 				pharmaceutical and healthcare products. Our commitment extends beyond
// 				just delivering medications; we provide tools like medication reminders,
// 				medication sourcing, and continuous after-care support to ensure a
// 				holistic and personalized healthcare experience.
// 			</motion.p>
// 			<motion.h2
// 				variants={Header}
// 				animate="animate"
// 				initial="initial"
// 				transition={{ duration: 0.65, delay: 0.6, ease: "backOut" }}
// 				exit={Header.exit}
// 				whileInView="animate"
// 				viewport={{
// 					once: true,
// 				}}
// 				className="font-bold text-sm leading-4"
// 			>
// 				OneHealth&apos;s Core Offerings:
// 			</motion.h2>
// 			<motion.div
// 				variants={Header}
// 				animate="animate"
// 				initial="initial"
// 				transition={{ duration: 0.65, delay: 0.65, ease: "backOut" }}
// 				exit={Header.exit}
// 				whileInView="animate"
// 				viewport={{
// 					once: true,
// 				}}
// 				className="pl-5"
// 			>
// 				<ol>
// 					<li className="">OneHealth Pharmacy Benefit Solution:</li>

// 					<li className="pl-5 list-none">
// 						<ul>

// 						<li className="">
// 							A specialized solution tailored for HMOs, insurers, and
// 							marketplaces.
// 						</li>
// 						<li>
// 							Streamlining medication dispensing and fulfillment for enrollees,
// 							ensuring seamless and cost-effective healthcare management.
// 						</li>
// 						</ul>
// 					</li>
// 					<li value={2}>OneHealth Pharmacy Provider Network:</li>
// 					<li className="pl-5 list-none">
// 						<ul>

// 						<li>
// 							{" "}
// 							Join OneHealth’s extensive network of pharmacies across Nigeria to
// 							boost your revenue and increase pharmaceutical sales. Effortlessly
// 							fulfill orders received through the network, ensuring a smooth and
// 							efficient process.
// 						</li>
// 						<li>
// 							Tap into a vast customer base and receive additional orders
// 							through our platform, expanding your business opportunities.
// 						</li>
// 						<li>
// 							Benefit from a steady influx of orders from OneHealth and increase
// 							your pharmacy&apos;s productivity.
// 						</li>
// 						</ul>
// 					</li>
// 					<li value={3}>OneHealth Online Pharmacy:</li>
// 					<li className="pl-5 list-none">
// 						<ul>

// 						<li>
// 							{" "}
// 							Your digital gateway to convenient access to a wide range of
// 							pharmaceutical and healthcare products, delivered directly to your
// 							doorstep anywhere in Nigeria.
// 						</li>
// 						<li>
// 							Manage, order, and track medications effortlessly for yourself,
// 							employees, or enrollees – all from your phone or laptop.
// 						</li>
// 						</ul>
// 					</li>
// 				</ol>
// 			</motion.div>
// 			<motion.h2
// 				variants={Header}
// 				animate="animate"
// 				initial="initial"
// 				transition={{ duration: 0.65, delay: 0.6, ease: "backOut" }}
// 				exit={Header.exit}
// 				whileInView="animate"
// 				viewport={{
// 					once: true,
// 				}}
// 				className="w-full font-bold leading-4 text-sm mb-3"
// 			>
// 				Why Choose OneHealth?
// 			</motion.h2>
// 			<motion.ol
// 				variants={Header}
// 				animate="animate"
// 				initial="initial"
// 				transition={{ duration: 0.65, delay: 0.65, ease: "backOut" }}
// 				exit={Header.exit}
// 				whileInView="animate"
// 				viewport={{
// 					once: true,
// 				}}
// 				className="space-y-4 pl-5"
// 			>
// 				<motion.li
// 					variants={Header}
// 					animate="animate"
// 					initial="initial"
// 					transition={{ duration: 0.65, delay: 0.69, ease: "backOut" }}
// 					exit={Header.exit}
// 					whileInView="animate"
// 					viewport={{
// 						once: true,
// 					}}
// 				>
// 					Last-Mile Medication Delivery:
// 				</motion.li>
// 				<motion.li
// 					variants={Header}
// 					animate="animate"
// 					initial="initial"
// 					transition={{ duration: 0.65, delay: 0.7, ease: "backOut" }}
// 					exit={Header.exit}
// 					whileInView="animate"
// 					viewport={{
// 						once: true,
// 					}}
// 					className="pl-4 list-none"
// 				>
// 					<ul>

// 					<li>
// 						We take pride in being Nigeria’s first last-mile pharmacy and
// 						prescription delivery service for individuals, hospitals, HMOs,
// 						telemedicine companies, and their enrollees.
// 					</li>
// 					</ul>
// 				</motion.li>

// 				<motion.li
// 					variants={Header}
// 					animate="animate"
// 					initial="initial"
// 					transition={{ duration: 0.65, delay: 0.73, ease: "backOut" }}
// 					exit={Header.exit}
// 					whileInView="animate"
// 					viewport={{
// 						once: true,
// 					}}
// 					value={2}
// 				>
// 					Tailored Pharmacy Benefit Services:
// 				</motion.li>
// 				<motion.li
// 					variants={Header}
// 					animate="animate"
// 					initial="initial"
// 					transition={{ duration: 0.65, delay: 0.74, ease: "backOut" }}
// 					exit={Header.exit}
// 					whileInView="animate"
// 					viewport={{
// 						once: true,
// 					}}
// 					className="pl-4 list-none"
// 				>
// 					<ul>

// 					<li>
// 						Our pharmacy benefit management program is designed to enhance
// 						health outcomes, reduce risk, improve utilization, promote
// 						retention, and cut both waste and cost for your business.
// 					</li>
// 					</ul>
// 				</motion.li>

// 				<motion.li
// 					variants={Header}
// 					animate="animate"
// 					initial="initial"
// 					transition={{ duration: 0.65, delay: 0.6, ease: "backOut" }}
// 					exit={Header.exit}
// 					whileInView="animate"
// 					viewport={{
// 						once: true,
// 					}}
// 					value={3}
// 				>
// 					Seamless Medication Management:
// 				</motion.li>
// 				<motion.li
// 					variants={Header}
// 					animate="animate"
// 					initial="initial"
// 					transition={{ duration: 0.65, delay: 0.6, ease: "backOut" }}
// 					exit={Header.exit}
// 					whileInView="animate"
// 					viewport={{
// 						once: true,
// 					}}
// 					className="pl-4 list-none"
// 				>
// 					<ul>

// 					<li>
// 						Request, manage, order, and track prescription medications securely
// 						on our platform. From request to pharmacy, from pharmacy to delivery
// 						or pickup – experience seamless, quick, and confidential service.
// 					</li>
// 					</ul>
// 				</motion.li>

// 				<motion.li
// 					variants={Header}
// 					animate="animate"
// 					initial="initial"
// 					transition={{ duration: 0.65, delay: 0.69, ease: "backOut" }}
// 					exit={Header.exit}
// 					whileInView="animate"
// 					viewport={{
// 						once: true,
// 					}}
// 					value={4}
// 				>
// 					Customer-Centric Approach:
// 				</motion.li>
// 				<li className="pl-4 list-none">
// 					<ul>

// 					<li>
// 						Increase customer satisfaction by providing home delivery options or
// 						nearby pickup at our extensive pharmacy network.
// 					</li>
// 					</ul>
// 				</li>
// 				<li value={5}>Special Perks for Enrollees:</li>
// 				<li className="pl-4 list-none">
// 					<ul>

// 					<li>
// 						Enjoy free delivery for enrollees with chronic conditions and
// 						recurring prescription refills.
// 					</li>
// 					</ul>
// 				</li>

// 				<li value={6}>Get More Customers:</li>
// 				<li className="pl-4 list-none">
// 					<ul>

// 					<li>
// 						Leverage our growing online media presence. Partnering with us means
// 						sharing your plans with our over 150,000 users.
// 					</li>
// 					</ul>
// 				</li>
// 				<li value={7}>Professional Consultations and After-Care:</li>
// 				<li className="pl-4 list-none">
// 					<ul>

// 					<li>
// 						Benefit from free pharmacist consultations, patient follow-ups, and
// 						dedicated after-service care.
// 					</li>
// 					</ul>
// 				</li>
// 			</motion.ol>
// 			<p>
// 				Explore a Healthier Tomorrow with OneHealthNG - Your One-Stop Healthcare
// 				Solution!
// 			</p>
// 		</motion.div>
// 	);
// }
