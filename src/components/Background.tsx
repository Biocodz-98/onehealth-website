import {HeroBGL,HeroBGR} from "@/data/imageData"
import { cn } from '@/lib/utils';

interface BGProps {
	cls?: string;
	cls1?: string;
	cls2?: string;
}

export default function Background(props:BGProps) {
  return (
		<div
			className={cn(
				"absolute -z-10 h-full w-full -top-5 flex -bottom-0 border-b-8 border-[#E9F9DB]",
				props.cls
			)}
		>
			<div className="relative w-full overflow-hidden object-cover">
				<img
					src={HeroBGR}
					className={cn(
						"h-[90vh] w-full absolute -right-28 top-5  object-cover ",
						props.cls2
					)}
					alt="bg image"
					width={500}
					height={400}
				/>
				<img
					src={HeroBGL}
					className={cn(
						"h-full w-full absolute top-48  object-cover",
						props.cls1
					)}
					alt="bg image"
					width={1409}
					height={490}
				/>
			</div>
		</div>
	);
}
