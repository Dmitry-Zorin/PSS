import { Pseudos, SemanticValue } from '@chakra-ui/styled-system'

const colorTokens: Record<string, SemanticValue<keyof Pseudos>> = {
	primary: {
		_light: `primary.500`,
		_dark: `primary.300`,
	},
	bg: {
		_light: 'white',
		_dark: 'hsl(222 30% 14%)',
	},
	'bg-layer-1': {
		_light: 'hsl(222 50% 97%)',
		_dark: 'hsl(222 28% 16%)',
	},
	'bg-layer-2': {
		_light: 'hsl(222 30% 92%)',
		_dark: 'hsl(222, 28%, 18%)',
	},
	'bg-layer-3': {
		_light: 'hsl(222 30% 92%)',
		_dark: 'hsl(222, 28%, 20%)',
	},
	text: {
		_light: 'hsl(222 30% 30%)',
		_dark: 'hsl(222 42% 90%)',
	},
	heading: {
		_light: 'hsl(222 48% 45%)',
		_dark: 'hsl(222 78% 80%)',
	},
	'text-secondary': {
		_light: 'gray.500',
		_dark: 'gray.300',
	},
	'text-tertiary': {
		_light: 'gray.400',
		_dark: 'gray.400',
	},
	'text-primary': {
		_light: `primary.600`,
		_dark: `primary.200`,
	},
	border: {
		_light: 'hsl(222 30% 90%)',
		_dark: 'hsl(222, 25%, 20%)',
	},
	'border-focus': {
		_light: 'hsl(222 25% 80%)',
		_dark: 'hsl(222, 20%, 40%)',
	},
}

export default colorTokens
