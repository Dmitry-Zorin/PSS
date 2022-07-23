import { ThemeComponents } from '@chakra-ui/react'

const components: ThemeComponents = {
	Button: {
		defaultProps: {
			variant: 'ghost',
		},
		baseStyle: {
			borderRadius: 'full',
			_focusVisible: {
				shadow: 'outline',
			},
		},
		variants: {
			ghost: {
				color: 'text-secondary',
				_hover: {
					color: 'text',
					bg: 'bg-layer-2',
				},
				_active: {
					bg: 'bg-layer-3',
				},
			},
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
			bg: 'dark.900',
			color: 'text-secondary',
			border: '1px',
			borderColor: 'border',
			borderRadius: 'md',
			fontWeight: 'normal',
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
	Drawer: {
		baseStyle: {
			dialog: {
				bg: 'bg',
			},
		},
	},
	CloseButton: {
		baseStyle: {
			color: 'text-secondary',
			borderRadius: 'full',
			_hover: {
				color: 'text',
				bg: 'bg-layer-1',
			},
			_active: {
				bg: 'bg-layer-2',
			},
		},
	},
}

export default components
