/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		//
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./node_modules/flowbite/**/*.js',
	],

	darkMode: 'class',

	theme: {
		extend: {
			colors: {
				primary: {
					'50': '#fdf3f3',
					'100': '#fbe5e5',
					'200': '#f8d0d0',
					'300': '#f2afaf',
					'400': '#e88181',
					'500': '#db5858',
					'600': '#c73b3b',
					'700': '#a72e2e',
					'800': '#8a2a2a',
					'900': '#742828',
					'950': '#461313',
				}, 'gray': {
					'50': '#f4f5f7',
					'100': '#e3e4ea',
					'200': '#caccd7',
					'300': '#a6aaba',
					'400': '#7a7f96',
					'500': '#5f637b',
					'600': '#464758',
					'700': '#373c47',
					'800': '#272c33',
					'900': '#181b1f',
					'920': '#141719',
					'950': '#08090a',
				},
			},
			fontFamily: {
				sans: [
					'Manrope',
					'Inter',
					'ui-sans-serif',
					'system-ui',
					'-apple-system',
					'system-ui',
					'Segoe UI',
					'Roboto',
					'Helvetica Neue',
					'Arial',
					'Noto Sans',
					'sans-serif',
					'Apple Color Emoji',
					'Segoe UI Emoji',
					'Segoe UI Symbol',
					'Noto Color Emoji',
				],
				body: [
					'Manrope',
					'Inter',
					'ui-sans-serif',
					'system-ui',
					'-apple-system',
					'system-ui',
					'Segoe UI',
					'Roboto',
					'Helvetica Neue',
					'Arial',
					'Noto Sans',
					'sans-serif',
					'Apple Color Emoji',
					'Segoe UI Emoji',
					'Segoe UI Symbol',
					'Noto Color Emoji',
				],
				mono: [
					'ui-monospace',
					'SFMono-Regular',
					'Menlo',
					'Monaco',
					'Consolas',
					'Liberation Mono',
					'Courier New',
					'monospace',
				],
				bungo: [
					//'Protestant' let's not lol
					'Arial'
				]
			},
			transitionProperty: {
				width: 'width',
			},
			textDecoration: ['active'],
			minWidth: {
				kanban: '28rem',
			},
			cursor: {
				'pointer': 'url(/images/icons/cursor_pointer.png), pointer',
				'default': 'url(/images/icons/cursor_default.png), default',
			},
			animation: {
				bungie_loading_inner: 'bungie_loading_inner_frames 1.5s linear infinite',
				bungie_loading_outer: 'bungie_loading_outer_frames 3s linear infinite',
				'infinite-scroll': 'infinite-scroll 25s linear infinite',
			},
			keyframes: {
				bungie_loading_inner_frames: {
					'0%, 100%': { opacity: '0' },
					'5%': { opacity: '0.5' },
					'15%': { opacity: '0.5' },
					'35%': { opacity: '0' },
				},
				bungie_loading_outer_frames: {
					'0%, 100%': { opacity: '0' },
					'10%': { opacity: '0.3' },
					'15%': { opacity: '0.3' },
					'32%': { opacity: '0' },
				},
				'infinite-scroll': {
					from: { transform: 'translateX(0)' },
					to: { transform: 'translateX(-100%)' },
				}
			},
			boxShadow: {
				'awardGlow': '0px 0px 14px 8px rgba(240,217,170,0.8)',
				'awardGlowRed': '0px 0px 14px 8px rgba(212,47,47,0.8)',
			},
		},
		screens: {
			'sm': '640px',
			'md': '768px',
			'lg': '1024px',
			'xl': '1280px',
			'2xl': '1536px',
			'3xl': '2040px',
		},
	},

	safelist: [
		// In Markdown (README…)
		'justify-evenly',
		'overflow-hidden',
		'rounded-md',

		// From the Hugo Dashboard
		'w-64',
		'w-1/2',
		'rounded-l-lg',
		'rounded-r-lg',
		'bg-gray-200',
		'grid-cols-4',
		'grid-cols-7',
		'h-6',
		'leading-6',
		'h-9',
		'leading-9',
		'shadow-lg',
		'bg-opacity-50',
		'dark:bg-opacity-80',

		// For Astro one
		'grid',
	],

	plugins: [
		//
		//require('flowbite/plugin'),
		require('flowbite-typography'),
		require('@tailwindcss/typography'),
		require('@pyncz/tailwind-mask-image'),
		require('tailwind-scrollbar')({ nocompatible: true }),
	],
};
