import { Home, InfoOutlined } from '@mui/icons-material'
import {
	Box,
	IconButton,
	Typography,
	useMediaQuery,
	useScrollTrigger,
} from '@mui/material'
import shadows from '@mui/material/styles/shadows'
import { AppBar as RaAppBar } from 'react-admin'
import { Link } from 'react-router-dom'
import { LocaleSwitcher, ThemeSwitcher } from './components'

const Container = ({ children }) => {
	const isScrolled = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
	})

	return (
		<Box
			sx={(theme) => ({
				height: theme.mixins.appBar.height,
				'& .RaAppBar-toolbar': {
					color: 'text',
					background: theme.mixins.appBar.background,
					backdropFilter: 'blur(10px)',
					boxShadow: isScrolled ? shadows[1] : 'none',
					transition: 'box-shadow 150ms ease',
				},
				'& .RaAppBar-menuButton': {
					margin: 0,
				},
			})}
		>
			{children}
		</Box>
	)
}

export const AppBar = () => {
	const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'))

	return (
		<RaAppBar color="inherit" container={Container}>
			<Box sx={{ flexGrow: 1 }}>
				<Typography
					component={Link}
					to="/"
					color="primary"
					variant="h5"
					fontStyle="italic"
					fontWeight={800}
					sx={{
						textDecoration: 'none',
						pl: 2,
					}}
				>
					PSS
				</Typography>
			</Box>
			{!isSmall && (
				<>
					<LocaleSwitcher />
					<ThemeSwitcher />
					<IconButton component={Link} to="/">
						<Home />
					</IconButton>
					<IconButton component={Link} to="/about">
						<InfoOutlined />
					</IconButton>
				</>
			)}
		</RaAppBar>
	)
}
