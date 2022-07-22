import { ThemeComponents } from '@chakra-ui/react'
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools'

const components: ThemeComponents = {
	Button: {
		variants: {
			ghost: (props: StyleFunctionProps) => ({
				borderRadius: 'full',
				borderY: '1px',
				borderColor: 'transparent',
				_hover: {
					borderTopColor: mode('transparent', 'border')(props),
					borderBottomColor: mode('border', 'transparent')(props),
				},
			}),
		},
	},
	Input: {
		variants: {
			filled: {
				field: {
					borderRadius: 'full',
					bg: 'bg-100',
					_hover: { bg: 'bg-200' },
				},
			},
		},
	},
}

export default components
