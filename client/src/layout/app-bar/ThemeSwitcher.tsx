import { IconButton } from '@mui/material'
import { useEffect } from 'react'
import { useTheme } from 'react-admin'
import { Helmet } from 'react-helmet'
import { saveSettings } from 'requests'
import themes, { ThemeOptionsExtended } from 'themes'
import { DarkModeSwitch } from './Toggle'

const ThemeSwitcher = () => {
	const [theme, setTheme] = useTheme()

	useEffect(() => {
		setTheme(themes[theme?.palette?.mode || 'dark'])
	}, [theme, setTheme])

	if (!theme) {
		return null
	}

	const palette = (theme as ThemeOptionsExtended).palette
	const background = palette.background.default
	const color = palette.text.primary
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
					sunColor={color}
					moonColor={color}
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
