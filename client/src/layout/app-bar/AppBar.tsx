import { Home, InfoOutlined } from '@mui/icons-material'
import { Box, IconButton, Typography, useScrollTrigger } from '@mui/material'
import { ReactNode } from 'react'
import { AppBar as RaAppBar, AppBarProps } from 'react-admin'
import { Link } from 'react-router-dom'
import { LocaleMenu, ThemeSwitcher } from '.'

const Container = ({ children }: { children: ReactNode }) => {
	const isScrolled = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
	})

	return (
		<Box
			sx={({ appBar }) => ({
				height: appBar.height,
				'& .RaAppBar-appBar': {
					height: appBar.height,
					backdropFilter: 'blur(5px)',
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

const AppBar = (props: AppBarProps) => (
	<RaAppBar color="inherit" container={Container} {...props}>
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

export default AppBar
