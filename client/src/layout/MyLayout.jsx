import React from 'react'
import { Layout } from 'react-admin'
import MyAppBar from './appbar/MyAppBar'
import MyMenu from './menu/Menu'
import MySidebar from './Sidebar'
import { ScrollTopButton } from './ScrollTopButton'

const MyLayout = ({ children, ...props }) => (
	<Layout
		{...props}
		appBar={MyAppBar}
		sidebar={MySidebar}
		menu={MyMenu}
	>
		{children}
		<ScrollTopButton/>
	</Layout>
)

export default MyLayout
