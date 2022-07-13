import { KeyboardArrowUp } from '@mui/icons-material'
import { Fab, Tooltip, useScrollTrigger } from '@mui/material'
import { useSpring } from '@react-spring/web'
import { useState } from 'react'
import { AnimatedBox, Slide, stiffConfig } from '~/components'

const ScrollTopButton = () => {
	const [, scroll] = useSpring(() => ({ y: 0 }))
	const [showTooltip, setShowTooltip] = useState(false)

	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: Math.max(
			0,
			document.documentElement.scrollHeight -
				document.documentElement.clientHeight -
				1,
		),
	})

	const button = (
		<Fab
			color="neutral"
			size="small"
			sx={{ color: 'background.default' }}
			onClick={() => {
				setShowTooltip(false)
				scroll.start({
					y: 0,
					from: { y: window.scrollY },
					config: stiffConfig,
					onChange: (_, controller) => {
						window.scroll(0, controller.get().y)
					},
				})
			}}
		>
			<KeyboardArrowUp />
		</Fab>
	)

	return (
		<Slide
			in={trigger}
			from="bottom"
			onStart={() => setShowTooltip(false)}
			onRest={() => setShowTooltip(true)}
		>
			<AnimatedBox position="fixed" right={24} bottom={24}>
				{showTooltip ? (
					<Tooltip title="Scroll to top" disableInteractive>
						{button}
					</Tooltip>
				) : (
					button
				)}
			</AnimatedBox>
		</Slide>
	)
}

export default ScrollTopButton
