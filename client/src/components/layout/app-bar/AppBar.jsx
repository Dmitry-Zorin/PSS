import { Home, Info } from '@mui/icons-material'
import {
	alpha,
	Box,
	IconButton,
	InputBase,
	styled,
	Typography,
	useMediaQuery,
} from '@mui/material'
import { AppBar as RaAppBar } from 'react-admin'
import { Link } from 'react-router-dom'
import { LocaleSwitcher, ThemeSwitcher } from './components'

const SearchBar = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(1),
		width: 'auto',
	},
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(0, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '20ch',
			},
		},
	},
}))

export const AppBar = () => {
	const isSmall = useMediaQuery((t) => t.breakpoints.down('sm'))

	return (
		<RaAppBar
			color="primary"
			enableColorOnDark={true}
			container={Box}
			sx={{
				...(isSmall && {
					top: 'auto',
					bottom: 0,
				}),
			}}
		>
			<Box sx={{ flexGrow: 1 }}>
				<Typography
					component={Link}
					to="/"
					color="primary"
					sx={{
						fontFamily: '"Baloo 2"',
						fontStyle: 'italic',
						fontSize: '1.7rem',
						fontWeight: 700,
						textDecoration: 'none',
						p: 1,
						pl: 0,
					}}
				>
					PSS
				</Typography>
			</Box>
			{!isSmall && (
				<>
					{/* <SearchBar>
						<SearchIconWrapper>
							<Search />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder="Search…"
							inputProps={{ 'aria-label': 'search' }}
						/>
					</SearchBar> */}
					<LocaleSwitcher />
					<ThemeSwitcher />
					<IconButton component={Link} to="/">
						<Home />
					</IconButton>
					<IconButton component={Link} to="/about">
						<Info />
					</IconButton>
				</>
			)}
		</RaAppBar>
	)
}
