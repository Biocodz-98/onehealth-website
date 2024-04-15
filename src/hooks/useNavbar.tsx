import {useEffect,useState} from 'react'
import useSearch from "@/hooks/useSearch";
import {useLocation } from "react-router-dom";

export default function useNavbar() {
	const [isHovered, setIsHovered] = useState<boolean>(false);
	const [hasSearch, setHasSearch] = useState<boolean>(false);
	const [openLogin, setOpenLogin] = useState<boolean>(false);
	const [callUs, setOpenCallUs] = useState<boolean>(false);
	const [showResourceMobile, setShowResourceMobile] = useState<boolean>(false);
	const [showServices, setShowService] = useState<boolean>(false);

	const [showWhatapp, setShowWhatapp] = useState<boolean>(false);
	const [screenSize, setScreenSize] = useState<{
		height: number;
		width: number;
	}>({
		width: window.innerWidth,
		height: window.innerHeight,
	});
	const [hasAdvertisement, setHasAdvertisement] = useState<boolean>(false); //use for displaying advertisement on the screen (default false - no advertisement)

	const [searchQuery,setSearchQuery] = useState<string>(""); //change search query to string
    const location = useLocation();
	//mobile devices
	const [active, setActive] = useState<boolean[]>([false, false, false, false]);

	const { error, searchResult, loading, setSearchResult } =
			useSearch(searchQuery);

	const checkpath = (item: string) => {
		const checker = item.trim().toLowerCase();
		console.log(checker, "item is login", checker === "cart");
		if (checker === "home" || location.pathname.toLowerCase() === "/") {
			setActive([true, false, false, false,false,false]);
		}
		if (checker === "services") {
			setActive([false, true, false, false, false, false]);
		}
		if (checker === "call us") {
			setActive([false, false, true, false, false, false]);
		}
		if (checker === "login") {
			setActive([false, false, false, true, false, false, false]);
		}
		if (checker === "/pharmacies") {
			setActive([false, false, false, false, true, false, false]);
		}
		if (checker === "/insurers") {
			setActive([false, false, false, false, false, true, false]);
		}
		if (
			checker !== "login" &&
			checker !== "services" &&
			checker !== "call us" &&
			checker !== "home" && 
			checker !== "/pharmacies" && 
			checker !== "/insurers"  

		) {
			setActive([false, false, false, false, false,false,false]);
		}
	};

	const closeAllPopups = () => {
		setShowResourceMobile(false);
		setOpenCallUs(false);
		setOpenLogin(false);
		setHasSearch(false);
		setShowService(false);
		setSearchResult([]);
	};

	//pop in whatsapp
	useEffect(() => {
		const timer = setTimeout(() => {
			setShowWhatapp(true);

			// Attempt to play alert sound
			// const alertSound = new Audio(WhatappSound);
			// alertSound.play().catch((error) => {
			// 	console.error("Failed to play alert sound:", error.message);
			// });
		}, 4000);

		return () => clearTimeout(timer);
	}, []);

	//handle screen sizes
	useEffect(() => {
		const handleResize = () => {
			setScreenSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	//scroll to top on router change
	useEffect(() => {
		window.scrollTo(0, 0);
		closeAllPopups()
		checkpath(location.pathname);
		console.log(location.pathname)
	}, [location.pathname]);
	return {
		closeAllPopups,
		checkpath,
		isHovered,
		setIsHovered,
		hasSearch,
		setHasSearch,
		hasAdvertisement,
		setHasAdvertisement,
		openLogin,
		setOpenLogin,
		callUs,
		setOpenCallUs,
		showResourceMobile,
		setShowResourceMobile,
		showServices,
		setShowService,
		showWhatapp,
		setShowWhatapp,
		setScreenSize,
		screenSize,
		active,
		setActive,
		searchQuery,
		setSearchQuery,
		error,
		searchResult,
		loading,
        setSearchResult
	};
}
