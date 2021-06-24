import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import AssessmentIcon from "@material-ui/icons/Assessment"
import StarsIcon from "@material-ui/icons/Stars"
import React, {useEffect, useState} from 'react'
import {Show, Tab, TabbedShowLayout} from 'react-admin'
import {createTitle, getShowActions} from '../../../utils/raUtils'
import {fetchAPI} from "../../../utils/utils"
import Grade from "../employees/components/Grade"
import Report from "../employees/components/Report"
import Info from "./components/Info"

const Title = createTitle('Взвод', 'name')
const TitleShort = createTitle('', 'name')

const ShowActions = getShowActions()

export const PlatoonShow = ({permissions, enableActions = true, ...props}) => {
    const [data, setData] = useState({
        score: 0,
        data: {
            issueNumber: 0,
            issuesCompleted: 0,
            nonScienceHours: 0,
            startDate: '',
            dueDate: ''
        },
        people: []
    })

    useEffect(() => {
        fetchAPI(`platoons/${props.id}/redmine`).then(setData)
    }, [])

    return (
        <Show
            title={enableActions ? <Title/> : <TitleShort/>}
            actions={!enableActions ? undefined : (
                <ShowActions permissions={permissions}/>
            )}
            {...props}
        >
            <TabbedShowLayout>
                <Tab label='Взвод' icon={<AccountCircleIcon/>}>
                    <Info/>
                </Tab>
                <Tab label='Оценка' path='grade' icon={<StarsIcon/>}>
                    <Grade score={data.score} numOfPeople={20}/>
                </Tab>
                <Tab label='Отчет' path='report' icon={<AssessmentIcon/>}>
                    <Report data={data.data} people={data.people} numOfPeople={20}/>
                </Tab>
            </TabbedShowLayout>
        </Show>
    )
}
