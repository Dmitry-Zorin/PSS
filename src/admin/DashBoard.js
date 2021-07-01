import {Card, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import React from 'react'
import DashboardImg from '../../static/images/dashboard.png'

const useStyles = makeStyles({
    card: {
        background: `url("${DashboardImg}") no-repeat center`,
        backgroundSize: 'cover',
        height: '55em'
    },
    header: {
        textAlign: 'center',
        marginTop: '1em',
        fontSize: '1.8em'
    },
})

const Dashboard = () => {
    const classes = useStyles()
    return (
        <Card className={classes.card}>
            <Typography variant="h5" component="h5" className={classes.header}>
                Системa хранения результатов научных трудов Военного инновационного технополиса «ЭРА»
            </Typography>
        </Card>
    )
}

export default Dashboard
