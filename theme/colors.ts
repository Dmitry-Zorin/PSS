import { ColorHues } from '@chakra-ui/react'

const colors: Record<string, Partial<ColorHues>> = {
	border: {
		100: 'hsl(234 20% 90%)',
		800: 'hsl(222 25% 25%)',
	},
	bg: {
		100: 'hsl(234 0% 100%)',
		200: 'hsl(234 25% 97%)',
		300: 'hsl(234 20% 94%)',
		400: 'hsl(234 15% 91%)',
		500: 'hsl(223 32% 20%)',
		600: 'hsl(223 33% 18%)',
		700: 'hsl(222 34% 16%)',
		800: 'hsl(222 35% 14%)',
	},
	primary: {
		200: 'hsl(228 80% 80%)',
		500: 'hsl(228 55% 55%)',
	},
	gray: {
		100: 'hsl(228 20% 80%)',
		200: 'hsl(228 20% 75%)',
		300: 'hsl(228 20% 70%)',
		400: 'hsl(228 20% 65%)',
		500: 'hsl(228 15% 50%)',
		600: 'hsl(228 15% 45%)',
		700: 'hsl(228 15% 40%)',
		800: 'hsl(228 15% 35%)',
	},
}

export default colors
