import {Paper, Typography} from "@material-ui/core"
import Box from "@material-ui/core/Box"
import React from "react"

const CircleNumber = ({num, text, color = 2}) => (
    <Box width='33%'>
        <Paper elevation={4} style={{
            width: 90,
            height: 90,
            borderRadius: 100,
            border: `9px solid #${['', 'BFFF00', '6AFF00'][color]}`,
            margin: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <div>
                <Typography variant='h4' style={{lineHeight: 1}}>
                    {num}
                </Typography>
                <Typography style={{color: 'rgba(0, 0, 0, 0.5)', lineHeight: 1}}>
                    баллов
                </Typography>
            </div>
        </Paper>
        <Typography style={{marginTop: 30}}>
            {text}
        </Typography>
    </Box>
)

export default CircleNumber
