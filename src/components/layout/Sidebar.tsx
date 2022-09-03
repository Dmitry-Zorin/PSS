import { Box, BoxProps, Flex, Theme, useTheme } from '@chakra-ui/react'
import { Logo } from 'components'

export default function Sidebar({ children, ...props }: BoxProps) {
	const theme = useTheme<Theme>()

	return (
		<Box
			as="nav"
			display="none"
			pos="sticky"
			top={0}
			h="100vh"
			flexShrink={0}
			bg={{ base: 'bg-layer-1', lg: 'none' }}
			borderRight={{ base: '1px', lg: 0 }}
			borderColor="border"
			sx={{
				'::-webkit-scrollbar': {
					display: 'none',
				},
				[`@media screen and (min-width: ${theme.breakpoints.md})`]: {
					display: 'block',
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
