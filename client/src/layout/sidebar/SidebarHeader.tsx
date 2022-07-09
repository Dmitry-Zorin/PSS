import { Menu } from '@mui/icons-material'
import { AppBar, Box, IconButton, Toolbar, Tooltip } from '@mui/material'
import { Logo } from 'layout'
import { UserMenu, useSidebarState, useTranslate } from 'react-admin'

const MenuButton = () => {
	const translate = useTranslate()
	const [isSidebarOpen, setSidebarOpen] = useSidebarState()

	return (
		<Tooltip
			title={translate(`ra.action.${isSidebarOpen ? 'close' : 'open'}_menu`)}
		>
			<IconButton
				color="inherit"
				onClick={() => setSidebarOpen(!isSidebarOpen)}
			>
				<Menu />
			</IconButton>
		</Tooltip>
	)
}

const SidebarHeader = () => (
	<AppBar color="inherit" position="sticky">
		<Toolbar
			variant="dense"
			disableGutters
			sx={{
				px: 1,
				py: 0,
				// bgcolor: 'background.header',
				color: 'text.secondary',
				borderBottom: 1,
				borderColor: 'border',
			}}
		>
			<MenuButton />
			<Box flexGrow={1}>
				<Logo />
			</Box>
			<UserMenu />
		</Toolbar>
	</AppBar>
)

export default SidebarHeader
