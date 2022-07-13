import type { ListItemButtonProps, Theme } from '@mui/material'
import {
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Tooltip,
	useMediaQuery,
} from '@mui/material'
import { Link } from '@remix-run/react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

export const handle = {
	i18n: 'resources',
}

export interface MenuItemProps extends ListItemButtonProps {
	children?: ReactNode
	to: string
	icon: ReactNode
	text: string
}

const MenuItem = ({
	children,
	to,
	icon,
	text,
	sx,
	...props
}: MenuItemProps) => {
	const { t } = useTranslation('resources')
	// const [isSidebarOpen, setSidebarOpen] = useSidebarState()
	const isSidebarOpen = true
	// const isActive = useMatches(`${to}/*`)
	const isActive = false
	const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

	text = t(`${text}.name`)

	return (
		<li>
			<ListItem component={Link} to={to} disablePadding>
				<Tooltip title={isSidebarOpen ? '' : text} placement="right">
					<ListItemButton
						sx={[
							{
								height: 44,
								color: 'text.secondary',
								':hover': {
									color: 'text.primary',
									bgcolor: 'transparent',
								},
								...(isActive && {
									'&, :hover': {
										color: 'primary.main',
										textDecoration: 'none',
									},
								}),
							},
							...(Array.isArray(sx) ? sx : [sx]),
						]}
						// onClick={() => isSmall && setSidebarOpen(false)}
						{...props}
					>
						<ListItemIcon
							sx={{
								color: 'inherit',
								minWidth: 44,
							}}
						>
							{icon}
						</ListItemIcon>
						<ListItemText
							primary={text}
							sx={{
								flexShrink: 0,
								mr: 2,
							}}
							primaryTypographyProps={{
								variant: 'body2',
							}}
						/>
						{children}
					</ListItemButton>
				</Tooltip>
			</ListItem>
		</li>
	)
}

export default MenuItem
