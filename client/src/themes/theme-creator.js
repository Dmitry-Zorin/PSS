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
						background: colors.bgPrimary,
						borderBottom: `1px solid ${colors.divider}`,
						color: colors.text,
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
						borderRight: `1px solid ${colors.divider}`,
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
