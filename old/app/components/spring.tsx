import { Box } from '@mui/material'
import { animated, config } from '@react-spring/web'

export const gentleConfig = {
	...config.gentle,
	mass: 0.5,
}

export const stiffConfig = {
	...config.stiff,
	mass: 0.6,
}

export const AnimatedBox = animated(Box)
