import { Box, BoxProps, Center } from '@chakra-ui/react'
import { Logo } from 'components'

export default function Sidebar({ children, ...props }: BoxProps) {
	return (
		<Box
			as="nav"
			pos="sticky"
			top={0}
			h="100vh"
			flexShrink={0}
			bg="bg-layer-1"
			display={{
				base: 'none',
				md: 'block',
			}}
			sx={{
				'::-webkit-scrollbar': {
					display: 'none',
				},
			}}
			{...props}
		>
			<Center h={14}>
				<Logo />
			</Center>
			{children}
		</Box>
	)
}
