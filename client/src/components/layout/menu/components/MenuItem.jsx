import { Chip } from '@mui/material'
import { createElement, useContext } from 'react'
import {
	MenuItemLink,
	useResourceDefinitions,
	useSidebarState,
	useTranslate,
} from 'react-admin'
import { CountContext } from '../../../CountContext'

export const MenuItem = ({ name }) => {
	const translate = useTranslate()
	const resources = useResourceDefinitions()
	const [isSidebarOpen] = useSidebarState()
	const { getResourceCount } = useContext(CountContext)

	const count = getResourceCount(name)
	const { icon } = resources[name] || {}

	return (
		<MenuItemLink
			to={`/${name}`}
			primaryText={
				<>
					{translate(`resources.${name}.name`, { smart_count: 2 })}
					{isSidebarOpen && count && (
						<Chip
							size="small"
							label={count}
							sx={{ ml: '10px', cursor: 'pointer' }}
						/>
					)}
				</>
			}
			leftIcon={icon ? createElement(icon) : undefined}
		/>
	)
}
