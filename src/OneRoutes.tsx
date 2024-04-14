import { Route,Routes } from "react-router-dom";
import Header from "@/components/Header";
import Insurers from "@/app/Insurers";
import Pharmacy from "@/app/Pharmacy";
import Root from "@/app/Landing";
import Footer from "@/components/Footer/Footer";
import { AnimatePresence } from "framer-motion";


export default function OneRoutes() {
    return (
		<>
		<AnimatePresence>
		<Header/>
		<Routes>
			
			<Route path="/" element={<Root/>}/>
			<Route path="/pharmacies" element={<Pharmacy/>}/>
			<Route path="/insurers" element={<Insurers/>}/>
		</Routes>
		<Footer/>
		</AnimatePresence>
		</>
    )
}
