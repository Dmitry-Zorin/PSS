import { useScrollTrigger } from '@material-ui/core'
import Fab from '@material-ui/core/Fab'
import { makeStyles } from '@material-ui/core/styles'
import Zoom from '@material-ui/core/Zoom'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import React from 'react'

const useStyles = makeStyles(theme => (
	{
		fabContainer: {
			zIndex: 9000,
			position: 'fixed',
			bottom: theme.spacing(3),
			right: theme.spacing(4),
		},
	}
))

export const ScrollTopButton = () => {
	const styles = useStyles()
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
			<div className={styles.fabContainer} onClick={handleClick}>
				<Fab color='primary'>
					<KeyboardArrowUpIcon/>
				</Fab>
			</div>
		</Zoom>
	)
}
