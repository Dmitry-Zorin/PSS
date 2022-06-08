import { grey, indigo } from '@mui/material/colors'
import { merge } from 'lodash'
import { baseTheme } from './base.theme'
import { muiTheme } from './mui.theme'

// https://coolors.co/3c3e75-fcfcf7-fffffa-ca3c25
const primary = indigo[500]
const secondary = primary
const bgPrimary = grey[50]
const bgSecondary = grey[100]

export const lightTheme = merge({}, baseTheme, {
	palette: {
		mode: 'light',
		primary: {
			light: primary,
			main: primary,
			dark: primary,
		},
		background: {
			default: bgPrimary,
			paper: bgPrimary,
		},
		text: {
			// secondary: '#5C5F58',
		},
		action: {
			// active: '#B73225',
		},
	},
	components: {
		MuiInputBase: {
			styleOverrides: {
				root: {
					background: bgSecondary,
				},
			},
		},
		RaLabeled: {
			styleOverrides: {
				root: {
					'.RaLabeled-label': {
						color: secondary,
					},
				},
			},
		},
		RaSidebar: {
			styleOverrides: {
				root: {
					'.RaSidebar-fixed': {
						background: bgSecondary,
					},
				},
			},
		},
		RaMenuItemLink: {
			styleOverrides: {
				root: {
					'&:hover': {
						background: 'rgba(0, 0, 0, 0.04)',
					},
					'&.RaMenuItemLink-active': {
						background: 'rgba(0, 0, 0, 0.04)',
						borderColor: muiTheme.palette.divider,
						'&, > *': {
							color: primary,
						},
					},
				},
			},
		},
	},
})
