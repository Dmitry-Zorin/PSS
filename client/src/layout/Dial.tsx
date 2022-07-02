import { Home, Info, Settings } from '@mui/icons-material'
import { Box, IconButton, useScrollTrigger } from '@mui/material'
import { LocaleMenu, ThemeSwitcher } from 'layout'
import { useEffect, useState } from 'react'
import { LoadingIndicator, UserMenu } from 'react-admin'
import { Link } from 'react-router-dom'
import { config, useSpring } from 'react-spring'
import { AnimatedBox } from './Layout'

const Dial = () => {
	const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 40 })
	const [open, setOpen] = useState(false)

	useEffect(() => {
		setOpen(!trigger)
	}, [trigger])

	return (
		<AnimatedBox
			position="fixed"
			top={7}
			right={24}
			overflow="hidden"
			color="text.primary"
			// bgcolor="background.header"
			display="flex"
			justifyContent="flex-end"
			borderRadius={50}
			height={40}
			zIndex={1}
			p={0}
			style={useSpring({
				width: open ? 40 * 7 : 40,
				config: {
					...config.gentle,
					mass: 0.5,
				},
			})}
		>
			<Box display="flex" m="auto">
				<ThemeSwitcher />
				<LocaleMenu />
				<IconButton color="inherit" component={Link} to="/about">
					<Info />
				</IconButton>
				<IconButton color="inherit" component={Link} to="/">
					<Home />
				</IconButton>
				<LoadingIndicator sx={{ '.RaLoadingIndicator-loader': { m: 1.5 } }} />
				<UserMenu />
				<IconButton color="inherit" onClick={() => setOpen(!open)}>
					<Settings />
				</IconButton>
			</Box>
		</AnimatedBox>
	)
}

export default Dial
