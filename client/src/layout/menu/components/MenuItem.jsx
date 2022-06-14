import { Badge } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useContext } from 'react'
import {
	useResourceDefinitions,
	useSidebarState,
	useTranslate,
} from 'react-admin'
import resources from 'resources'
import { CountContext } from '../../../components/CountContext'
import { MenuChip } from './MenuChip'
import { MenuItemLink } from './MenuItemLink'

const { publications } = resources

export const MenuItem = ({ name }) => {
	const translate = useTranslate()
	const { getResourceCount } = useContext(CountContext)
	const resourceName = name
	const resource = useResourceDefinitions()[resourceName]
	const [isSidebarOpen] = useSidebarState()

	if (!resource) {
		return null
	}

	const { icon } = resource

	const isPublication = name in publications
	const count = getResourceCount(name) || 0

	return (
		<MenuItemLink
			to={`/${resourceName}`}
			primaryText={
				<>
					{translate(`resources.${name}.name`, { smart_count: 2 })}
					{isPublication && <MenuChip label={count} />}
				</>
			}
			leftIcon={
				isPublication && !isSidebarOpen ? (
					<Badge
						// color="secondary"
						badgeContent={count}
						max={1000}
						showZero
						sx={{
							'& .MuiBadge-badge': {
								background: grey[300],
								right: 2,
								top: 2,
								border: (t) => `2px solid ${t.palette.background.paper}`,
								px: 0.5,
								transform: 'scale(0.95) translate(50%, -50%)',
								transitionDelay: '300ms',
							},
						}}
					>
						{icon}
					</Badge>
				) : (
					icon
				)
			}
		/>
	)
}
