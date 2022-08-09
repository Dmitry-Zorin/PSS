import { ColorHues } from '@chakra-ui/react'

const colors: Record<string, Partial<ColorHues>> = {
	text: {
		200: 'hsl(220 32% 86%)',
		500: 'hsl(220 26% 28%)',
	},
	border: {
		200: 'hsl(220 20% 90%)',
		500: 'hsl(220 26% 22%)',
	},
	bg: {
		100: 'hsl(220 0% 100%)',
		200: 'hsl(220 25% 97%)',
		300: 'hsl(220 21% 93%)',
		400: 'hsl(220 17% 89%)',
		500: 'hsl(220 26% 18%)',
		600: 'hsl(220 28% 16%)',
		700: 'hsl(220 30% 14%)',
		800: 'hsl(220 32% 12%)',
	},
	primary: {
		200: 'hsl(220 90% 80%)',
		500: 'hsl(220 55% 55%)',
	},
	gray: {
		100: 'hsl(220 29% 80%)',
		200: 'hsl(220 26% 75%)',
		300: 'hsl(220 23% 70%)',
		400: 'hsl(220 20% 65%)',
		500: 'hsl(220 15% 50%)',
		600: 'hsl(220 16% 45%)',
		700: 'hsl(220 17% 40%)',
		800: 'hsl(220 18% 35%)',
	},
}

export default colors