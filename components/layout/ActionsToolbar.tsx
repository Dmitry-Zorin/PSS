import { Flex, useColorModeValue } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface ActionsToolbarProps {
	children: ReactNode
}

export default function ActionsToolbar({ children }: ActionsToolbarProps) {
	return (
		<Flex
			color={useColorModeValue('gray.600', 'white')}
			minH={15}
			py={{ base: 2 }}
			px={{ base: 4 }}
		>
			{children}
		</Flex>
	)
}
