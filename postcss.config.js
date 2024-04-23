// const NODE_ENV = import.meta.env.VITE_NODE_ENV;
export default {
	plugins: {
		tailwindcss: {},
		autoprefixer: {},
		...(process.env.VITE_NODE_ENV === "production"
			? { cssnano: {} }
			: {}),
	},
};
