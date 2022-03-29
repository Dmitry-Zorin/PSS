import IconButton from '@mui/material/IconButton'
import React, { useState } from 'react'
import { useTheme } from 'react-admin'
import { DarkModeSwitch } from 'react-toggle-dark-mode/dist'
import { user } from '../../providers/authProvider'
import { saveSettings } from '../../requests'
import { themes } from '../../theme/theme'

const ThemeSwitcher = () => {
	const [, setTheme] = useTheme()
	const [isDarkMode, setDarkMode] = useState(user?.theme === 'dark')

	const changeTheme = async () => {
		setDarkMode(!isDarkMode)
		const mode = isDarkMode ? 'light' : 'dark'
		setTheme(themes[mode])
		await saveSettings({ theme: mode })
	}

	return (
		<IconButton onClick={changeTheme}>
			<DarkModeSwitch
				sunColor='white'
				moonColor='black'
				checked={isDarkMode}
				onChange={() => {}}
			/>
		</IconButton>
	)
}

export default ThemeSwitcher
