import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const Logo = () => (
	<Typography
		component={Link}
		to="/"
		color="primary"
		variant="h5"
		fontWeight={700}
		fontStyle="italic"
		p={1}
		sx={{ textDecoration: 'none' }}
	>
		PSS
	</Typography>
)

export default Logo
