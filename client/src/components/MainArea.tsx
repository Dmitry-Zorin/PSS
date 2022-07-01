import { Box, BoxProps } from '@mui/material'
import { ReactNode } from 'react'

interface MainAreaProps extends BoxProps {
	rightMenu?: ReactNode
}

const MainArea = ({ children, rightMenu, ...props }: MainAreaProps) => (
	<Box display="flex" px={2} pb={12} {...props}>
		<Box width={1} maxWidth={700} mx="auto">
			{children}
		</Box>
		<Box component="aside" width={300} display={{ xs: 'none', xl: 'block' }}>
			{rightMenu}
		</Box>
	</Box>
)

export default MainArea
