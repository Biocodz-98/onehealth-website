import {Link} from 'react-router-dom'

export default function OpenButton({title,href}:{ title:string,href:string}) {
  return (
		<Link
			content="open in same window"
			aria-label="open in same window"
			to={href}
			className="text-center w-52 font-sans font-semibold font-sm leading-4 text-white rounded-3xl px-5 py-2.5 border-2 border-slate-100"
			target="_blank"
		>
			{title}
		</Link>
	);
}
