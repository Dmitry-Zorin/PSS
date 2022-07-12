import { Menu } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import { useSidebarState, useTranslate } from 'react-admin'

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

export default MenuButton
