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
			_focusVisible: {
				shadow: 'outline',
			},
		},
		variants: {
			ghost: {
				color: 'text-secondary',
				_hover: {
					bg: 'transparent',
					color: 'text-primary',
				},
				_active: {
					bg: 'transparent',
				},
			},
		},
	},
	Input: {
		variants: {
			filled: {
				field: {
					border: '1px',
					borderColor: 'border',
					bg: 'bg-layer-1',
					_hover: {
						bg: 'bg-layer-2',
					},
					_focus: {
						borderColor: 'text-primary',
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
				bg: 'bg-layer-1',
			},
		},
		sizes: {
			xs: {
				dialog: {
					maxW: '16rem',
				},
			},
		},
	},
}

export default components
