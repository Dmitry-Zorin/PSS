import type { BoxProps } from '@mui/material'
import { Box } from '@mui/material'

const ScrollableBox = ({ sx, ...props }: BoxProps) => (
	<Box
		sx={[
			{
				overflowX: 'hidden',
				overflowY: 'auto',
			},
			...(Array.isArray(sx) ? sx : [sx]),
		]}
		{...props}
	/>
)

export default ScrollableBox
