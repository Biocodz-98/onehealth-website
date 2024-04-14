import MaxWithWrapper from '@/components/MaxWithWrapper'
import { PharmaSalesPills,MapImage} from "@/data/imageData";
import { ReliableItems1, ReliableItems2 } from "./data";

function ReliableItems({number,desc,index}:{number:string,desc:string,index?:number}){
    return (
			<div className={`flex flex-col place-content-center h-fit gap-3 `}>
				<p
					className={`font-bold text-[2.5rem] flex items-center font-body h-10 pl-10 border-l-4  ${
						index == 0
							? "border-[#8DDE44] text-[#8DDE44]"
							: "border-black text-[#1D1D1F]"
					}`}
				>
                    
					{number}
				</p>
				<p className="pl-11 font-body text-xs ">{desc}</p>
			</div>
		);
}
export default function Reliable() {
  return (
		<section className="md:p-10 p-4 pt-16 relative bg-[#F1FCF2] pb-36">
			<img
				loading="lazy"
				src={PharmaSalesPills}
				alt="why one health image of a capsule container with pills"
				className="absolute right-0  w-[40%] top-0"
			/>
			<MaxWithWrapper className='px-0 md:px-16'>
				<p className="section-tag mx-auto uppercase">We 🚚 go the mile</p>
				<h2 className="text-secondary font-semibold md:leading-[60px] text-2xl md:text-[2.5rem] font-head w-fit mx-auto my-8 md:text-start text-center">
					A reliable pharmacy at every corner of the country
				</h2>
				<div className="flex md:flex-row flex-col w-full place-content-center items-center justify-around mt-20 gap-14">
					<div className="items1 flex flex-col gap-10">
						{ReliableItems1.map((item, index) => (
							<ReliableItems
								key={index}
								number={item.number}
								desc={item.description}
								index={index}
							/>
						))}
					</div>
					<div className="map">
						<img
							loading="lazy"
							src={MapImage}
							alt="Map showing Coverage of the entire 36 states in Nigeria with our healthcare delivery Image"
						/>
					</div>
					<div className="items2 flex flex-col gap-10">
						{ReliableItems2.map((item, index) => (
							<ReliableItems
								key={index}
								number={item.number}
								desc={item.description}
							/>
						))}
					</div>
				</div>
			</MaxWithWrapper>
		</section>
	);
}
