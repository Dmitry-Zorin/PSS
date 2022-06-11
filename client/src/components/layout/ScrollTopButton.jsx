import { KeyboardArrowUp } from '@mui/icons-material'
import { Box, Fab, useScrollTrigger, Zoom } from '@mui/material'

function handleClick() {
	const anchor = document.getElementById('root')

	if (anchor) {
		anchor.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		})
	}
}

export const ScrollTopButton = () => (
	<Zoom in={useScrollTrigger()}>
		<Box
			sx={{
				zIndex: 900,
				position: 'fixed',
				bottom: (t) => t.spacing(3),
				right: (t) => t.spacing(3),
			}}
			onClick={handleClick}
		>
			<Fab color="primary">
				<KeyboardArrowUp />
			</Fab>
		</Box>
	</Zoom>
)
