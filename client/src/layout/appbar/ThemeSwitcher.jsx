import IconButton from '@material-ui/core/IconButton'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DarkModeSwitch } from 'react-toggle-dark-mode/dist'
import { saveSettings } from '../../requests'

const ThemeSwitcher = () => {
	const dispatch = useDispatch()
	const theme = useSelector(state => state.theme)
	const [isDarkMode, setDarkMode] = useState(theme === 'dark')
	
	const changeTheme = async () => {
		setDarkMode(!isDarkMode)
		const payload = isDarkMode ? 'light' : 'dark'
		dispatch({ type: 'CHANGE_THEME', payload })
		await saveSettings({ theme: payload })
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
