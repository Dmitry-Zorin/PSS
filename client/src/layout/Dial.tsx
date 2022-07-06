import { Settings } from '@mui/icons-material'
import {
	Box,
	ClickAwayListener,
	IconButton,
	useScrollTrigger,
} from '@mui/material'
import { AnimatedBox, gentleConfig } from 'components'
import { LocaleMenu, ThemeSwitcher } from 'layout'
import { useEffect, useState } from 'react'
import { useSpring } from 'react-spring'

const Dial = () => {
	const [open, setOpen] = useState(false)
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
	})

	useEffect(() => {
		setOpen(false)
	}, [trigger])

	return (
		<ClickAwayListener onClickAway={() => setOpen(false)}>
			<AnimatedBox
				position="fixed"
				top={24}
				right={24}
				overflow="hidden"
				color="text.primary"
				bgcolor="background.header"
				// borderRadius={2}
				width={40}
				zIndex="fab"
				style={useSpring({
					// height: open ? bounds.height : 40,
					padding: open ? 6 : 0,
					margin: open ? -6 : 0,
					borderRadius: open ? 19 : 16,
					config: gentleConfig,
				})}
			>
				<Box>
					<IconButton color="inherit" onClick={() => setOpen(!open)}>
						<Settings />
					</IconButton>
					<ThemeSwitcher />
					<LocaleMenu />
				</Box>
			</AnimatedBox>
		</ClickAwayListener>
	)
}

export default Dial
