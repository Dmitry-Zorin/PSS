import {CardContent, Typography} from "@material-ui/core"
import Box from "@material-ui/core/Box"
import React from "react"
import {useRecordContext} from "react-admin";
import CircleNumber from "../../employees/components/CircleNumber"
import PointsTable from "../../employees/components/PointsTable"
import useStyles from "../../employees/Styles"
import {GradeChart} from "./GradeChart"

const Grade = ({data, info}) => {
    const classes = useStyles()
    const {numOfPeople = 1} = useRecordContext()
    const {whose} = info

    return (
        <CardContent>
            <Box textAlign='center' mt='15px' mb='30px'>
                <Typography variant='h6' style={{fontWeight: 'bold'}}>
                    Оценка {whose}
                </Typography>
                <Box display='flex' width='100%' mt='60px'>
                    <CircleNumber
                        num={data.totalScore}
                        max={20 * numOfPeople}
                        text='Общее количество баллов'
                    />
                    <CircleNumber
                        num={data.avgScore}
                        max={20 * numOfPeople}
                        text='Среднеe количество баллов понедельно'
                    />
                    <CircleNumber
                        num={data.score}
                        max={20 * numOfPeople}
                        text='Количество баллов за прошедшую неделю'
                    />
                </Box>
                <Typography className={classes.subtitle}>
                    Шкала соответствия баллов за неделю
                </Typography>
                <PointsTable/>
                <GradeChart {...{data}}/>
            </Box>
        </CardContent>
    )
}

export default Grade
