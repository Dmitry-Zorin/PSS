import { Paper } from '@material-ui/core'
import Filter1Icon from '@material-ui/icons/Filter1'
import Filter2Icon from '@material-ui/icons/Filter2'
import Filter3Icon from '@material-ui/icons/Filter3'
import FilterNoneIcon from '@material-ui/icons/FilterNone'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import React, { useEffect, useState } from 'react'
import { getResources, usePermissions } from 'react-admin'
import { useSelector } from 'react-redux'
import { fetchApi } from '../../requests.js'
import MenuItem from './MenuItem.js'
import SubMenu from './SubMenu.js'

const menuResources = [
	'timeline',
	'library',
	'form16',
	'employees',
	'platoons',
]

const category1Resources = [
	'articles',
	'abstracts',
	'monographs',
	'dissertations',
]

const category2Resources = [
	'patents',
	'reports',
	'programs',
]

const category3Resources = [
	'textbooks',
]

const restResources = [
	'researches',
	'developments',
	'rationalizations',
	'projects',
	'theses',
	'approbations',
	'verifications',
]

const otherResources = [
	'publications',
	'subdivisions',
	'users',
	'categories',
	'characters',
]

const Menu = () => {
	const resources = useSelector(getResources)
	const { permissions } = usePermissions()
	
	const [showCategory1, setShowCategory1] = useState(true)
	const [showCategory2, setShowCategory2] = useState(true)
	const [showCategory3, setShowCategory3] = useState(true)
	const [showRest, setShowRest] = useState(true)
	const [showOther, setShowOther] = useState(false)
	const [data, setData] = useState({})
	
	useEffect(() => {
		fetchApi('resources').then(({ json }) => setData(json))
	}, [])
	
	return (
		<Paper style={{ marginRight: 5, borderRadius: 0 }}>
			{resources
				.filter(r => menuResources.includes(r.name))
				.map(resource => (
					<MenuItem key={resource.name} {...{ resource }}/>
				))
			}
			<SubMenu
				handleToggle={() => setShowCategory1(e => !e)}
				isOpen={showCategory1}
				name='layout.menu.category1'
				icon={<Filter1Icon/>}
			>
				{resources
					.filter(r => category1Resources.includes(r.name))
					.map(resource => (
						<MenuItem key={resource.name} {...{ resource, data }}/>
					))
				}
			</SubMenu>
			<SubMenu
				handleToggle={() => setShowCategory2(e => !e)}
				isOpen={showCategory2}
				name='layout.menu.category2'
				icon={<Filter2Icon/>}
			>
				{resources
					.filter(r => category2Resources.includes(r.name))
					.map(resource => (
						<MenuItem key={resource.name} {...{ resource, data }}/>
					))
				}
			</SubMenu>
			<SubMenu
				handleToggle={() => setShowCategory3(e => !e)}
				isOpen={showCategory3}
				name='layout.menu.category3'
				icon={<Filter3Icon/>}
			>
				{resources
					.filter(r => category3Resources.includes(r.name))
					.map(resource => (
						<MenuItem key={resource.name} {...{ resource, data }}/>
					))
				}
			</SubMenu>
			<SubMenu
				handleToggle={() => setShowRest(e => !e)}
				isOpen={showRest}
				name='layout.menu.others'
				icon={<FilterNoneIcon/>}
			>
				{resources
					.filter(r => restResources.includes(r.name))
					.map(resource => (
						<MenuItem key={resource.name} {...{ resource, data }}/>
					))
				}
			</SubMenu>
			{permissions && (
				<SubMenu
					handleToggle={() => setShowOther(e => !e)}
					isOpen={showOther}
					name='layout.menu.more'
					icon={<MoreHorizIcon/>}
				>
					{resources
						.filter(r => otherResources.includes(r.name))
						.map(resource => (
							<MenuItem key={resource.name} {...{ resource }}/>
						))
					}
				</SubMenu>
			)}
		</Paper>
	)
}

export default Menu
