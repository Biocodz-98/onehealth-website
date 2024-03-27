import { cn } from '@/lib/utils';
import SectionHeader from '../SectionHeader';
import SectionCardMini , { SectionCardMiniProps } from './SectionCardMini';

export interface SectionCardProps {
	tag: string;
	headingText: string;
	subHeadingText: string;
	contentImage: string;
	contentImageAlt: string;
	contentSectionCards: SectionCardMiniProps[];
	clsContent2?: string;
	parentCls?: string;
	imageCls?: string;
	imageWCls?: string;
	borderClip?: string;
	contentCls?: string;
	sectionCls?: string;
}

export default function SectionCard(props:SectionCardProps) {
  return (
		<section className={cn("relative  w-full min-h-[88.5vh] h-fit mb-20 flex flex-col items-center px-4 md:px-0",props.sectionCls)}>
			<div className="bg-[#228821] z-0 absolute rounded-3xl md:rounded-[6rem] lg:rounded-[160px] w-[99.6%] h-full mx-auto overflow-hidden">
				<div className="section-card-clip-right bg-[#27634E61] absolute z-10 w-full h-full rounded-3xl md:rounded-[6rem] lg:rounded-[160px] "></div>
				<div className="section-card-clip-left bg-[#10441E1C] absolute z-10 w-full h-full rounded-3xl md:rounded-[6rem] lg:rounded-[160px]"></div>
			</div>
			<div
				className={cn(
					"content bg-white relative z-20 mx-auto flex flex-col place-content-center rounded-3xl md:rounded-[40px] my-12 md:my-28 p-10 px-3 md:p-10 lg:p-20 gap-12 md:gap-16 w-[97%] md:w-[86%]",
					props.contentCls
				)}
			>
				<SectionHeader
					tag={props.tag}
					headingText={props.headingText}
					subHeadingText={props.subHeadingText}
					// className="relative z-20 mx-auto"
				/>
				<div
					className={cn(
						"content2 flex flex-col md:flex-row justify-between p-5 px-3 md:px-0 lg:px-10",
						props.parentCls
					)}
				>
					<div className={cn("cards grid md:grid-cols-2", props.clsContent2)}>
						{props.contentSectionCards.map((item, index) => (
							<SectionCardMini
								key={index}
								title={item.title}
								subTitle={item.subTitle}
								image={item.image}
								imageAlt={item.imageAlt}
							/>
						))}
					</div>
					<div className={cn("image", props.imageWCls)}>
						<div className={cn("", props.borderClip)}></div>
						<img
							src={props.contentImage}
							alt={props.contentImageAlt}
							className={cn("", props.imageCls)}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
