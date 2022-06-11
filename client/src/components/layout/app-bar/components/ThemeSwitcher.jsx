import { IconButton } from '@mui/material'
import { orange, yellow } from '@mui/material/colors'
import { useEffect, useState } from 'react'
import { useTheme } from 'react-admin'
import { Helmet } from 'react-helmet'
import { DarkModeSwitch } from 'react-toggle-dark-mode/dist'
import { saveSettings } from 'requests'
import themes from 'themes'
import { getUser } from 'user'

export const ThemeSwitcher = () => {
	const [theme, setTheme] = useTheme()
	const [isDarkMode, setDarkMode] = useState(
		getUser().settings.theme === 'dark',
	)

	useEffect(() => {
		const mode = isDarkMode ? 'dark' : 'light'
		setTheme(themes[mode])
	}, [isDarkMode, setTheme])

	const changeTheme = async () => {
		const newMode = isDarkMode ? 'light' : 'dark'
		setTheme(themes[newMode])
		setDarkMode(!isDarkMode)
		await saveSettings({ theme: newMode })
	}

	return (
		<>
			{theme && (
				<Helmet>
					<meta name="theme-color" content={theme.palette.background.default} />
					<style type="text/css">
						{`body { background: ${theme.palette.background.default}}`}
					</style>
				</Helmet>
			)}
			<IconButton onClick={changeTheme}>
				<DarkModeSwitch
					sunColor={orange[900]}
					moonColor={yellow[600]}
					checked={isDarkMode}
					onChange={() => {}}
				/>
			</IconButton>
		</>
	)
}
