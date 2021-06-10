import {Divider, Typography} from "@material-ui/core"
import Box from "@material-ui/core/Box"
import React, {useEffect, useState} from "react"
import dataProvider from "../../../DataProvider"
import useStyles from "../Styles"
import CircleNumber from "./CircleNumber"
import HoursTable from "./HoursTable"
import PointsTable from "./PointsTable"
import ProgressBar from "./ProgressBar"
import TasksTable from "./TasksTable"

const headers = {
    'X-Redmine-API-Key': '5127fd8a95e7176fb72c64ae823a508aaecfea2b',
}

const Report = ({id}) => {
    const classes = useStyles()
    const [data, setData] = useState({
        issuesNumber: 0,
        issuesCompleted: 0,
        nonScienceHours: 0,
    })

    useEffect(() => {
        let nonScienceHours = 0
        let issuesCompleted = 0
        let userId

        dataProvider.getOne('employees', {id})
            .then(data => {
                userId = data.data?.redmineId
                const urlParams = new URLSearchParams({
                    assigned_to_id: userId,
                    created_date: '>=2021-06-07',
                    due_date: '<=2021-06-11'
                })
                return fetch(`${process.env.REDMINE_SERVER}/issues.json?${urlParams}`, {headers})
            })
            .then(resp => resp.json())
            .then(data => {
                const issues = data?.issues
                if (!issues) return

                const issuesNumber = issues.length

                for (const {tracker, status, estimated_hours = 0} of issues) {
                    issuesCompleted += ['Выполнена', 'Завершена'].includes(status)
                    nonScienceHours += estimated_hours * (tracker?.name !== 'Научная деятельность')
                }

                setData({
                    issuesNumber,
                    issuesCompleted,
                    nonScienceHours
                })
            })
            .catch(console.log)
    }, [])

    const score = 900 + 100 * Math.random()

    return (
        <Box textAlign='center' mb='30px'>
            <Divider style={{margin: '30px 0 60px 0'}}/>
            <Typography variant='h6' style={{marginTop: 30, fontWeight: 'bold'}}>
                Оценка оператора
            </Typography>
            <Box display='flex' width='100%' mt='60px'>
                <CircleNumber num={score | 0} max={1000} text='Кол-во баллов за все время службы'/>
                <CircleNumber num={score / 50 | 0} max={20} text='Среднеe кол-во баллов понедельно'/>
                <CircleNumber num={14 + 4 * Math.random() | 0} max={20} text='Кол-во баллов за прошедшую неделю'/>
            </Box>
            <Typography className={classes.subtitle}>
                Шкала соответствия баллов за неделю
            </Typography>
            <PointsTable {...{classes}}/>

            <Typography variant='h6' style={{marginTop: 60, fontWeight: 'bold'}}>
                Отчет оператора за неделю
            </Typography>
            <Typography className={classes.textSecondary}>
                7.05 - 11.06
            </Typography>

            <Typography className={classes.subtitle}>
                Выполнение задач
            </Typography>
            <TasksTable {...{classes, data}}/>
            <ProgressBar steps={(data.issuesNumber || 10) + 1} activeStep={data.issuesCompleted} {...{classes}}/>

            <Typography className={classes.subtitle}>
                Трудозатраты
            </Typography>
            <HoursTable {...{classes, data}}/>
            <ProgressBar steps={7} step={5} activeStep={30 - data.nonScienceHours} {...{classes}}/>
        </Box>
    )
}

export default Report
