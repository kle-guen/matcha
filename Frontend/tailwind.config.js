/** @type {import('tailwindcss').Config} */
module.exports = {

	content: [
		"./src/**/*.{html,ts}",
	],
	theme: {
		extend: {
			screens: {
				'mobile': {'max': '767px'},
				'tablet': '768px',
				'desktop': '1280px',
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
