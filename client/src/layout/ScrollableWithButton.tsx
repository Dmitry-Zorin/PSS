import { KeyboardArrowUp } from '@mui/icons-material'
import { Box, Fab, useScrollTrigger, Zoom } from '@mui/material'
import { useRef } from 'react'
import { config, useSpring } from 'react-spring'

const ScrollableWithButton = () => {
	const ref = useRef<HTMLElement>()
	const [, scroll] = useSpring(() => ({ y: 0 }))

	return (
		<Box ref={ref} position="absolute" top={0}>
			<Zoom in={useScrollTrigger({ target: ref.current })}>
				<Fab
					color="primary"
					size="small"
					onClick={() => {
						scroll.start({
							y: 0,
							from: { y: ref.current!.scrollTop },
							config: {
								...config.gentle,
								mass: 0.5,
							},
							onChange: (_, controller) => {
								ref.current!.scrollTop = controller.get().y
							},
						})
					}}
					sx={(theme) => ({
						zIndex: 900,
						position: 'fixed',
						bottom: theme.spacing(3),
						right: theme.spacing(3),
						display: {
							xs: 'none',
							md: 'inline-flex',
						},
					})}
				>
					<KeyboardArrowUp />
				</Fab>
			</Zoom>
		</Box>
	)
}

export default ScrollableWithButton
