import { Toolbar } from '@mui/material'
import { Dial, LocaleMenu, ThemeSwitcher } from 'layout'

export const SettingsDial = () => (
	<Dial>
		<ThemeSwitcher />
		<LocaleMenu />
	</Dial>
)

const AppBar = () => (
	<Toolbar
		disableGutters
		sx={{
			color: 'text.secondary',
			justifyContent: 'flex-end',
			alignItems: 'center',
		}}
	>
		<SettingsDial />
	</Toolbar>
)

export default AppBar
