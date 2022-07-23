import { Pseudos, SemanticValue } from '@chakra-ui/styled-system'

function createColorTokens(name: string, color: string) {
	return {
		[name]: {
			_light: `${color}.500`,
			_dark: `${color}.300`,
		},
		[`${name}-light`]: {
			_light: `${color}.400`,
			_dark: `${color}.200`,
		},
		[`${name}-lighter`]: {
			_light: `${color}.300`,
			_dark: `${color}.100`,
		},
		[`${name}-dark`]: {
			_light: `${color}.600`,
			_dark: `${color}.400`,
		},
		[`${name}-darker`]: {
			_light: `${color}.700`,
			_dark: `${color}.300`,
		},
	}
}

const colorTokens: Record<string, SemanticValue<keyof Pseudos>> = {
	bg: {
		_light: 'hsl(225, 100%, 99%)',
		_dark: 'dark.800',
	},
	'bg-layer-1': {
		_light: 'light.50',
		_dark: 'dark.700',
	},
	'bg-layer-2': {
		_light: 'light.100',
		_dark: 'dark.600',
	},
	'bg-layer-3': {
		_light: 'light.200',
		_dark: 'dark.500',
	},
	text: {
		_light: 'dark.400',
		_dark: 'light.300',
	},
	'text-on-layer-1': {
		_light: 'dark.500',
		_dark: 'light.100',
	},
	'text-on-layer-2': {
		_light: 'dark.600',
		_dark: 'light.50',
	},
	'text-secondary': {
		_light: 'gray.500',
		_dark: 'gray.300',
	},
	'text-secondary-on-layer-1': {
		_light: 'gray.600',
		_dark: 'gray.200',
	},
	'text-secondary-on-layer-2': {
		_light: 'gray.700',
		_dark: 'gray.100',
	},
	border: {
		_light: '#e1e4ef',
		_dark: '#2c3244',
	},
	...createColorTokens('primary', 'primary'),
	...createColorTokens('secondary', 'gray'),
}

export default colorTokens
