import { IconButton } from '@mui/material'
import { DarkModeSwitch } from 'layout'
import { useEffect } from 'react'
import { useTheme } from 'react-admin'
import { Helmet } from 'react-helmet'
import { saveSettings } from 'requests'
import themes, { ThemeOptionsExtended } from 'themes'

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

	document.body.style.backgroundColor = background

	return (
		<>
			<Helmet>
				<meta name="theme-color" content={background} />
			</Helmet>
			<IconButton
				onClick={() => {
					setTheme(themes[isDark ? 'light' : 'dark'])
					saveSettings({ theme: mode }).catch(null)
				}}
			>
				<DarkModeSwitch checked={isDark} sunColor={color} moonColor={color} />
			</IconButton>
		</>
	)
}

export default ThemeSwitcher
