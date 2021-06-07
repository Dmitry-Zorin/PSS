import {Paper, Typography} from "@material-ui/core"
import React from "react"

const ProgressBar = ({steps = 10, activeStep = 5, step = 1}) => {
    const numbers = [...Array(steps).keys()].map(i => i * step)

    return (
        <Paper elevation={2} style={{
            position: 'relative',
            width: '100%',
            height: 40,
            background: 'linear-gradient(to right, #FF4040, #EAFF00 65%, #6AFF00)',
            borderRadius: 100,
            marginTop: 30,
            display: 'flex'
        }}>
            {numbers.map((e, i) => (
                <div key={i} style={{
                    flexGrow: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {i === activeStep && (
                        <Paper elevation={4} style={{
                            borderRadius: '100%',
                            width: 50,
                            height: 50,
                            border: '1px solid #ddd',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Typography style={{fontSize: 24}}>{e}</Typography>
                        </Paper>
                    )}
                    {i !== activeStep && (
                        <Typography style={{fontSize: 16}}>{e}</Typography>
                    )}
                </div>
            ))}
        </Paper>
    )
}

export default ProgressBar
