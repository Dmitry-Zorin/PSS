import { Chip, ChipProps } from '@mui/material'

const MenuChip = (props: ChipProps) => (
	<Chip
		size="small"
		sx={{
			cursor: 'pointer',
			borderRadius: 2,
		}}
		{...props}
	/>
)

export default MenuChip
