import { Pseudos, SemanticValue } from '@chakra-ui/styled-system'

const colorTokens: Record<string, SemanticValue<keyof Pseudos>> = {
	primary: {
		_light: `primary.500`,
		_dark: `primary.400`,
	},
	bg: {
		_light: 'white',
		_dark: 'hsl(220 30% 14%)',
	},
	'bg-layer-1': {
		_light: 'hsl(220 30% 98%)',
		_dark: 'hsl(220 29% 15%)',
	},
	'bg-layer-2': {
		_light: 'hsl(220 30% 96%)',
		_dark: 'hsl(220 28% 16%)',
	},
	'bg-layer-3': {
		_light: 'hsl(220 30% 94%)',
		_dark: 'hsl(220 27% 17%)',
	},
	heading: {},
	text: {
		_light: 'hsl(220 30% 25%)',
		_dark: 'hsl(220 30% 90%)',
	},
	'text-secondary': {
		_light: 'gray.800',
		_dark: 'gray.200',
	},
	'text-primary': {
		_light: `primary.600`,
		_dark: `primary.300`,
	},
	border: {
		_light: '#e1e4ef',
		_dark: '#21293b',
	},
}

export default colorTokens
