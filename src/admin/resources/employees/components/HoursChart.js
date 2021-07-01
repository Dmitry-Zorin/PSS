import {Typography} from "@material-ui/core"
import React from 'react'
import {useRecordContext} from "react-admin"
import {DoughnutChart} from "./DoughnutChart"

const colors = [
    '#00aeff',
    '#ffe600',
    '#ff8c00'
]

export const HoursChart = ({data}) => {
    const {numOfPeople = 1} = useRecordContext()

    const activities = new Map([
        ['science', {label: 'Научная работа', color: '#6aff00'}]
    ])
    activities.get('science').value = 30 * numOfPeople - data.nonScienceHours

    const hours = Object.entries(data.hours)
        .filter(e => e[0] !== activities.get('science').label)
        .sort((a, b) => b[1] - a[1])

    hours.forEach(([trackerName, value], i) => {
        activities.set(trackerName, {
            label: trackerName,
            color: colors[i % colors.length],
            value
        })
    })

    return (
        <div>
            <Typography style={{marginBottom: 15}}>
                <b>Распределение рабочего времени</b>
            </Typography>
            <DoughnutChart
                data={[...activities.values()]}
                text={`${30 * numOfPeople} часов`}
            />
        </div>
    )
}
