import {Paper, Typography} from "@material-ui/core"
import Box from "@material-ui/core/Box"
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
            marginTop: 45,
            display: 'flex'
        }}>
            {numbers.map((e, i) => (
                <Box
                    key={i}
                    flexGrow={1}
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                >
                    {Math.abs(e - activeStep) > step / 2 ? (
                        <Typography style={{fontSize: 16}}>{e}</Typography>
                    ) : (
                        <Paper elevation={4} style={{
                            borderRadius: '100%',
                            width: 60,
                            height: 60,
                            border: '1px solid #ddd',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Typography style={{fontSize: 24}}>{activeStep}</Typography>
                        </Paper>
                    )}
                </Box>
            ))}
        </Paper>
    )
}

export default ProgressBar
