import { Route,Routes } from "react-router-dom";
import Header from "@/components/Header";
import Insurers from "@/app/Insurers";
import Pharmacy from "@/app/Pharmacy";
import Root from "@/app/Landing";
import Footer from "@/components/Footer/Footer";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter } from "react-router-dom";

export default function OneRoutes() {
    return (
		<>
		
		<AnimatePresence>
		<BrowserRouter key={"mainrouter"}>
		<Header/>
		<Routes >
			
			<Route key={'home'} path="/" element={<Root/>}/>
			<Route key={'pharmacy'} path="/pharmacies" element={<Pharmacy/>}/>
			<Route key={'insurers'} path="/insurers" element={<Insurers/>}/>
		</Routes>
		<Footer/>
		</BrowserRouter>
		</AnimatePresence>
		</>
    )
}
