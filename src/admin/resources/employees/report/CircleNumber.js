import {Paper, Typography} from "@material-ui/core"
import React from "react"

const CircleNumber = ({num, text, color = 2}) => (
    <div style={{flexGrow: 1, width: '33%'}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Paper elevation={4} style={{
                width: 90,
                height: 90,
                borderRadius: 100,
                border: `9px solid #${['', 'BFFF00', '6AFF00'][color]}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
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
        </div>
        <Typography style={{marginTop: 30}}>
            {text}
        </Typography>
    </div>
)

export default CircleNumber
