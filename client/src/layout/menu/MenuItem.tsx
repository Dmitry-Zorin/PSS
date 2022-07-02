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
	const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'))

	text = translate(text, { smart_count: 2 })

	return (
		<Tooltip placement="right" title={isSidebarOpen ? '' : text}>
			<ListItem component={Link} to={to} disablePadding>
				<ListItemButton
					sx={({ palette }) => ({
						height: 40,
						color: 'text.secondary',
						transition: 'none',
						borderRadius: 1,
						':hover': {
							color: 'text.primary',
							bgcolor: alpha(palette.text.secondary, 0.0),
						},
						...(isActive && {
							'&, :hover': {
								color: 'primary.main',
								bgcolor: alpha(palette.primary.main, 0.0),
							},
						}),
						...sx,
					})}
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
			</ListItem>
		</Tooltip>
	)
}

export default MenuItem
