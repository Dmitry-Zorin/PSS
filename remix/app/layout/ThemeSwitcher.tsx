import type { IconButtonProps } from '@mui/material'
import { IconButton, useTheme } from '@mui/material'
// import { saveSettings } from '~/requests'
import { DarkModeSwitch } from '~/layout'
import type { ThemeOptionsExtended } from '~/themes'

const ThemeSwitcher = (props: IconButtonProps) => {
	const theme = useTheme()

	if (!theme) {
		return null
	}

	const palette = (theme as ThemeOptionsExtended).palette
	const color = palette.text.secondary
	const mode = palette.mode
	const isDark = mode === 'dark'

	return (
		<>
			<IconButton
				size="small"
				onClick={() => {
					// setTheme(themes[isDark ? 'light' : 'dark'])
					// saveSettings({ theme: mode }).catch(null)
				}}
				{...props}
			>
				<DarkModeSwitch checked={isDark} sunColor={color} moonColor={color} />
			</IconButton>
		</>
	)
}

export default ThemeSwitcher
