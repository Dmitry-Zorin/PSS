import { Pseudos, SemanticValue } from '@chakra-ui/styled-system'

const colorTokens: Record<string, SemanticValue<keyof Pseudos>> = {
	primary: {
		_light: `primary.500`,
		_dark: `primary.400`,
	},
	bg: {
		_light: 'white',
		_dark: 'hsl(222 30% 14%)',
	},
	'bg-layer-1': {
		_light: 'hsl(222 50% 97%)',
		_dark: 'hsl(222 30% 15%)',
	},
	'bg-layer-2': {
		_light: 'hsl(222 30% 96%)',
		_dark: 'hsl(222 28% 16%)',
	},
	'bg-layer-3': {
		_light: 'hsl(222 30% 94%)',
		_dark: 'hsl(222 27% 17%)',
	},
	text: {
		_light: 'hsl(222 25% 30%)',
		_dark: 'hsl(222 30% 90%)',
	},
	heading: {
		_light: 'hsl(222, 46%, 44%)',
		_dark: 'hsl(222, 76%, 85%)',
	},
	'text-secondary': {
		_light: 'gray.700',
		_dark: 'gray.200',
	},
	'text-primary': {
		_light: `primary.600`,
		_dark: `primary.300`,
	},
	border: {
		_light: 'hsl(222 30% 90%)',
		_dark: 'hsl(222, 25%, 20%)',
	},
}

export default colorTokens
