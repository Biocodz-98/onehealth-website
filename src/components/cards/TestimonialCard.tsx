import {Link} from "react-router-dom";
import { Icons } from '../Icons';


interface TestimonialCardProps {
    title:string;
    image:string;
    alt:string;
    link:string;
    index:number;
}
export default function TestimonialCard({title,image,link,index,alt}:TestimonialCardProps) {
  return (
		<div className="cate flex flex-col gap-3 items-center bg-[#F0F2F5] w-54 md:w-54 md:h-56 max-w-72 rounded-3xl p-5">
			<h2 className="font-semibold font-head text-xl md:text-2xl leading-6 text-secondary text-wrap text-center ">
				{title}
			</h2>
			<div className="w-24 h-24 rounded-full bg-slate-200/50 bg-cover overflow-hidden">
				<img
					loading="lazy"
					src={image}
					alt={alt}
					className={`object-cover ${index == 0 ? "scale-100" : ""}`}
				/>
			</div>
			<Link to={link} className="p-2.5 rounded-full bg-white ">
				<Icons.rightArrow strokec="#8DDE44" />
			</Link>
		</div>
	);
}
