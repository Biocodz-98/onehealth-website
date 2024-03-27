import React from 'react'
import { Link } from 'react-router-dom'

export default function SearchItems({name,image,link}:{name:string,image:string,link:string}) {
  return (
		<div className="flex bg-slate-100 p-2">
			<Link to={link} className="flex gap-10 flex-wrap items-center">
				{/* <img
					src={image}
					alt="one health product images"
					className="h-20 w-24"
				/> */}
				<picture className="h-20 w-32">
					<source srcSet={image} type="image/webp" />
					<source srcSet={image} type="image/png" />
					<img src={image} alt="one health product images" />
				</picture>
				<p className="font-light font-body text-base">{name}</p>
			</Link>
		</div>
	);
}
