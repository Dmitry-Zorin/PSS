import { useMediaQuery } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import StarIcon from '@material-ui/icons/Star'
import DefaultIcon from '@material-ui/icons/ViewList'
import React, { useState } from 'react'
import { getResources, MenuItemLink, usePermissions } from 'react-admin'
import { useSelector } from 'react-redux'
import SubMenu from './SubMenu'

const useStyles = makeStyles({
	menuItem: {
		color: 'black'
	},
})

const Menu = ({ onMenuClick, logout }) => {
	const isXSmall = useMediaQuery(theme => theme.breakpoints.down('xs'))
	const open = useSelector(state => state.admin.ui.sidebarOpen)
	const resources = useSelector(getResources)
	const classes = useStyles()
	const { permissions } = usePermissions()
	const otherResources = ['publications', 'subdivisions', 'users']
	const [state, setState] = useState({
		menuOther: false,
	})
	const handleToggle = (menu) => {
		setState(state => ({ ...state, [menu]: !state[menu] }))
	}
	return (
		<div>
			<MenuItemLink
				to="/"
				primaryText={<Typography className={classes.menuItem} variant="body1" component="pre">Технополис
					"ЭРА"</Typography>}
				leftIcon={<StarIcon/>}
				onClick={onMenuClick}
				sidebarIsOpen={open}
			/>
			{resources.map(resource => {
				if (!otherResources.includes(resource.name))
					return (
						<MenuItemLink
							key={resource.name}
							to={`/${resource.name}`}
							primaryText={
								<Typography className={classes.menuItem} variant="body1"
														component="pre">{(resource.options && resource.options.label)}</Typography> ||
								<Typography className={classes.menuItem} variant="body1"
														component="pre">{resource.name}</Typography>
							}
							leftIcon={
								resource.icon ? <resource.icon/> : <DefaultIcon/>
							}
							onClick={onMenuClick}
							sidebarIsOpen={open}
						/>
					)
				else return null
			})}
			{permissions
				? (
					<SubMenu
						handleToggle={() => handleToggle('menuOther')}
						isOpen={state.menuOther}
						sidebarIsOpen={open}
						name="Прочее"
						icon={<MoreHorizIcon/>}>
						{resources.map(resource => {
							if (otherResources.includes(resource.name))
								return (
									<MenuItemLink
										key={resource.name}
										to={`/${resource.name}`}
										primaryText={
											<Typography className={classes.menuItem} variant="body1"
																	component="pre">{(resource.options && resource.options.label)}</Typography> ||
											<Typography className={classes.menuItem} variant="body1"
																	component="pre">{resource.name}</Typography>
										}
										leftIcon={
											resource.icon ? <resource.icon/> : <DefaultIcon/>
										}
										onClick={onMenuClick}
										sidebarIsOpen={open}
									/>
								)
							else return null
						})}
					</SubMenu>
				)
				: null}
			{isXSmall && logout}
		</div>
	)
}

export default Menu