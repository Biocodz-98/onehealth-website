import {Link}  from 'react-router-dom';
import { Icons } from '@/components/Icons';
import { cn } from '@/lib/utils';
import { useState} from 'react';
import Modal from "@/components/Modal.tsx";
import ClientRegistrationModal from "@/components/ClientRegistrationModal.tsx";

export interface HeroCardProps {
	title: string;
	imagesrc?: string;
	Image?: string;
	action: { title: string; href: string; newPage?: boolean };
	imageCls?: string;
	iCls?: string;
	titleCls?: string;
	actionCls?: string;
	titleGrp?: string;
	className?: string;
	alt?: string;
	newPage?: boolean;
}
export default function HeroCard({
	title,
	imagesrc,
	action,
	className,
	imageCls,
	titleCls,
	actionCls,
	titleGrp,
	alt,
	newPage,
	iCls,
}: HeroCardProps) {

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [showRegistrationModal, setShowRegistrationModal] = useState(false)

	// const openRegistrationPopup = () => {
	//
	// }



	return (
		<>
			<Modal
				isOpen={showRegistrationModal}
				onClose={() => {setShowRegistrationModal(false)}}
			>
				<ClientRegistrationModal show={showRegistrationModal} setShow={setShowRegistrationModal}/>
			</Modal>

			<div
				className={cn(
					" grid grid-cols-12 grid-rows-12 md:flex md:flex-col md:max-w-[200px] md:max-h-[201px] w-full md:w-full p-3 rounded-3xl shadow-xs shadow-[#101928]/15 bg-white inset-0 drop-shadow-md md:px-5 px-1 m-1 border",
					className
				)}
			>
				<div
					className={cn(
						"text-xs uppercase font-sans tracking-wide font-semibold flex items-center gap-3 text-slate-600 leading-4 order-1 md:-order-1 col-span-6 row-span-6 pl-2 md:pl-0 ",
						titleGrp
					)}
				>
					<p className="w-5 bg-slate-600 h-0.5"/>
					<p className={cn("flex flex-nowrap text-nowrap", titleCls)}>
						{"  "} {title}
					</p>
				</div>
				<div
					className={cn(
						"bg-[#F4F4F4] md:p-1.5 md:m-1.5 px-3 md:mx-0 rounded-md relative h-24 md:w-40 md:my-3 overflow-hidden -order-1 md:order-1 col-span-6 row-span-12 mr-5 md:mr-0",
						imageCls
					)}
				>
					{/* <div className="absolute bg-slate-100 right-0 h-full w-full overflow-hidden"> */}
					<img
						loading="eager"
						src={imagesrc}
						alt={alt}
						className={cn(
							"w-full h-full scale-75 aspect-square object-contain relative -right-[25%] md:-right-[30%] ml-auto -bottom-5",
							iCls
						)}
					/>
					{/* </div> */}
				</div>
				<div
					className={cn(
						"action font-bold text-md leading-4 flex items-center justify-between text-primary mt-2 order-2 col-span-6 row-span-6 pl-2 md:pl-0",
						actionCls
					)}
				>
					{action.href == "register" ?
						<p onClick={() => setShowRegistrationModal(true) } className='cursor-pointer'>
							{action.title}
						</p> :
						<Link to={action.href} target={`${newPage == true ? "" : "_blank"}`}>
							{action.title}
						</Link>

					}

					<Icons.downArrow className="-rotate-90 text-primary font-bold"/>
				</div>
			</div>
		</>
	);
}
