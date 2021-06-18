import {Divider, Typography} from "@material-ui/core"
import Box from "@material-ui/core/Box"
import React, {useEffect, useState} from "react"
import CircleNumber from "../../employees/report/CircleNumber"
import HoursTable from "../../employees/report/HoursTable"
import PointsTable from "../../employees/report/PointsTable"
import ProgressBar from "../../employees/report/ProgressBar"
import TasksTable from "../../employees/report/TasksTable"
import useStyles from "../Styles"
import HoursTableFull from "./HoursTableFull"
import TasksTableFull from "./TasksTableFull"

const Report = ({id}) => {
    const classes = useStyles()
    const [data, setData] = useState({
        issueNumber: 0,
        issuesCompleted: 0,
        nonScienceHours: 0
    })
    const [people, setPeople] = useState([])

    useEffect(() => {
        fetch(`${process.env.SERVER}/api/platoons/${id}/redmine`, {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(res => {
                setPeople(res.people)
                setData(res.data)
            })
    }, [])

    const numOfPeople = 20
    const score = numOfPeople * (900 + 100 * Math.random())

    return (
        <Box textAlign='center' mb='30px'>
            <Divider style={{margin: '30px 0 60px 0'}}/>
            <Typography variant='h6' style={{marginTop: 30, fontWeight: 'bold'}}>
                Оценка взвода
            </Typography>
            <Box display='flex' width='100%' mt='60px'>
                <CircleNumber num={score | 0} max={1000 * numOfPeople} text='Количество баллов за все время службы'/>
                <CircleNumber num={score / 50 | 0} max={20 * numOfPeople} text='Среднеe количество баллов понедельно'/>
                <CircleNumber
                    num={numOfPeople * (14 + 4 * Math.random()) | 0}
                    max={20 * numOfPeople}
                    text='Количество баллов за прошедшую неделю'
                />
            </Box>
            <Typography className={classes.subtitle}>
                Шкала соответствия баллов за неделю
            </Typography>
            <PointsTable {...{classes, numOfPeople}}/>

            <Typography variant='h6' style={{marginTop: 60, fontWeight: 'bold'}}>
                Отчет взвода за неделю
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
            <TasksTableFull {...{people}}/>

            <Typography className={classes.subtitle}>
                Трудозатраты
            </Typography>
            <HoursTable {...{classes, data, numOfPeople}}/>
            <ProgressBar
                value={30 * numOfPeople - data.nonScienceHours}
                max={30 * numOfPeople}
                {...{classes}}
            />
            <HoursTableFull {...{people}}/>
        </Box>
    )
}

export default Report
