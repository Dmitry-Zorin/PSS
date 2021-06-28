import {useTheme} from "@material-ui/core"
import {Line} from "react-chartjs-2"
import React from "react"

export const GradeChart = ({data}) => {
    const theme = useTheme()
    const labels = [...Array(data.scores.length).keys()].map(i => `Неделя ${i + 1}`)

    return (
        <Line
            style={{marginTop: 60}}
            data={{
                labels,
                datasets: [{
                    data: data.scores,
                    label: 'Оценки',
                    fill: false,
                    borderColor: theme.palette.secondary.main,
                    tension: 0
                }]
            }}
        />
    )
}