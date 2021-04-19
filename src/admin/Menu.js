import {useMediaQuery} from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import DefaultIcon from '@material-ui/icons/ViewList'
import React, {useState} from 'react'
import {getResources, MenuItemLink, usePermissions} from 'react-admin'
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

const otherResources = [
    'publications',
    'subdivisions',
    'users',
    'categories',
    'characters'
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

    return (
        <>
            {resources.filter(r => menuResources.includes(r.name)).map(resource => (
                <MenuItemLink
                    key={resource.name}
                    to={`/${resource.name}`}
                    primaryText={
                        resource.options ? resource.options.label : resource.name
                    }
                    leftIcon={resource.icon ? <resource.icon/> : <DefaultIcon/>}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                />
            ))}
            <SubMenu
                handleToggle={() => setShowCategory1(e => !e)}
                isOpen={showCategory1}
                sidebarIsOpen={open}
                name="ra.resources.category1"
                icon={<MoreHorizIcon/>}
            >
                {resources.filter(r => category1Resources.includes(r.name)).map(resource => (
                    <MenuItemLink
                        key={resource.name}
                        to={`/${resource.name}`}
                        primaryText={
                            resource.options ? resource.options.label : resource.name
                        }
                        leftIcon={resource.icon ? <resource.icon/> : <DefaultIcon/>}
                        onClick={onMenuClick}
                        sidebarIsOpen={open}
                    />
                ))}
            </SubMenu>
            <SubMenu
                handleToggle={() => setShowCategory2(e => !e)}
                isOpen={showCategory2}
                sidebarIsOpen={open}
                name="ra.resources.category2"
                icon={<MoreHorizIcon/>}
            >
                {resources.filter(r => category2Resources.includes(r.name)).map(resource => (
                    <MenuItemLink
                        key={resource.name}
                        to={`/${resource.name}`}
                        primaryText={
                            resource.options ? resource.options.label : resource.name
                        }
                        leftIcon={resource.icon ? <resource.icon/> : <DefaultIcon/>}
                        onClick={onMenuClick}
                        sidebarIsOpen={open}
                    />
                ))}
            </SubMenu>
            <SubMenu
                handleToggle={() => setShowCategory3(e => !e)}
                isOpen={showCategory3}
                sidebarIsOpen={open}
                name="ra.resources.category3"
                icon={<MoreHorizIcon/>}
            >
                {resources.filter(r => category3Resources.includes(r.name)).map(resource => (
                    <MenuItemLink
                        key={resource.name}
                        to={`/${resource.name}`}
                        primaryText={
                            resource.options ? resource.options.label : resource.name
                        }
                        leftIcon={resource.icon ? <resource.icon/> : <DefaultIcon/>}
                        onClick={onMenuClick}
                        sidebarIsOpen={open}
                    />
                ))}
            </SubMenu>
            <SubMenu
                handleToggle={() => setShowRest(e => !e)}
                isOpen={showRest}
                sidebarIsOpen={open}
                name="ra.resources.rest"
                icon={<MoreHorizIcon/>}
            >
                {resources.filter(r => ![
                        ...menuResources,
                        ...category1Resources,
                        ...category2Resources,
                        ...category3Resources,
                        ...otherResources
                    ].includes(r.name)).map(resource => (
                        <MenuItemLink
                            key={resource.name}
                            to={`/${resource.name}`}
                            primaryText={
                                resource.options ? resource.options.label : resource.name
                            }
                            leftIcon={resource.icon ? <resource.icon/> : <DefaultIcon/>}
                            onClick={onMenuClick}
                            sidebarIsOpen={open}
                        />
                    ))
                }
            </SubMenu>
            {!permissions ? null : (
                <SubMenu
                    handleToggle={() => setShowOther(e => !e)}
                    isOpen={showOther}
                    sidebarIsOpen={open}
                    name="ra.resources.other"
                    icon={<MoreHorizIcon/>}
                >
                    {resources.map(resource => (
                        !otherResources.includes(resource.name) ? null : (
                            <MenuItemLink
                                key={resource.name}
                                to={`/${resource.name}`}
                                primaryText={
                                    resource.options ? resource.options.label : resource.name
                                }
                                leftIcon={resource.icon ? <resource.icon/> : <DefaultIcon/>}
                                onClick={onMenuClick}
                                sidebarIsOpen={open}
                            />
                        )
                    ))}
                </SubMenu>
            )}
            {isXSmall && logout}
        </>
    )
}

export default Menu
