import React from "react";

export const useDeviceWidth = () => {
	const [isDesktop, setIsDesktop] = React.useState(false);
	const [isTablet, setIsTablet] = React.useState(false);
	const [isMobile, setIsMobile] = React.useState(false);
	const [width, setWidth] = React.useState(0);

	React.useEffect(() => {
		setWidth(window.innerWidth);

		const handleResize = () => setWidth(window.innerWidth);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	React.useEffect(() => {
		if (width > 1024) {
			setIsDesktop(true);
			setIsTablet(false);
			setIsMobile(false);
		} else if (width > 768) {
			setIsDesktop(false);
			setIsTablet(true);
			setIsMobile(false);
		} else {
			setIsDesktop(false);
			setIsTablet(false);
			setIsMobile(true);
		}
	}, [width]);

	return {
		isDesktop,
		isMobile,
		isTablet,
		width,
	};
};
