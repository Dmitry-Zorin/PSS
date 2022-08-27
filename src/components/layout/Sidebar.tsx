import { Box, BoxProps, Flex } from '@chakra-ui/react'
import { Logo } from 'components'

export default function Sidebar({ children, ...props }: BoxProps) {
	return (
		<Box
			as="nav"
			pos="sticky"
			top={0}
			h="100vh"
			flexShrink={0}
			display={{ base: 'none', md: 'block' }}
			bg={{ base: 'bg-layer-1', lg: 'none' }}
			borderRight={{ base: '1px', lg: 0 }}
			borderColor="border"
			sx={{
				'::-webkit-scrollbar': {
					display: 'none',
				},
			}}
			{...props}
		>
			<Flex
				h={14}
				align="center"
				justify={{ base: 'center', lg: 'flex-start' }}
				pl={{ lg: 8 }}
			>
				<Logo />
			</Flex>
			{children}
		</Box>
	)
}
