import {Link} from "react-router-dom";
import React from 'react'
import { Icons } from '../Icons';


interface TestimonialCardProps {
    title:string;
    image:string;
    link:string;
    index:number;
}
export default function TestimonialCard({title,image,link,index}:TestimonialCardProps) {
  return (
		<div className="cate flex flex-col gap-3 items-center bg-[#F0F2F5] w-48 md:w-56 md:h-56 max-w-56 rounded-3xl p-5">
			<h2 className="font-semibold font-head text-xl md:text-2xl leading-6 text-secondary text-nowrap">
				{title}
			</h2>
			<div className="w-24 h-24 rounded-full bg-slate-200/50 bg-cover overflow-hidden">
				<img src={image} alt="testimonial images" className={`object-cover ${index ==0?"scale-150":""}`} />
			</div>
			<Link to={link} className="p-2.5 rounded-full bg-white ">
				<Icons.rightArrow strokec="#8DDE44" />
			</Link>
		</div>
	);
}
