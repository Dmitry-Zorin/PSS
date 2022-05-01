import Filter1Icon from '@mui/icons-material/Filter1'
import Filter2Icon from '@mui/icons-material/Filter2'
import Filter3Icon from '@mui/icons-material/Filter3'
import FilterNoneIcon from '@mui/icons-material/FilterNone'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import React, { useEffect, useState } from 'react'
import { Menu, usePermissions, useResourceDefinitions, useStore } from 'react-admin'
import { fetchApi } from '../../requests'
import MenuItem from './MenuItem'
import SubMenu from './SubMenu'

const menuResources = [
	'timeline',
	'library',
	'publicationsList',
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
	'authors',
	'characters',
]

const MyMenu = (props) => {
	const [showCategory1, setShowCategory1] = useState(true)
	const [showCategory2, setShowCategory2] = useState(true)
	const [showCategory3, setShowCategory3] = useState(true)
	const [showRest, setShowRest] = useState(true)
	const [showOther, setShowOther] = useState(false)

	const [, setResourcesCount] = useStore('resources.count')

	useEffect(() => {
		fetchApi('resources/count').then(({ json }) => {
			setResourcesCount(json)
		})
	}, [])

	const { permissions } = usePermissions()
	const resources = Object.values(useResourceDefinitions())

	return (
		<Menu {...props}>
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
						<MenuItem key={resource.name} {...{ resource }}/>
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
						<MenuItem key={resource.name} {...{ resource }}/>
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
						<MenuItem key={resource.name} {...{ resource }}/>
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
						<MenuItem key={resource.name} {...{ resource }}/>
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
		</Menu>
	)
}

export default MyMenu
