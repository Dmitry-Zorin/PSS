import { IconButton } from '@mui/material'
import { red, yellow } from '@mui/material/colors'
import { BackgroundSetter } from 'components'
import { useStore, useTheme } from 'react-admin'
import { DarkModeSwitch } from 'react-toggle-dark-mode/dist'
import { saveSettings } from 'requests'
import themes, { ThemeOptionsExtended } from 'themes'
import { ThemeMode } from 'user'

const { Light, Dark } = ThemeMode

const ThemeSwitcher = () => {
	const [theme, setTheme] = useTheme()
	const [mode, setMode] = useStore<ThemeMode>('theme.mode')

	const isDark = mode === Dark

	return (
		<>
			<BackgroundSetter
				color={(theme as ThemeOptionsExtended).palette.background.default}
			/>
			<IconButton onClick={() => setMode(isDark ? Light : Dark)}>
				<DarkModeSwitch
					sunColor={red[900]}
					moonColor={yellow[600]}
					checked={isDark}
					onChange={() => {
						setTheme(themes[mode])
						saveSettings({ theme: mode }).catch(null)
					}}
				/>
			</IconButton>
		</>
	)
}

export default ThemeSwitcher
