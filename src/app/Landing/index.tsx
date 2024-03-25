import React from 'react'
import Hero from "./Hero";
import CareSolution from './CareSolution';
import WhyOneHealth from './WhyOneHealth';
import OneHealthPlatform from './OneHealthPlatform';
import Testimonial from './Testimonial';
import {motion} from "framer-motion"

export default function index() {
  return (
		<motion.div
			initial={{ opacity: 0, scaleZ: -10 }}
			animate={{ opacity: 1,  scaleZ: 1 }}
			transition={{ duration: 0.75, ease: "easeOut" }}
			exit={{ opacity: 1, scaleZ: -10 }}
		>
			<Hero />
			<CareSolution />
			<WhyOneHealth />
			<OneHealthPlatform />
			<Testimonial />
		</motion.div>
	);
}

