import { Box, BoxProps, Typography } from '@mui/material'
import { ReactElement, ReactNode } from 'react'

interface MainAreaProps extends Omit<BoxProps, 'title'> {
	title?: ReactElement | string
	rightMenu?: ReactNode
}

const MainArea = ({ children, title, rightMenu, ...props }: MainAreaProps) => (
	<Box display="flex" px={2} pb={12} {...props}>
		<Box width={1}>
			{title && (
				<Box
					component="header"
					display="flex"
					justifyContent="center"
					maxWidth={1150}
					px={{ xs: 2, lg: 3, xl: 4 }}
					pt={3}
					pb={6}
				>
					{typeof title === 'string' ? (
						<Typography component="h1" variant="h2">
							{title}
						</Typography>
					) : (
						title
					)}
				</Box>
			)}
			<Box component="article" maxWidth={700} mx="auto">
				{children}
			</Box>
		</Box>
		<Box component="aside" width={300} display={{ xs: 'none', xl: 'block' }}>
			{rightMenu}
		</Box>
	</Box>
)

export default MainArea
