import { Box, BoxProps, Typography } from '@mui/material'
import { ReactElement, ReactNode } from 'react'

interface MainAreaProps extends Omit<BoxProps, 'title'> {
	title?: ReactElement | string
	rightMenu?: ReactNode
}

const MainArea = ({ children, title, rightMenu, ...props }: MainAreaProps) => (
	<>
		<Box
			component="header"
			maxWidth={1150}
			mx="auto"
			px={{ xs: 2, lg: 3, xl: 4 }}
			pt={3}
			pb={6}
		>
			{title &&
				(typeof title === 'string' ? (
					<Typography component="h1" variant="h3">
						{title}
					</Typography>
				) : (
					title
				))}
		</Box>
		<Box display="flex" px={2} pb={12} {...props}>
			<Box component="article" width={1} maxWidth={700} mx="auto">
				{children}
			</Box>
			<Box component="aside" width={300} display={{ xs: 'none', xl: 'block' }}>
				{rightMenu}
			</Box>
		</Box>
	</>
)

export default MainArea
