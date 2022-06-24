import { Box, BoxProps } from '@mui/material'
import { ReactNode } from 'react'

interface MainAreaProps extends BoxProps {
	rightMenu?: ReactNode
}

const MainArea = ({ children, rightMenu, ...props }: MainAreaProps) => (
	<Box display="flex" px={2} pb={12} {...props}>
		<Box maxWidth={700} mx="auto">
			{children}
		</Box>
		<Box display={{ xs: 'none', xl: 'block' }} width={300}>
			{rightMenu}
		</Box>
	</Box>
)

export default MainArea
