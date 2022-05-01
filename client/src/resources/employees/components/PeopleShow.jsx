import AssessmentIcon from '@mui/icons-material/Assessment'
import StarsIcon from '@mui/icons-material/Stars'
import React, { cloneElement, useEffect, useState } from 'react'
import { Show, Tab, TabbedShowLayout } from 'react-admin'
import { createTitle, ShowActions } from '../../components/inputs'
import { fetchApi } from '../../../requests'

export const PeopleShow = ({ info, tabs, ...props }) => {
	const Title = createTitle(info.title, 'name')
	const TitleShort = createTitle('', 'name')
	
	const [data, setData] = useState({
		score: 0,
		totalScore: 0,
		avgScore: 0,
		issueNumber: 0,
		issuesCompleted: 0,
		nonScienceHours: 0,
		startDate: '',
		dueDate: '',
		hours: {},
		scores: [],
		people: [],
	})
	
	useEffect(() => {
		fetchApi(`${info.resource}/${props.id}/redmine`)
			.then(({ json }) => setData(json))
	}, [])
	
	const { enableActions = true, permissions } = props
	
	return (
		<Show
			title={enableActions ? <Title/> : <TitleShort/>}
			actions={!enableActions ? undefined : <ShowActions {...{ permissions }}/>}
			{...props}
		>
			<TabbedShowLayout>
				<Tab label={info.label} icon={info.icon}>
					{tabs[0]}
				</Tab>
				<Tab label='Оценка' path='grade' icon={<StarsIcon/>}>
					{cloneElement(tabs[1], { data, info })}
				</Tab>
				<Tab label='Отчет' path='report' icon={<AssessmentIcon/>}>
					{cloneElement(tabs[2], { data, info })}
				</Tab>
			</TabbedShowLayout>
		</Show>
	)
}
