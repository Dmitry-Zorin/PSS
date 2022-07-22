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
		_light: 'light.50',
		_dark: 'dark.800',
	},
	'bg-secondary': {
		_light: 'light.100',
		_dark: 'dark.700',
	},
	'bg-50': {
		_light: 'light.100',
		_dark: 'dark.700',
	},
	'bg-100': {
		_light: 'light.300',
		_dark: 'dark.600',
	},
	'bg-200': {
		_light: 'light.400',
		_dark: 'dark.500',
	},
	text: {
		_light: 'dark.300',
		_dark: 'light.200',
	},
	'text-secondary': {
		_light: 'gray.500',
		_dark: 'gray.300',
	},
	border: {
		_light: 'light.400',
		_dark: 'dark.400',
	},
	'alpha-50': {
		_light: 'blackAlpha.50',
		_dark: 'whiteAlpha.50',
	},
	'alpha-100': {
		_light: 'blackAlpha.100',
		_dark: 'whiteAlpha.100',
	},
	...createColorTokens('primary', 'primary'),
	...createColorTokens('secondary', 'gray'),
}

export default colorTokens
