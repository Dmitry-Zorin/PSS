import { Pseudos, SemanticValue } from '@chakra-ui/styled-system'

function createColorTokens(name: string, color: string) {
	return {
		[name]: {
			_light: `${color}.600`,
			_dark: `${color}.400`,
		},
		[`${name}-light`]: {
			_light: `${color}.500`,
			_dark: `${color}.300`,
		},
		[`${name}-lighter`]: {
			_light: `${color}.400`,
			_dark: `${color}.200`,
		},
		[`${name}-dark`]: {
			_light: `${color}.700`,
			_dark: `${color}.500`,
		},
		[`${name}-darker`]: {
			_light: `${color}.800`,
			_dark: `${color}.600`,
		},
	}
}

const colorTokens: Record<string, SemanticValue<keyof Pseudos>> = {
	bg: {
		_light: 'white',
		_dark: 'gray.900',
	},
	text: {
		_light: 'gray.900',
		_dark: 'white',
	},
	'text-secondary': {
		_light: 'gray.600',
		_dark: 'gray.300',
	},
	border: {
		_light: 'gray.200',
		_dark: 'gray.700',
	},
	...createColorTokens('primary', 'blue'),
	...createColorTokens('secondary', 'cyan'),
}

export default colorTokens
