import { Badge, Chip, styled } from '@mui/material'
import { useContext } from 'react'
import {
	MenuItemLink,
	useResourceDefinitions,
	useSidebarState,
	useTranslate
} from 'react-admin'
import resources from 'resources'
import { CountContext } from '../../../CountContext'

const { publications } = resources

const MenuItemBadge = styled(Badge)(({ theme }) => ({
	'& .MuiBadge-badge': {
		right: 2,
		top: 2,
		border: `2px solid ${theme.palette.background.paper}`,
		padding: '0 4px',
		transform: 'scale(0.95) translate(50%, -50%)',
		transitionDelay: '300ms',
	},
}))

export const MenuItem = ({ name, prefix }) => {
	const translate = useTranslate()
	const { getResourceCount } = useContext(CountContext)
	const resourceName = prefix ? `${prefix}/${name}` : name
	const resource = useResourceDefinitions()[resourceName]
	const [isSidebarOpen] = useSidebarState()

	if (!resource) {
		return null
	}

	const { icon: Icon } = resource

	const isPublication = name in publications
	const count = getResourceCount(name) || 0

	return (
		<MenuItemLink
			to={`/${resourceName}`}
			primaryText={
				<>
					{translate(`resources.${name}.name`, {
						smart_count: 2,
					})}
					{isSidebarOpen && isPublication && (
						<Chip
							size="small"
							label={count}
							sx={{ ml: 'auto', mr: 4, cursor: 'pointer' }}
						/>
					)}
				</>
			}
			leftIcon={
				!isSidebarOpen && isPublication ? (
					<MenuItemBadge
						color="primary"
						badgeContent={count}
						max={1000}
						showZero
					>
						<Icon />
					</MenuItemBadge>
				) : (
					<Icon />
				)
			}
		/>
	)
}
