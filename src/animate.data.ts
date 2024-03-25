export const MobileNav = {
	initial: {
		x: "100%",
		opacity: 0,
	},
	animate: {
		x: 0,
		opacity: 1,
	},
	exit: {
		x: "100%",
		opacity: 0,
	},
};
export const Header = {
	initial: {
		y: 25,
		opacity: 0,
	},
	animate: {
		y: 0,
		opacity: 1,
	},
	exit: {
		y: 0,
		opacity: 1,
	},
};

export const _Header = {
	initial: {
		y: -25,
		opacity: 0,
	},
	animate: {
		y: 0,
		opacity: 1,
	},
	exit: {
		y: 0,
		opacity: 1,
	},
};
export const Footer = {
	initial: {
		y: -25,
		opacity: 0,
	},
	animate: (index: number) => ({
		y: 0,
		opacity: 1,

		transition: {
			delay: 0.03 * index,
		},
	}),
	exit: {
		y: 0,
		opacity: 1,
	},
};
export const H1P1R = {
	initial: {
		x: 250,
		opacity: 0,
	},
	animate: {
		x: 0,
		opacity: 1,
	},
	exit: {
		x: 0,
		opacity: 1,
	},
};

export const H1P1L = {
	initial: {
		x: -250,
		opacity: 0,
	},
	animate: {
		x: 0,
		opacity: 1,
	},
	exit: {
		x: 0,
		opacity: 1,
	},
};
export const Scale = {
	initial: {
		scale: "-50%",
		opacity: 0,
	},
	animate: {
		scale: "100%",
		opacity: 1,
	},
	exit: {
		scale: "50%",
		opacity: 1,
	},
};
