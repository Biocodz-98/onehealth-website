import Hero from "./Hero"
import Sponsors from './Sponsors'
import ServiceProvider from './ServiceProvider'
import Enrollees from './Enrollees'
import Reliable from './Reliable'
import Compliant from './Compliant'
import Enquiries from "../Pharmacy/Enquiries";
import {motion} from "framer-motion"


export default function index() {
  return (
		<motion.div
			initial={{ opacity: 0, scaleZ: -10 }}
			animate={{ opacity: 1,  scaleZ: 1 }}
			transition={{ duration: 0.75, ease: "easeOut" }}
			exit={{ opacity: 1, scaleZ: -10 }}
      className='relative'
		>
    <Hero/>
    <Sponsors/>
    <ServiceProvider/>
    <Enrollees/>
    <Reliable/>
    <Compliant/>
    <Enquiries/>
    </motion.div>
  )
}
