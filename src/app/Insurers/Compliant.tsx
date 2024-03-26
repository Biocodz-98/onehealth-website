import MaxWithWrapper from '@/components/MaxWithWrapper'
import SectionHeaderMini from '@/components/SectionHeaderMini'
import { CompliantData } from './data'
import { FemaleDoc } from '@/data/imageData'

function ComplaintItem({image, title,desc}:{image:string, title:string, desc:string}){
    return (
			<div className="flex gap-8 ">
				<div className="image py-5 w-16 h-16">
					<img
						src={image}
                        width={64}
                        height={64}
						alt="Expectation from your pharmacy manager; Optimized network delivery or pickup, regulatory compliance,advance technological support logistics image"
					/>
				</div>
				<div className="text space-y-3">
					<h5 className="text-[#114920] font-head font-bold text-xl">
						{title}
					</h5>
					<p className="text-[#475367] font-body font-medium">{desc}</p>
				</div>
			</div>
		);
}
export default function Compliant() {
  return (
		<MaxWithWrapper>
			<div className="my-20 mb-16 flex flex-col mx-5 md:mx-20 md:mt-44">
				<SectionHeaderMini
					tag="WE ARE COMPLIANT"
					headingText="What to expect from your Pharmacy Benefits Manager"
					lineCls="w-[150%]"
					secCls="w-full"
				/>
				<div className="grid md:grid-cols-2 gap-20 my-16">
					<div className="">
						<img
							src={FemaleDoc}
							alt="An elegant Female nurse, documenting patients compliants, we are compliant image"
						/>
					</div>
					<div className="flex flex-col justify-between h-full">
						{CompliantData.map((item, index) => (
							<ComplaintItem
								title={item.title}
								desc={item.description}
								image={item.image}
								key={index}
							/>
						))}
					</div>
				</div>
			</div>
		</MaxWithWrapper>
	);
}
