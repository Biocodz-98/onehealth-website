export type GuideCardProps = { image: string; index?: number };
export default function GuidesCard({image,index}:GuideCardProps) {
  return (
		<div
			className={`relative ${
				index == 0 ? "" : index==1? "right-3":"right-6"
			}`}
		>
			<img src={image} alt="guides image" />
		</div>
	);
}
