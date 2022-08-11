import { ColorHues } from '@chakra-ui/react'

const colors: Record<string, Partial<ColorHues>> = {
	text: {
		200: 'hsl(220 35% 90%)',
		500: 'hsl(220 25% 25%)',
	},
	border: {
		200: 'hsl(220 20% 90%)',
		500: 'hsl(220 25% 20%)',
	},
	bg: {
		100: 'hsl(220 0% 100%)',
		200: 'hsl(220 20% 97%)',
		300: 'hsl(220 18% 93%)',
		400: 'hsl(220 16% 89%)',
		500: 'hsl(220 28% 20%)',
		600: 'hsl(220 29% 17%)',
		700: 'hsl(220 32% 14%)',
		800: 'hsl(220 34% 12%)',
	},
	primary: {
		200: 'hsl(225 65% 75%)',
		500: 'hsl(225 50% 54%)',
	},
	gray: {
		100: 'hsl(225 28% 77%)',
		200: 'hsl(225 24% 72%)',
		300: 'hsl(225 20% 67%)',
		400: 'hsl(225 16% 62%)',
		500: 'hsl(225 12% 50%)',
		600: 'hsl(225 13% 45%)',
		700: 'hsl(225 14% 40%)',
		800: 'hsl(225 15% 35%)',
	},
}

export default colors
