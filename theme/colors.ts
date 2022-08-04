import { ColorHues } from '@chakra-ui/react'

const colors: Record<string, Partial<ColorHues>> = {
	text: {
		200: 'hsl(223 33% 92%)',
		500: 'hsl(223 33% 24%)',
	},
	border: {
		200: 'hsl(223 20% 90%)',
		500: 'hsl(223 32% 20%)',
	},
	bg: {
		100: 'hsl(223 0% 100%)',
		200: 'hsl(223 12% 97%)',
		300: 'hsl(223 10% 94%)',
		400: 'hsl(223 8% 91%)',
		500: 'hsl(223 31% 21%)',
		600: 'hsl(223 32% 19%)',
		700: 'hsl(223 33% 17%)',
		800: 'hsl(223 34% 15%)',
	},
	primary: {
		200: 'hsl(230 80% 80%)',
		500: 'hsl(228 60% 57%)',
	},
	gray: {
		100: 'hsl(230 26% 80%)',
		200: 'hsl(230 23% 75%)',
		300: 'hsl(230 20% 70%)',
		400: 'hsl(230 17% 65%)',
		500: 'hsl(228 15% 50%)',
		600: 'hsl(228 16% 45%)',
		700: 'hsl(228 17% 40%)',
		800: 'hsl(228 18% 35%)',
	},
}

export default colors
