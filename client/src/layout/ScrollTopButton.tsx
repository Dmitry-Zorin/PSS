import { KeyboardArrowUp } from '@mui/icons-material'
import { Fab, useScrollTrigger } from '@mui/material'
import { animated, config, useSpring } from 'react-spring'

const ScrollTopButton = () => {
	const [, scroll] = useSpring(() => ({ y: 0 }))
	const trigger = useScrollTrigger({ disableHysteresis: true })

	return (
		<animated.div
			style={{
				position: 'fixed',
				right: 24,
				...useSpring({
					bottom: trigger ? 24 : -52,
					config: {
						...config.gentle,
						mass: 0.5,
					},
				}),
			}}
		>
			<Fab
				color="primary"
				size="small"
				onClick={() => {
					scroll.start({
						y: 0,
						from: { y: window.scrollY },
						config: {
							...config.stiff,
							mass: 0.6,
						},
						onChange: (_, controller) => {
							window.scroll(0, controller.get().y)
						},
					})
				}}
			>
				<KeyboardArrowUp />
			</Fab>
		</animated.div>
	)
}

export default ScrollTopButton
