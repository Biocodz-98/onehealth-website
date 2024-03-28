import { FaWhatsapp } from "react-icons/fa";
import { Link} from "react-router-dom";


export default function Whatsapp() {
  return (
		<Link to="https://wa.me/+2348179017319" target='_blank' className=" fixed bottom-[10%] md:bottom-[5%] px-3 right-0 z-40 ">
			<FaWhatsapp className="text-green-500 text-[4rem]" />
		</Link>
	);
}
