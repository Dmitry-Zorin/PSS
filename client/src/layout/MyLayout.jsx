import React from 'react'
import { Layout } from 'react-admin'
import MyAppBar from './appbar/MyAppBar'
import Menu from './menu/Menu'
import { ScrollTopButton } from './ScrollTopButton'

const MyLayout = ({ children, ...props }) => (
	<Layout
		{...props}
		menu={Menu}
		appBar={MyAppBar}
	>
		{children}
		<ScrollTopButton/>
	</Layout>
)

export default MyLayout
