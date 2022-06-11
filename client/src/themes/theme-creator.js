import { merge } from 'lodash'
import { baseTheme } from './base.theme'

export function createTheme(colors, theme) {
	const colorTheme = {
		palette: {
			primary: {
				light: colors.primary,
				main: colors.primary,
				dark: colors.primary,
			},
			background: {
				default: colors.bgPrimary,
				paper: colors.bgPrimary,
			},
		},
		components: {
			RaAppBar: {
				styleOverrides: {
					root: {
						color: colors.text,
						background: colors.bgPrimary,
						borderColor: colors.divider,
					},
				},
			},
			RaLabeled: {
				styleOverrides: {
					root: {
						'.RaLabeled-label': {
							color: colors.secondary,
						},
					},
				},
			},
			RaSidebar: {
				styleOverrides: {
					root: {
						borderColor: colors.divider,
						'.RaSidebar-fixed': {
							background: colors.bgPrimary,
						},
					},
				},
			},
			RaMenuItemLink: {
				styleOverrides: {
					root: {
						'&.RaMenuItemLink-active': {
							borderColor: colors.divider,
							'&, > *': {
								color: colors.primary,
							},
						},
					},
				},
			},
		},
	}
	return merge({}, baseTheme, colorTheme, theme)
}
