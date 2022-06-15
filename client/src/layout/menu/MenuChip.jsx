import { Chip } from '@mui/material'

export const MenuChip = ({ label }) => (
	<Chip
		size="small"
		label={label}
		sx={{
			ml: 2,
			cursor: 'pointer',
		}}
	/>
)
