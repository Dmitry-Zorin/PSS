import { Home, InfoOutlined } from '@mui/icons-material'
import { Box, IconButton, Typography, useScrollTrigger } from '@mui/material'
import { AppBar as RaAppBar } from 'react-admin'
import { Link } from 'react-router-dom'
import { LocaleMenu, ThemeSwitcher } from '.'

const Container = ({ children }) => {
	const isScrolled = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
	})

	return (
		<Box
			sx={({ mixins, palette }) => ({
				height: mixins.appBar.height,
				'& .RaAppBar-appBar': {
					height: mixins.appBar.height,
					bgcolor: isScrolled
						? mixins.appBar.background
						: palette.background.default,
					backdropFilter: 'blur(5px)',
					boxShadow: isScrolled ? mixins.shadows[3] : 'none',
					transition: 'none',
					pl: 1,
				},
				'& .RaAppBar-toolbar': {
					height: 1,
					color: 'text.primary',
				},
				'& .RaAppBar-menuButton': {
					m: '0 !important',
				},
			})}
		>
			{children}
		</Box>
	)
}

export const AppBar = () => (
	<RaAppBar color="inherit" container={Container}>
		<Box sx={{ flexGrow: 1 }}>
			<Typography
				component={Link}
				to="/"
				color="primary"
				variant="h5"
				fontStyle="italic"
				sx={{
					textDecoration: 'none',
					p: 1,
				}}
			>
				PSS
			</Typography>
		</Box>
		<ThemeSwitcher />
		<LocaleMenu />
		<IconButton color="inherit" component={Link} to="/">
			<Home />
		</IconButton>
		<IconButton color="inherit" component={Link} to="/about">
			<InfoOutlined />
		</IconButton>
	</RaAppBar>
)
