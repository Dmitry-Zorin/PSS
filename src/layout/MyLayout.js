import React from 'react'
import { Layout } from 'react-admin'
import { useSelector } from 'react-redux'
import { getTheme } from '../theme/theme'
import MyAppBar from './appbar/MyAppBar'
import Menu from './menu/Menu'
import { ScrollTopButton } from './ScrollTopButton'

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
