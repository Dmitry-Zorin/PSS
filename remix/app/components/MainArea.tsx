import type { BoxProps } from '@mui/material'
import { Box, Typography } from '@mui/material'
import type { ReactElement, ReactNode } from 'react'

interface MainAreaProps extends Omit<BoxProps, 'title'> {
	title?: ReactElement | string
	rightMenu?: ReactNode
}

const MainArea = ({ children, title, rightMenu, ...props }: MainAreaProps) => (
	<Box maxWidth={1100} mx="auto" pb={8}>
		{title && (
			<Box component="header" pt={3} pb={4}>
				{typeof title === 'string' ? (
					<Typography
						variant="h1"
						align={title.split(' ').length < 4 ? 'center' : 'left'}
					>
						{title}
					</Typography>
				) : (
					title
				)}
			</Box>
		)}
		<Box display="flex" {...props}>
			<Box component="article" width={1} maxWidth={700} mx="auto">
				{children}
			</Box>
			<Box component="aside" flexGrow={1} display={{ xs: 'none', xl: 'block' }}>
				{rightMenu}
			</Box>
		</Box>
	</Box>
)

export default MainArea
