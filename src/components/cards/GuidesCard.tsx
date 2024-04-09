import { cn } from "@/lib/utils";
export type GuideCardProps = {
	image: string;
	index?: number;
	imgCls?: string;
	cls?: string;
};
export default function GuidesCard({image,index,imgCls,cls}:GuideCardProps) {
  return (
		<div
			className={cn(
				`relative ${index == 0 ? "" : index == 1 ? "right-3" : "right-6"}`,
				cls
			)}
		>
			<img
				src={image}
				alt="24/7 Pharmacist Support - OneHealth Online Pharmacy in Nigeria"
				className={cn("", imgCls)}
			/>
		</div>
	);
}
