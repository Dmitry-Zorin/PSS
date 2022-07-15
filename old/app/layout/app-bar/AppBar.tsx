import { AppBar as MuiAppBar, Box, Toolbar } from '@mui/material'
import { UserMenu } from 'react-admin'
import {
	LocaleMenu,
	Logo,
	MenuButton,
	SettingsDial,
	ThemeSwitcher,
} from '~/layout'

const AppBar = () => (
	<MuiAppBar
		color="inherit"
		position="static"
		sx={{
			borderBottom: 1,
			borderColor: 'border',
		}}
	>
		<Toolbar
			disableGutters
			sx={{
				color: 'text.secondary',
				alignItems: 'center',
			}}
		>
			<MenuButton />
			<Logo />
			<Box flexGrow={1} />
			<SettingsDial>
				<ThemeSwitcher />
				<LocaleMenu />
			</SettingsDial>
			<UserMenu />
		</Toolbar>
	</MuiAppBar>
)

export default AppBar