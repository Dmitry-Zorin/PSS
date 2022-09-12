import { ThemeComponents } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const inputField = {
	minH: 10,
	borderRadius: 'lg',
	bg: 'bg-layer-1',
	_placeholder: {
		color: 'text-secondary',
	},
	_hover: {
		borderColor: 'text-secondary',
	},
	_focusVisible: {
		borderColor: 'primary',
		shadow: '0 0 0 1px var(--chakra-colors-primary)',
		_placeholder: {
			color: 'text-secondary',
		},
	},
}

const components: ThemeComponents = {
	Modal: {
		baseStyle: {
			dialog: {
				bg: 'bg-layer-1',
				mx: { base: 4, md: 6 },
				mt: '15vh',
				px: { base: 0, md: 6 },
				py: 6,
				borderRadius: 'xl',
			},
			header: {
				pb: 4,
			},
			overlay: {
				backdropFilter: 'blur(1px)',
			},
		},
		sizes: {
			xs: {
				dialog: {
					maxW: 64,
				},
			},
		},
	},
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
		},
		variants: {
			solid: ({ colorScheme, ...props }) => ({
				color: 'bg',
				bg: 'primary',
				_hover: {
					opacity: 0.9,
					bg: 'primary',
				},
				_active: {
					opacity: 0.85,
					bg: 'primary',
				},
				_disabled: {
					opacity: '0.15 !important',
					bg: 'primary !important',
				},
				...(colorScheme === 'red' && {
					color: 'bg',
					bg: mode('red.500', 'red.400')(props),
					_hover: {
						opacity: 0.8,
						bg: mode('red.500', 'red.400')(props),
					},
					_active: {
						opacity: 0.7,
						bg: mode('red.500', 'red.400')(props),
					},
				}),
			}),
			ghost: {
				color: 'text-secondary',
				px: 3,
				_hover: {
					color: 'primary',
					bg: 'bg-layer-2',
				},
				_active: {
					bg: 'bg-layer-1',
				},
				_focusVisible: {
					shadow: '0 0 0 2px var(--chakra-colors-primary)',
				},
			},
			outline: {
				bg: 'bg-layer-1',
				borderColor: 'border',
				color: 'text-secondary',
				_hover: {
					color: 'primary',
					bg: 'bg-layer-2',
				},
				_active: {
					bg: 'bg-layer-1',
				},
				_focusVisible: {
					borderColor: 'transparent',
					shadow: '0 0 0 2px var(--chakra-colors-primary)',
				},
			},
			main: {
				rounded: 'full',
				colorScheme: 'primary',
				color: 'bg',
				bg: 'text-secondary',
				fontSize: 'xl',
				fontWeight: 'medium',
				px: 9,
				py: 7,
				_hover: {
					opacity: 0.9,
					bg: 'primary',
				},
				_active: {
					opacity: 0.85,
					bg: 'primary',
				},
			},
		},
	},
	Input: {
		baseStyle: {
			element: {
				color: 'text-secondary',
				_focus: {
					color: 'text',
				},
			},
		},
		variants: {
			outline: {
				field: inputField,
			},
		},
	},
	Textarea: {
		baseStyle: {
			element: {
				color: 'text-secondary',
				_focus: {
					color: 'text',
				},
			},
		},
		variants: {
			outline: {
				...inputField,
				minH: '5.25rem',
			},
		},
	},
	FormLabel: {
		baseStyle: {
			mb: 1.5,
		},
	},
	Form: {
		baseStyle: {
			helperText: {
				color: 'text-secondary',
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
		defaultProps: {
			autoSelect: false,
		},
		baseStyle: {
			button: {
				_focusVisible: {
					shadow: 'outline',
				},
			},
			list: {
				bg: 'bg-layer-1',
				zIndex: 'modal',
				px: 1,
			},
			groupTitle: {
				textAlign: 'center',
			},
			item: {
				color: 'text-secondary',
				borderRadius: 'md',
				span: {
					fontSize: 'md',
				},
				_focus: {
					bg: 'bg-layer-2',
					color: 'primary',
				},
				_active: {
					bg: 'bg-layer-2',
				},
			},
		},
	},
	Divider: {
		baseStyle: {
			opacity: 1,
		},
	},
	Badge: {
		baseStyle: {
			fontWeight: 'semibold',
			borderRadius: 'md',
			letterSpacing: 'wide',
			px: 2,
			py: 1,
		},
		variants: {
			subtle: {
				bg: 'bg-layer-2',
				color: 'text',
			},
		},
	},
}

export default components
