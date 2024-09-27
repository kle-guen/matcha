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
		fontSize: {
			sm: ['14px', '20px'],
			base: ['16px', '24px'],
			lg: ['20px', '28px'],
			xl: ['24px', '32px'],
			iconXl: ['120px', '140px'],
		}
	},
	plugins: [],
};
