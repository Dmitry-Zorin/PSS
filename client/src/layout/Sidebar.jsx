import React from 'react'
import { Sidebar } from 'react-admin'

const MySidebar = (props) => (
	<Sidebar
		{...props}
		sx={{
			backgroundColor: 'background.paper',
			height: 'unset',
			'& .RaSidebar-fixed': {
				position: 'unset',
			},
		}}
	/>
)

export default MySidebar