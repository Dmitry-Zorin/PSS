import {Divider, Typography} from "@material-ui/core"
import Box from "@material-ui/core/Box"
import React, {useEffect, useState} from "react"
import useStyles from "../Styles"
import CircleNumber from "./CircleNumber"
import HoursTable from "./HoursTable"
import PointsTable from "./PointsTable"
import ProgressBar from "./ProgressBar"
import TasksTable from "./TasksTable"

const Report = ({id}) => {
    const classes = useStyles()
    const [data, setData] = useState({
        issueNumber: 0,
        issuesCompleted: 0,
        nonScienceHours: 0
    })

    useEffect(() => {
        fetch(`${process.env.SERVER}/api/employees/${id}/redmine`, {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(res => setData(res))
    }, [])

    const score = 900 + 100 * Math.random()

    return (
        <Box textAlign='center' mb='30px'>
            <Divider style={{margin: '30px 0 60px 0'}}/>
            <Typography variant='h6' style={{marginTop: 30, fontWeight: 'bold'}}>
                Оценка оператора
            </Typography>
            <Box display='flex' width='100%' mt='60px'>
                <CircleNumber num={score | 0} max={1000} text='Количество баллов за все время службы'/>
                <CircleNumber num={score / 50 | 0} max={20} text='Среднеe количество баллов понедельно'/>
                <CircleNumber num={14 + 4 * Math.random() | 0} max={20} text='Количество баллов за прошедшую неделю'/>
            </Box>
            <Typography className={classes.subtitle}>
                Шкала соответствия баллов за неделю
            </Typography>
            <PointsTable {...{classes}}/>

            <Typography variant='h6' style={{marginTop: 60, fontWeight: 'bold'}}>
                Отчет оператора за неделю
            </Typography>
            <Typography className={classes.textSecondary}>
                14.05 - 18.06
            </Typography>

            <Typography className={classes.subtitle}>
                Выполнение задач
            </Typography>
            <TasksTable {...{classes, data}}/>
            <ProgressBar
                value={data.issuesCompleted}
                max={data.issueNumber}
                {...{classes}}
            />

            <Typography className={classes.subtitle}>
                Трудозатраты
            </Typography>
            <HoursTable {...{classes, data}}/>
            <ProgressBar
                value={30 - data.nonScienceHours}
                max={30}
                {...{classes}}
            />
        </Box>
    )
}

export default Report
