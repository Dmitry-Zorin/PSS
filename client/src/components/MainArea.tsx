import { Box, BoxProps, Typography } from '@mui/material'
import { ReactElement, ReactNode } from 'react'

interface MainAreaProps extends Omit<BoxProps, 'title'> {
	title?: ReactElement | string
	rightMenu?: ReactNode
}

const MainArea = ({ children, title, rightMenu, ...props }: MainAreaProps) => (
	<Box maxWidth={1100} mx="auto" px={{ xs: 2, lg: 3, xl: 4 }} pb={8}>
		{title && (
			<Box component="header" pb={6}>
				{typeof title === 'string' ? (
					<Typography component="h1" variant="h2">
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
