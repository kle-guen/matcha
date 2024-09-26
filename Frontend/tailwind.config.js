/** @type {import('tailwindcss').Config} */
module.exports = {

	content: [
		"./src/**/*.{html,ts}",
	],
	theme: {
		extend: {
			screens: {
				'tablet': '768px',
				// => @media (min-width: 768px) { ... }

				'desktop': '1280px',
				// => @media (min-width: 1024px) { ... }
				//
				// 'mobile': '600px',
				// 'tablet': '900px',
				// 'laptop': '1024px'
			}
		},
	},
	plugins: [],
};
