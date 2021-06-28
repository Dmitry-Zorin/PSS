import {Typography} from "@material-ui/core";
import {DoughnutChart} from "./DoughnutChart"
import React from 'react'

const colors = [
    '#00aeff',
    '#ffe600',
    '#ff8c00'
]

export const HoursChart = ({data, numOfPeople}) => {
    const activities = new Map([
        ['science', {label: 'Научная работа', color: '#6aff00'}]
    ])
    activities.get('science').value = 30 * numOfPeople - data.nonScienceHours

    for (const [i, [trackerName, value]] of Object.entries(data.hours).entries()) {
        if (trackerName !== activities.get('science').label) {
            activities.set(trackerName, {
                label: trackerName,
                color: colors[i % colors.length],
                value
            })
        }
    }

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