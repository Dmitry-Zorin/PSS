import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const Logo = () => (
	<Typography
		component={Link}
		to="/"
		variant="h6"
		fontFamily="Mulish"
		fontWeight={700}
		color="primary.main"
		p={1}
		sx={{ textDecoration: 'none' }}
	>
		PSS
	</Typography>
)

export default Logo
