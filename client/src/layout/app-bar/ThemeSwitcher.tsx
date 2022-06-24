import { IconButton } from '@mui/material'
import { red, yellow } from '@mui/material/colors'
import { useEffect } from 'react'
import { useTheme } from 'react-admin'
import { Helmet } from 'react-helmet'
import { saveSettings } from 'requests'
import themes, { ThemeOptionsExtended } from 'themes'
import { DarkModeSwitch } from './Toggle'

const ThemeSwitcher = () => {
	const [theme, setTheme] = useTheme()

	useEffect(() => {
		if (!theme) {
			setTheme(themes.dark)
		}
	}, [theme, setTheme])

	if (!theme) {
		return null
	}

	const palette = (theme as ThemeOptionsExtended).palette
	const background = palette.background.default
	const mode = palette.mode
	const isDark = mode === 'dark'

	return (
		<>
			<Helmet>
				<meta name="theme-color" content={background} />
				<style type="text/css">{`body {	background-color: ${background} }`}</style>
			</Helmet>
			<IconButton onClick={() => setTheme(themes[isDark ? 'light' : 'dark'])}>
				<DarkModeSwitch
					sunColor={red[900]}
					moonColor={yellow[600]}
					checked={isDark}
					onChange={() => {
						return saveSettings({ theme: mode }).catch(null)
					}}
				/>
			</IconButton>
		</>
	)
}

export default ThemeSwitcher
