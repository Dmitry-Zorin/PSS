import { Pseudos, SemanticValue } from '@chakra-ui/styled-system'
import colors from './colors'

function addAlpha(color: string, alpha: number) {
	return color.replace(')', ` / ${alpha * 100}%)`)
}

const colorTokens: Record<string, SemanticValue<keyof Pseudos>> = {
	primary: {
		_light: `primary.500`,
		_dark: `primary.200`,
	},
	'primary-alpha': {
		_light: addAlpha(colors.primary[500]!, 0.1),
		_dark: addAlpha(colors.primary[200]!, 0.1),
	},
	bg: {
		_light: 'bg.100',
		_dark: 'bg.800',
	},
	'bg-layer-1': {
		_light: 'bg.200',
		_dark: 'bg.700',
	},
	'bg-layer-2': {
		_light: 'bg.300',
		_dark: 'bg.600',
	},
	'bg-layer-3': {
		_light: 'bg.400',
		_dark: 'bg.500',
	},
	text: {
		_light: 'text.800',
		_dark: 'text.100',
	},
	'text-secondary': {
		_light: 'gray.600',
		_dark: 'gray.300',
	},
	'text-tertiary': {
		_light: 'gray.500',
		_dark: 'gray.400',
	},
	'text-primary': {
		_light: `primary.500`,
		_dark: `primary.200`,
	},
	border: {
		_light: 'text.100',
		_dark: 'text.800',
	},
}

export default colorTokens
