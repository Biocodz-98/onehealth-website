import MaxWithWrapper from "@/components/MaxWithWrapper";
import GuidianceContact from "@/components/GuidianceContact";
import {GuideCardData,ContactGuideInfoData} from "@/data/generalData"

export default function Enquires(){
    return (
			<section className="bg-white">
				<MaxWithWrapper className="md:px-10">
					<div className="flex flex-col mb-20 px-2 lg:px-[4rem]">
						<p className="mt-20 h-2 w-[90%] md:w-[60%] mx-auto bg-slate-200 rounded-3xl"></p>
						<GuidianceContact
							headingText1="Have Enquiries?  "
							headingText2="Speak with our in-house pharmacy partner support team"
							guidesCard={GuideCardData}
							contactGuideMini={ContactGuideInfoData}
							customH1Cls="text-[#8DDE44]"
							cls="px-3"
							
						/>
					</div>
				</MaxWithWrapper>
			</section>
		);
}