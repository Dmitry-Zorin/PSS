import { KeyboardArrowUp } from '@mui/icons-material'
import { Fab, useScrollTrigger, Zoom } from '@mui/material'
import { config, useSpring } from 'react-spring'

const ScrollTopButton = () => {
	const [, scroll] = useSpring(() => ({ y: 0 }))
	return (
		<Zoom in={useScrollTrigger()}>
			<Fab
				color="primary"
				size="medium"
				onClick={() => {
					scroll.start({
						y: 0,
						from: { y: window.scrollY },
						config: config.stiff,
						onChange: (_, controller) => {
							window.scroll(0, controller.get().y)
						},
					})
				}}
				sx={(theme) => ({
					zIndex: 900,
					position: 'fixed',
					bottom: theme.spacing(3),
					right: theme.spacing(3),
					[theme.breakpoints.down('md')]: {
						display: 'none',
					},
				})}
			>
				<KeyboardArrowUp />
			</Fab>
		</Zoom>
	)
}

export default ScrollTopButton
