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
		_light: 'hsl(222 50% 96%)',
		_dark: 'hsl(222 30% 16%)',
	},
	'bg-layer-3': {
		_light: 'hsl(222 50% 94%)',
		_dark: 'hsl(222 30% 17%)',
	},
	text: {
		_light: 'hsl(222 30% 30%)',
		_dark: 'hsl(222 50% 90%)',
	},
	heading: {
		_light: 'hsl(222, 46%, 44%)',
		_dark: 'hsl(222, 76%, 85%)',
	},
	'text-secondary': {
		_light: 'gray.600',
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
	'border-primary': {
		_light: 'hsl(222 35% 85%)',
		_dark: 'hsl(222, 30%, 25%)',
	},
}

export default colorTokens
