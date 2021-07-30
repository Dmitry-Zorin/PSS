import React from 'react'
import { Layout } from 'react-admin'
import { useSelector } from 'react-redux'
import { getTheme } from '../theme/theme.js'
import MyAppBar from './appbar/MyAppBar.js'
import Menu from './menu/Menu.js'
import { ScrollTopButton } from './ScrollTopButton.js'

const MyLayout = ({ children, ...props }) => {
	const theme = useSelector(state => state.theme)
	
	return (
		<Layout
			{...props}
			theme={getTheme(theme)}
			menu={Menu}
			appBar={MyAppBar}
		>
			{children}
			<ScrollTopButton/>
		</Layout>
	)
}

export default MyLayout
