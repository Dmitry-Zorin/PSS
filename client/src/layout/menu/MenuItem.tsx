import {
	alpha,
	ListItem,
	ListItemButton,
	ListItemButtonProps,
	ListItemIcon,
	ListItemText,
	Tooltip,
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
	const [isSidebarOpen] = useSidebarState()
	const isActive = useMatch(`${to}/*`)

	text = translate(text, { smart_count: 2 })

	return (
		<Tooltip placement="right" title={isSidebarOpen ? '' : text}>
			<ListItem component={Link} to={to} disablePadding>
				<ListItemButton
					sx={({ palette }) => ({
						height: 46,
						color: 'text.secondary',
						transition: 'none',
						':hover': {
							bgcolor: alpha(palette.text.secondary, 0.05),
						},
						...(isActive && {
							color: 'primary.main',
							'&, :hover': {
								bgcolor: alpha(palette.primary.main, 0.075),
							},
						}),
						...sx,
					})}
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
