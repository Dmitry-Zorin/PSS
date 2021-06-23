import {CardContent, Typography} from "@material-ui/core"
import Box from "@material-ui/core/Box"
import React, {useEffect, useState} from "react"
import {fetchAPI} from "../../../../utils/utils"
import HoursTable from "../../employees/components/HoursTable"
import ProgressBar from "../../employees/components/ProgressBar"
import TasksTable from "../../employees/components/TasksTable"
import useStyles from "../../employees/Styles"
import HoursTableFull from "../../platoons/components/HoursTableFull"
import TasksTableFull from "../../platoons/components/TasksTableFull"

const Report = ({id, resource = 'employees', numOfPeople = 1}) => {
    const classes = useStyles()
    const [data, setData] = useState({
        issueNumber: 0,
        issuesCompleted: 0,
        nonScienceHours: 0,
        startDate: '',
        dueDate: ''
    })
    const [people, setPeople] = useState([])

    useEffect(() => {
        fetchAPI(`${resource}/${id}/redmine`)
            .then(res => {
                if (resource === 'employees') {
                    setData(res)
                }
                else {
                    setPeople(res.people)
                    setData(res.data)
                }
            })
    }, [])

    return (
        <CardContent>
            <Box textAlign='center' mt='15px' mb='30px'>
                <Typography variant='h6' style={{fontWeight: 'bold'}}>
                    Отчет {numOfPeople > 1 ? 'взвода' : 'оператора'} за неделю
                </Typography>
                <Typography className={classes.textSecondary}>
                    {data.startDate} - {data.dueDate}
                </Typography>

                <Typography className={classes.subtitle}>
                    Выполнение задач
                </Typography>
                <TasksTable {...{data}}/>
                <ProgressBar
                    value={data.issuesCompleted}
                    max={data.issueNumber}
                />
                {numOfPeople > 1 && (
                    <TasksTableFull {...{people}}/>
                )}

                <Typography className={classes.subtitle}>
                    Трудозатраты
                </Typography>
                <HoursTable {...{data, numOfPeople}}/>
                <ProgressBar
                    value={30 * numOfPeople - data.nonScienceHours}
                    max={30 * numOfPeople}
                />
                {numOfPeople > 1 && (
                    <HoursTableFull {...{people}}/>
                )}
            </Box>
        </CardContent>
    )
}

export default Report
