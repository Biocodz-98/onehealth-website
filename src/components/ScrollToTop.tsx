// import { useEffect, useLayoutEffect } from "react";
// import { useNavigate } from "react-router-dom";

// function ScrollToTop() {
// 	const history = useNavigate();

// 	useEffect(() => {
// 		return history.listen(() => {
// 			// This function will be called when the route changes
// 			// Scroll to the top of the page
// 			window.scrollTo(0, 0);
// 		});
// 	}, [history]);

// 	// For synchronous scrolling (optional)
// 	useLayoutEffect(() => {
// 		// Scroll to the top of the page when the component mounts
// 		window.scrollTo(0, 0);
// 	}, []);

// 	return null; // This component doesn't render anything
// }
