import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle'
import React from 'react'
import Grade from '../employees/components/Grade.js'
import { PeopleShow } from '../employees/components/PeopleShow.js'
import Report from '../employees/components/Report.js'
import Info from './components/Info.js'

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
