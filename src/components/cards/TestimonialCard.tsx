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
		<div className="flex flex-col gap-3 items-center bg-[#F0F2F5] w-56 h-56 max-w-56 rounded-3xl p-5">
			<p className="font-semibold font-head text-2xl leading-6 text-secondary text-nowrap">
				{title}
			</p>
			<div className="w-24 h-24 rounded-full bg-slate-200/50 bg-cover overflow-hidden">
				<img src={image} alt="testimonial images" className={`object-cover ${index ==0?"scale-150":""}`} />
			</div>
			<Link to={link} className="p-2.5 rounded-full bg-white ">
				<Icons.rightArrow strokec="#8DDE44" />
			</Link>
		</div>
	);
}
