import { ExpandMore } from '@mui/icons-material'
import {
	ListItem,
	ListItemButton,
	ListItemButtonProps,
	ListItemIcon,
	ListItemText,
	Tooltip,
} from '@mui/material'
import { gentleConfig } from 'components'
import { ReactNode } from 'react'
import { useSidebarState, useTranslate } from 'react-admin'
import { animated, useSpring } from 'react-spring'

const AnimatedExpandMore = animated(ExpandMore)

interface SubMenuItemProps extends ListItemButtonProps {
	children?: ReactNode
	icon: ReactNode
	text: string
	tooltip?: string
	open: boolean
}

const SubMenuItem = ({
	children,
	icon,
	text,
	open,
	...props
}: SubMenuItemProps) => {
	const translate = useTranslate()
	const [isSidebarOpen] = useSidebarState()

	text = translate(text, { smart_count: 2 })

	return (
		<ListItem sx={{ px: 1, py: 0 }}>
			<Tooltip placement="right" title={isSidebarOpen ? '' : text}>
				<ListItemButton
					sx={[
						{
							height: 40,
							color: 'text.disabled',
							borderRadius: 1,
							':hover': {
								color: 'text.primary',
								bgcolor: 'transparent',
							},
						},
					]}
					{...props}
				>
					<ListItemIcon
						sx={{ color: 'inherit', minWidth: 40, transform: 'scale(0.8)' }}
					>
						{icon}
					</ListItemIcon>
					<ListItemText
						primary={text.toUpperCase()}
						sx={{ flexShrink: 0 }}
						primaryTypographyProps={{
							sx: {
								fontSize: '0.8rem',
							},
						}}
					/>
					{children}
					<AnimatedExpandMore
						style={useSpring({
							rotate: open ? 0 : -90,
							config: gentleConfig,
						})}
						sx={{ mr: -0.5 }}
					/>
				</ListItemButton>
			</Tooltip>
		</ListItem>
	)
}

export default SubMenuItem
