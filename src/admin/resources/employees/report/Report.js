import {Divider, Typography} from "@material-ui/core"
import Box from "@material-ui/core/Box"
import React, {useState} from "react"
import useStyles from "../Styles"
import CircleNumber from "./CircleNumber"
import HoursTable from "./HoursTable"
import PointsTable from "./PointsTable"
import ProgressBar from "./ProgressBar"
import TasksTable from "./TasksTable"

const Report = () => {
    const classes = useStyles()
    const [data, setData] = useState({
        issuesNumber: 0,
        scienceIssuesNumber: 0,
        issuesCompleted: 0,
        scienceIssuesCompleted: 0,
        scienceHoursPercentage: 0,
        issuesCompletedPercentage: 0
    })

    /*useEffect(() => {
        const issueHours = {}
        let workHours = 0
        let scienceHours = 0
        let issuesCompleted = 0
        let scienceIssuesCompleted = 0
        const id = 275
        const authToken = "RCTFNFj+oeUrvNPeX3On8zWQJa3dM6o5aPxcBari311BP2ckwlVbGZS/hGaslm2QOWwwVm5r8HVKv8cT9TlQ8A=="
        const ip = '192.168.56.3'

        fetch(`http://${ip}/time_entries.json?user_id=${id}`, {
            withCredentials: true,
            headers: {
                "authenticity_token": authToken,
            }
        })
            .then(resp => resp.json())
            .then(timeEntries => {
                for (const {issue, hours} of timeEntries.time_entries) {
                    issueHours[issue.id] = hours
                }

                fetch(`http://${ip}/issues.json?assigned_to=${id}`, {
                    withCredentials: true,
                    headers: {
                        "authenticity_token": authToken,
                    }
                })
                    .then(resp => resp.json())
                    .then(issues => {
                        const issuesNumber = issues.issues.length
                        let scienceIssuesNumber = 0

                        for (const {id, tracker, status} of issues.issues) {
                            const hours = issueHours[id]
                            workHours += hours

                            const isCompleted = ['Выполнена', 'Завершена'].includes(status)
                            issuesCompleted += isCompleted

                            if (tracker.name === 'Научная деятельность') {
                                scienceHours += hours
                                scienceIssuesNumber++
                                scienceIssuesCompleted += isCompleted
                            }
                        }

                        const scienceHoursPercentage = Math.round(100 * scienceHours / workHours)
                        const issuesCompletedPercentage = Math.round(100 * issuesCompleted / issuesNumber)

                        setData({
                            issuesNumber,
                            scienceIssuesNumber,
                            issuesCompleted,
                            scienceIssuesCompleted,
                            scienceHoursPercentage,
                            issuesCompletedPercentage
                        })
                    })
            })
    }, [])*/

    return !data ? null : (
        <Box textAlign='center' mb='30px'>
            <Divider style={{margin: '30px 0'}}/>
            <Typography variant='h6' style={{marginTop: 30, fontWeight: '400'}}>
                Оценка оператора
            </Typography>
            <Box display='flex' width='100%'  mt='30px'>
                <CircleNumber num={920} text='Кол-во баллов за все время службы'/>
                <CircleNumber num={18} text='Среднеe кол-во баллов понедельно'/>
                <CircleNumber num={14} text='Кол-во баллов за прошедшую неделю' color={1}/>
            </Box>
            <Typography className={classes.subtitle}>
                Шкала соответствия баллов за неделю
            </Typography>
            <PointsTable {...{classes}}/>

            <Typography variant='h6' style={{marginTop: 45, fontWeight: '400'}}>
                Отчет оператора за неделю
            </Typography>
            <Typography className={classes.textSecondary}>
                31.05 - 4.06
            </Typography>

            <Typography className={classes.subtitle}>
                Выполнение задач
            </Typography>
            <TasksTable {...{classes}}/>
            <ProgressBar steps={9} activeStep={7} {...{classes}}/>

            <Typography className={classes.subtitle}>
                Трудозатраты
            </Typography>
            <HoursTable {...{classes}}/>
            <ProgressBar steps={7} step={5} activeStep={5} {...{classes}}/>
        </Box>
    )
}

export default Report
