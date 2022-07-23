import { ThemeComponents } from '@chakra-ui/react'

const components: ThemeComponents = {
	Button: {
		baseStyle: {
			borderRadius: 'full',
		},
	},
	Input: {
		variants: {
			filled: {
				field: {
					borderRadius: 'full',
					bg: 'bg-layer-1',
					_hover: {
						bg: 'bg-layer-2',
					},
				},
			},
		},
	},
	Tooltip: {
		baseStyle: {
			bg: 'bg-layer-3',
			color: 'black',
		},
	},
	Menu: {
		baseStyle: {
			button: {
				_focusVisible: {
					shadow: 'outline',
				},
			},
			list: {
				bg: 'bg-layer-1',
				color: 'text-secondary-on-layer-1',
				borderRadius: 'lg',
				p: 1,
			},
			item: {
				borderRadius: 'md',
				_focus: {
					bg: 'bg-layer-2',
				},
				_active: {
					bg: 'bg-layer-3',
				},
			},
		},
	},
}

export default components
