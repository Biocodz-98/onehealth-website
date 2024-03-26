import React from 'react'
import { SponsorImageList } from './data';
import MaxWithWrapper from '@/components/MaxWithWrapper';

export function ImageCard({imgSrc}:{imgSrc:string}) {
	return (
		<div className="px-4 h-14 md:min-w-32 max-w-36 md:max-w-44 flex place-content-center ">
			<img src={imgSrc} alt="Proud Sponsors of onehealth organization image " />
		</div>
	);
}
export default function Sponsors() {
  return (
		<section className="py-20 md:pt-32">
			<MaxWithWrapper>
				<div className=" space-y-9">
					<p className="p-2  px-5 md:px-10 text-sm text md:text-base rounded-3xl bg-slate-200 w-fit mx-auto">
						TRUSTED BY 20+ LEADING INSURERS IN NIGERIA
					</p>
					<div
						className=" overflow-x-auto md:max-w-[80%]  mx-auto flex flex-wrap md:flex-nowrap
		 gap-5 px-10 py-10 w-full place-content-center"
					>
							{SponsorImageList.map((item, index) => (
								<ImageCard imgSrc={item} key={index} />
							))}
					</div>
				</div>
			</MaxWithWrapper>
		</section>
	);
}
