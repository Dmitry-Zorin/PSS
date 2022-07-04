import { KeyboardArrowUp } from '@mui/icons-material'
import { Fab, Tooltip, useScrollTrigger } from '@mui/material'
import { gentleConfig, stiffConfig } from 'components'
import { animated, useSpring } from 'react-spring'

const AnimatedFab = animated(Fab)

const ScrollTopButton = () => {
	const [, scroll] = useSpring(() => ({ y: 0 }))
	const trigger = useScrollTrigger({ disableHysteresis: true })

	return (
		<Tooltip title="Scroll to top">
			<AnimatedFab
				size="small"
				sx={{
					color: 'text.primary',
					bgcolor: 'background.header',
					position: 'fixed',
					right: 24,
				}}
				style={{
					...useSpring({
						bottom: trigger ? 24 : -52,
						config: gentleConfig,
					}),
				}}
				onClick={() => {
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
			</AnimatedFab>
		</Tooltip>
	)
}

export default ScrollTopButton
