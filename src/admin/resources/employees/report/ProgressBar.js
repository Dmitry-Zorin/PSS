import {Paper, Typography} from "@material-ui/core"
import React from "react"

const ProgressBar = ({value = 0, max = 0}) => {
    const ratio = max ? value / max : 0.5

    return (
        <Paper elevation={2} style={{
            position: 'relative',
            width: '100%',
            height: 40,
            background: 'linear-gradient(to right, #FF4040, #EAFF00 65%, #6AFF00)',
            borderRadius: 100,
            marginTop: 45,
            display: 'flex',
            alignItems: 'center',
        }}>
            <Paper elevation={4} style={{
                position: 'absolute',
                left: `calc(${ratio * 100}% - ${ratio * 60}px)`,
                borderRadius: '100%',
                width: 60,
                height: 60,
                border: '1px solid #ddd',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Typography style={{fontSize: 24}}>{value}</Typography>
            </Paper>
        </Paper>
    )
}

export default ProgressBar
