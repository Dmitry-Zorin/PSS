import IconButton from '@mui/material/IconButton'
import React, { useEffect, useState } from 'react'
import { useTheme } from 'react-admin'
import { Helmet } from 'react-helmet'
import { DarkModeSwitch } from 'react-toggle-dark-mode/dist'
import { getUser } from '../../providers/authProvider'
import { saveSettings } from '../../requests'
import { themes } from '../../theme/theme'

const ThemeSwitcher = () => {
	const [theme, setTheme] = useTheme()
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
		<>
			<Helmet>
				<style type='text/css'>
					{`
		        body {
		          background: ${theme?.palette.background.default}
		        }
          `}
				</style>
			</Helmet>
			<IconButton onClick={changeTheme}>
				<DarkModeSwitch
					sunColor='white'
					moonColor='black'
					checked={isDarkMode}
					onChange={() => {}}
				/>
			</IconButton>
		</>
	)
}

export default ThemeSwitcher
