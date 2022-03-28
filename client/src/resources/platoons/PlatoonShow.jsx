import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle'
import React from 'react'
import Grade from '../employees/components/Grade'
import { PeopleShow } from '../employees/components/PeopleShow'
import Report from '../employees/components/Report'
import Info from './components/Info'

export const PlatoonShow = (props) => (
	<PeopleShow
		info={{
			icon: <SupervisedUserCircleIcon/>,
			resource: 'platoons',
			title: 'Взвода',
			label: 'Взвод',
			whose: 'взвода',
		}}
		tabs={[<Info/>, <Grade/>, <Report/>]}
		{...props}
	/>
)
