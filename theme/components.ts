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
			borderRadius: 'lg',
			_focusVisible: {
				shadow: 'outline',
			},
		},
		variants: {
			ghost: {
				color: 'text-tertiary',
				_hover: {
					bg: 'bg-layer-2',
					color: 'text-primary',
				},
				_active: {
					bg: 'bg-layer-1',
				},
			},
		},
	},
	Input: {
		baseStyle: {
			element: {
				color: 'text-tertiary',
				_focus: {
					color: 'text',
				},
			},
		},
		variants: {
			outline: {
				field: {
					borderRadius: 'lg',
					_placeholder: {
						borderColor: 'primary',
						color: 'text-tertiary',
					},
					_hover: {
						borderColor: 'primary',
					},
					_focus: {
						// borderColor: 'primary',
						_placeholder: {
							color: 'text-secondary',
						},
					},
				},
			},
		},
	},
	Tooltip: {
		baseStyle: {
			bg: 'bg-layer-1',
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
				color: 'text-secondary',
				borderRadius: 'lg',
				p: 1,
			},
			item: {
				borderRadius: 'md',
				_focus: {
					bg: 'bg-layer-3',
					color: 'text',
				},
				_active: {
					bg: 'bg-layer-2',
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
