import {CardContent, Typography} from "@material-ui/core"
import Box from "@material-ui/core/Box"
import React from "react"
import CircleNumber from "../../employees/components/CircleNumber"
import PointsTable from "../../employees/components/PointsTable"
import useStyles from "../../employees/Styles"

const Grade = ({score, numOfPeople = 1}) => {
    const classes = useStyles()

    return (
        <CardContent>
            <Box textAlign='center' mt='15px' mb='30px'>
                <Typography variant='h6' style={{fontWeight: 'bold'}}>
                    Оценка {numOfPeople > 1 ? 'взвода' : 'оператора'}
                </Typography>
                <Box display='flex' width='100%' mt='60px'>
                    <CircleNumber
                        num={score}
                        max={20 * numOfPeople}
                        text='Общее количество баллов'
                    />
                    <CircleNumber
                        num={score}
                        max={20 * numOfPeople}
                        text='Среднеe количество баллов понедельно'
                    />
                    <CircleNumber
                        num={score}
                        max={20 * numOfPeople}
                        text='Количество баллов за прошедшую неделю'
                    />
                </Box>
                <Typography className={classes.subtitle}>
                    Шкала соответствия баллов за неделю
                </Typography>
                <PointsTable {...{numOfPeople}}/>
            </Box>
        </CardContent>
    )
}

export default Grade
