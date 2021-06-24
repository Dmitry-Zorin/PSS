import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import AssessmentIcon from '@material-ui/icons/Assessment'
import StarsIcon from '@material-ui/icons/Stars'
import React, {useEffect, useState} from 'react'
import {Show, TabbedShowLayout, Tab} from 'react-admin'
import {createTitle, getShowActions} from '../../../utils/raUtils'
import {fetchAPI} from "../../../utils/utils"
import Grade from "./components/Grade"
import Info from "./components/Info"
import Report from "./components/Report"

const Title = createTitle('Сотрудник', 'name')
const TitleShort = createTitle('', 'name')
const ShowActions = getShowActions()

export const EmployeeShow = ({permissions, enableActions = true, ...props}) => {
    const [data, setData] = useState({
        score: 0,
        issueNumber: 0,
        issuesCompleted: 0,
        nonScienceHours: 0,
        startDate: '',
        dueDate: ''
    })

    useEffect(() => {
        fetchAPI(`employees/${props.id}/redmine`).then(setData)
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
                <Tab label='Оператор' icon={<AccountCircleIcon/>}>
                    <Info/>
                </Tab>
                <Tab label='Оценка' path='grade' icon={<StarsIcon/>}>
                    <Grade score={data.score}/>
                </Tab>
                <Tab label='Отчет' path='report' icon={<AssessmentIcon/>}>
                    <Report data={data}/>
                </Tab>
            </TabbedShowLayout>
        </Show>
    )
}
