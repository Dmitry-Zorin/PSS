import { ThemeComponents } from '@chakra-ui/react'

const components: ThemeComponents = {
	Container: {
		baseStyle: {
			px: 6,
		},
	},
	Stack: {
		defaultProps: {
			spacing: 0,
		},
	},
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
					bg: 'bg-layer-2',
					color: 'primary',
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
					border: '1px',
					borderColor: 'border',
					bg: 'bg-layer-1',
					_hover: {
						bg: 'bg-layer-2',
					},
					_focus: {
						borderColor: 'primary',
					},
				},
			},
		},
	},
	Tooltip: {
		baseStyle: {
			bg: 'bg',
			color: 'text',
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
			borderRadius: 'full',
			color: 'text-secondary',
			_hover: {
				bg: 'transparent',
				color: 'primary',
			},
			_active: {
				bg: 'transparent',
			},
		},
	},
}

export default components
