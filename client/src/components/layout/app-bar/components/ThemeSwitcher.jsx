import { IconButton } from '@mui/material'
import { useEffect, useState } from 'react'
import { useTheme } from 'react-admin'
import { DarkModeSwitch } from 'react-toggle-dark-mode/dist'
import { saveSettings } from 'requests'
import themes from 'themes'
import { getUser } from 'user'

export const ThemeSwitcher = () => {
	const [, setTheme] = useTheme()
	const [isDarkMode, setDarkMode] = useState(getUser()?.theme === 'dark')

	useEffect(() => {
		const mode = isDarkMode ? 'dark' : 'light'
		setTheme(themes[mode])
	}, [])

	const changeTheme = async () => {
		const newMode = isDarkMode ? 'light' : 'dark'
		setTheme(themes[newMode])
		setDarkMode(!isDarkMode)
		await saveSettings({ theme: newMode })
	}

	return (
		<IconButton onClick={changeTheme}>
			<DarkModeSwitch
				sunColor="white"
				moonColor="black"
				checked={isDarkMode}
				onChange={() => {}}
			/>
		</IconButton>
	)
}
