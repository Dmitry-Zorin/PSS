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

export const ScrollTopButton = () => {
	const trigger = useScrollTrigger()

	return (
		<Zoom in={trigger}>
			<Box
				sx={{
					zIndex: 9000,
					position: 'fixed',
					bottom: (theme) => theme.spacing(3),
					right: (theme) => theme.spacing(4),
				}}
				onClick={handleClick}
			>
				<Fab color="primary">
					<KeyboardArrowUp />
				</Fab>
			</Box>
		</Zoom>
	)
}
