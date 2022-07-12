import {
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
	const translate = useTranslate()
	const [isSidebarOpen, setSidebarOpen] = useSidebarState()
	const isActive = useMatch(`${to}/*`)
	const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

	text = translate(text, { smart_count: 2 })

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
						onClick={() => isSmall && setSidebarOpen(false)}
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
