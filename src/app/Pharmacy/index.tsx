import React from 'react'
import Hero from './Hero'
import PharmaCustomers from './PharmaCustomers'
import ElevatePharmacy from './ElevatePharmacy'
import PharmaSales from './PharmaSales'
import Enquiries from "./Enquiries"
import { motion } from 'framer-motion'

export default function Pharmacy() {
  return (
    <motion.div
			initial={{ opacity: 0, scaleZ: -10 }}
			animate={{ opacity: 1,  scaleZ: 1 }}
			transition={{ duration: 0.75, ease: "easeOut" }}
			exit={{ opacity: 1, scaleZ: -10 }}
		>
    <Hero/>
    <PharmaCustomers/>
    <ElevatePharmacy/>
    <PharmaSales/>
    <Enquiries/>
    </motion.div>
  )
}
