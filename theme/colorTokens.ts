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
		_light: 'gray.200',
		_dark: '#141724',
	},
	'bg-secondary': {
		_light: 'gray.200',
		_dark: 'gray.800',
	},
	'bg-50': {
		_light: 'gray.50',
		_dark: 'whiteAlpha.50',
	},
	'bg-100': {
		_light: 'gray.100',
		_dark: 'whiteAlpha.100',
	},
	'bg-200': {
		_light: 'gray.200',
		_dark: 'whiteAlpha.200',
	},
	text: {
		_light: 'gray.700',
		_dark: 'gray.300',
	},
	'text-secondary': {
		_light: 'gray.500',
		_dark: 'gray.400',
	},
	border: {
		_light: 'gray.200',
		_dark: 'whiteAlpha.200',
	},
	...createColorTokens('primary', 'indigo'),
	...createColorTokens('secondary', 'gray'),
}

export default colorTokens
