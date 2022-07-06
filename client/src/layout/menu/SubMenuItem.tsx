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

const AnimatedAccordionIcon = animated(ExpandMore)

interface SubMenuItemProps extends ListItemButtonProps {
	children?: ReactNode
	text: string
	tooltip?: string
	open: boolean
}

const SubMenuItem = ({ children, text, open, ...props }: SubMenuItemProps) => {
	const translate = useTranslate()
	const [isSidebarOpen] = useSidebarState()

	text = translate(text, { smart_count: 2 }).toUpperCase()

	return (
		<ListItem disablePadding>
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
					<ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
						<AnimatedAccordionIcon
							style={useSpring({
								rotate: open ? 0 : -90,
								config: gentleConfig,
							})}
							sx={{ mr: -0.5 }}
						/>
					</ListItemIcon>
					<ListItemText
						primary={text}
						primaryTypographyProps={{
							sx: {
								fontSize: '0.8rem',
							},
						}}
					/>
					{children}
				</ListItemButton>
			</Tooltip>
		</ListItem>
	)
}

export default SubMenuItem
