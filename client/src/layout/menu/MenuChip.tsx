import { Chip, ChipProps } from '@mui/material'

const MenuChip = (props: ChipProps) => (
	<Chip
		size="small"
		sx={{
			ml: 2,
			cursor: 'pointer',
		}}
		{...props}
	/>
)

export default MenuChip
