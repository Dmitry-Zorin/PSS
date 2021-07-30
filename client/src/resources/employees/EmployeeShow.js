import { Divider, Typography } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import React from 'react'
import ButtonForm16 from './components/ButtonForm16.js'
import Grade from './components/Grade.js'
import Info from './components/Info.js'
import { PeopleShow } from './components/PeopleShow.js'
import Report from './components/Report.js'

export const EmployeeShow = (props) => (
	<PeopleShow
		info={{
			icon: <AccountCircleIcon/>,
			resource: 'employees',
			title: 'Сотрудник',
			label: 'Оператор',
			whose: 'оператора',
		}}
		tabs={[<Tab1/>, <Grade/>, <Report/>]}
		{...props}
	/>
)

const Tab1 = () => (
	<Info>
		<Divider style={{ margin: '30px 0 60px 0' }}/>
		<Typography
			variant='h6' style={{
			textAlign: 'center',
			marginTop: 30,
			fontWeight: 'bold',
		}}
		>
			Форма №16
		</Typography>
		<ButtonForm16/>
	</Info>
)
