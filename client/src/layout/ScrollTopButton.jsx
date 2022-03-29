import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { useScrollTrigger } from '@mui/material'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import Zoom from '@mui/material/Zoom'
import React from 'react'

export const ScrollTopButton = () => {
	const trigger = useScrollTrigger()

	const handleClick = () => {
		const anchor = document.getElementById('app')

		if (anchor) {
			anchor.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			})
		}
	}

	return (
		<Zoom in={trigger}>
			<Box
				sx={{
					zIndex: 9000,
					position: 'fixed',
					bottom: theme => theme.spacing(3),
					right: theme => theme.spacing(4),
				}}
				onClick={handleClick}
			>
				<Fab color='primary'>
					<KeyboardArrowUpIcon/>
				</Fab>
			</Box>
		</Zoom>
	)
}
