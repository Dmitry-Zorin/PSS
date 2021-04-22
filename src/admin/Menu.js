import {Chip, useMediaQuery} from '@material-ui/core'
import Filter1Icon from '@material-ui/icons/Filter1'
import Filter2Icon from '@material-ui/icons/Filter2'
import Filter3Icon from '@material-ui/icons/Filter3'
import FilterNoneIcon from '@material-ui/icons/FilterNone'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import DefaultIcon from '@material-ui/icons/ViewList'
import React, {useState} from 'react'
import {getResources, MenuItemLink, usePermissions, useQuery} from 'react-admin'
import {useSelector} from 'react-redux'
import SubMenu from './SubMenu'

const menuResources = [
    'timeline',
    'library',
    'form16'
]

const category1Resources = [
    'articles',
    'abstracts',
    'monographs',
    'dissertations'
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
    'verifications'
]

const otherResources = [
    'publications',
    'subdivisions',
    'users',
    'categories',
    'characters'
]

const queryResources = [
    ...category1Resources,
    ...category2Resources,
    ...category3Resources,
    ...restResources
]

const Menu = ({onMenuClick, logout}) => {
    const isXSmall = useMediaQuery(theme => (
        theme.breakpoints.down('xs')
    ))
    const open = useSelector(state => state.admin.ui.sidebarOpen)
    const resources = useSelector(getResources)
    const {permissions} = usePermissions()

    const [showCategory1, setShowCategory1] = useState(true)
    const [showCategory2, setShowCategory2] = useState(true)
    const [showCategory3, setShowCategory3] = useState(true)
    const [showRest, setShowRest] = useState(true)
    const [showOther, setShowOther] = useState(false)

    const data = {}
    for (const resource of queryResources) {
        data[resource] = useQuery({
            type: 'getList',
            resource,
            payload: {
                filter: {},
                sort: {field: 'firstCreationDate', order: 'DESC'},
                pagination: {page: 1, perPage: 999}
            }
        }).data
    }

    return (
        <>
            {resources.filter(r => menuResources.includes(r.name)).map(resource => (
                <CustomMenuItemLink key={resource.name} {...{resource, onMenuClick, open}}/>
            ))}
            <SubMenu
                handleToggle={() => setShowCategory1(e => !e)}
                isOpen={showCategory1}
                sidebarIsOpen={open}
                name="ra.resources.category1"
                icon={<Filter1Icon/>}
            >
                {resources.filter(r => category1Resources.includes(r.name)).map(resource => (
                    <CustomMenuItemLink key={resource.name} {...{resource, data, onMenuClick, open}}/>
                ))}
            </SubMenu>
            <SubMenu
                handleToggle={() => setShowCategory2(e => !e)}
                isOpen={showCategory2}
                sidebarIsOpen={open}
                name="ra.resources.category2"
                icon={<Filter2Icon/>}
            >
                {resources.filter(r => category2Resources.includes(r.name)).map(resource => (
                    <CustomMenuItemLink key={resource.name} {...{resource, data, onMenuClick, open}}/>
                ))}
            </SubMenu>
            <SubMenu
                handleToggle={() => setShowCategory3(e => !e)}
                isOpen={showCategory3}
                sidebarIsOpen={open}
                name="ra.resources.category3"
                icon={<Filter3Icon/>}
            >
                {resources.filter(r => category3Resources.includes(r.name)).map(resource => (
                    <CustomMenuItemLink key={resource.name} {...{resource, data, onMenuClick, open}}/>
                ))}
            </SubMenu>
            <SubMenu
                handleToggle={() => setShowRest(e => !e)}
                isOpen={showRest}
                sidebarIsOpen={open}
                name="ra.resources.rest"
                icon={<FilterNoneIcon/>}
            >
                {resources.filter(r => restResources.includes(r.name)).map(resource => (
                    <CustomMenuItemLink key={resource.name} {...{resource, data, onMenuClick, open}}/>
                ))}
            </SubMenu>
            {!permissions ? null : (
                <SubMenu
                    handleToggle={() => setShowOther(e => !e)}
                    isOpen={showOther}
                    sidebarIsOpen={open}
                    name="ra.resources.other"
                    icon={<MoreHorizIcon/>}
                >
                    {resources.filter(r => otherResources.includes(r.name)).map(resource => (
                        <CustomMenuItemLink key={resource.name} {...{resource, onMenuClick, open}}/>
                    ))}
                </SubMenu>
            )}
            {isXSmall && logout}
        </>
    )
}

export const CustomMenuItemLink = ({resource, data, onMenuClick, open}) => (
    <MenuItemLink
        key={resource.name}
        to={`/${resource.name}`}
        primaryText={
            <>
                {resource?.options?.label || resource.name}
                {data && (
                    <Chip size='small' label={data[resource.name]?.length} style={{marginLeft: 10}}/>
                )}
            </>
        }
        leftIcon={resource.icon ? <resource.icon/> : <DefaultIcon/>}
        onClick={onMenuClick}
        sidebarIsOpen={open}
    />
)

export default Menu
