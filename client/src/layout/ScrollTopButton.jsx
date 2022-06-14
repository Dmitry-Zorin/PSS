import { KeyboardArrowUp } from '@mui/icons-material'
import { Fab, useScrollTrigger, Zoom } from '@mui/material'

export const ScrollTopButton = () => (
	<Zoom in={useScrollTrigger({ disableHysteresis: true })}>
		<Fab
			color="primary"
			onClick={() => {
				document.getElementById('root').scrollIntoView({
					behavior: 'smooth',
					block: 'start',
				})
			}}
			sx={(theme) => ({
				zIndex: 900,
				position: 'fixed',
				bottom: theme.spacing(3),
				right: theme.spacing(3),
			})}
		>
			<KeyboardArrowUp />
		</Fab>
	</Zoom>
)
