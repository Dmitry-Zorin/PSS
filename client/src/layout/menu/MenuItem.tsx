import {
	alpha,
	ListItem,
	ListItemButton,
	ListItemButtonProps,
	ListItemIcon,
	ListItemText,
	Theme,
	Tooltip,
	useMediaQuery,
} from '@mui/material'
import { ReactNode } from 'react'
import { useSidebarState, useTranslate } from 'react-admin'
import { Link, useMatch } from 'react-router-dom'

export interface MenuItemProps extends ListItemButtonProps {
	children?: ReactNode
	to?: string
	icon: ReactNode
	text: string
	tooltip?: string
}

const MenuItem = ({
	children,
	to = '#',
	icon,
	text,
	sx,
	...props
}: MenuItemProps) => {
	const translate = useTranslate()
	const [isSidebarOpen, setSidebarOpen] = useSidebarState()
	const isActive = useMatch(`${to}/*`)
	const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

	text = translate(text, { smart_count: 2 })

	return (
		<li>
			<ListItem component={Link} to={to} sx={{ px: 1, py: 0.25 }}>
				<Tooltip placement="right" title={isSidebarOpen ? '' : text}>
					<ListItemButton
						sx={[
							{
								height: 42,
								color: 'text.secondary',
								borderRadius: 1,
								':hover': {
									bgcolor: 'transparent',
									color: 'text.primary',
									// bgcolor: (t) => alpha(t.palette.background.header, 1),
								},
								...(isActive && {
									'&, :hover': {
										color: 'primary.main',
										bgcolor: (t) => alpha(t.palette.primary.main, 0.05),
									},
								}),
							},
							...(Array.isArray(sx) ? sx : [sx]),
						]}
						onClick={() => {
							if (isSmall) {
								setSidebarOpen(false)
							}
						}}
						{...props}
					>
						<ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
							{icon}
						</ListItemIcon>
						<ListItemText primary={text} sx={{ flexShrink: 0 }} />
						{children}
					</ListItemButton>
				</Tooltip>
			</ListItem>
		</li>
	)
}

export default MenuItem
