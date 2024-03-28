import {Link} from 'react-router-dom'

export default function FillButtonC({title,href}:{ title:string,href:string}) {
  return (
		<Link
			to={href}
			className="w-64 text-center font-sans font-semibold font-sm leading-4 text-white bg-[#F0F2F5]/15 rounded-3xl px-2 py-2"
		>
			{title}
		</Link>
	);
}
