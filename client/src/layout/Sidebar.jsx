import React from 'react'
import { Sidebar } from 'react-admin'

const MySidebar = (props) => (
	<Sidebar
		{...props}
		sx={{
			backgroundColor: 'background.paper',
			position: 'relative !important',
		}}
	/>
)

export default MySidebar