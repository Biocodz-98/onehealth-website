import { cn } from '@/lib/utils';

export interface WhyOneHealthProps {
    image:string;
    heading:string;
    description:string;
	cls?:string;
	alt?:string;
}

export default function WhyOneHealthCard({image,heading,description,cls,alt}: WhyOneHealthProps) {
  return (
		<div className={cn("flex flex-col gap-8 items-center max-w-96", cls)}>
			<div className=" min-w-full  flex flex-col justify-end rounded-[50px]  mb-7">
				<img
					loading="lazy"
					src={image}
					// height={200}
					// width={350}
					alt={alt}
					className="w-[90%] mx-auto"
				/>
			</div>
			<h1 className="text-[#228821] font-head text-2xl md:text-3xl font-semibold text-center text-nowrap">
				{heading}
			</h1>
			<p className="text-center font-light font-body md:leading-8 text-lg ">
				{description}
			</p>
		</div>
	);
}
