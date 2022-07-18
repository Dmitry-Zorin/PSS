import { Flex, HStack } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface ActionsToolbarProps {
	leftActions?: ReactNode
	rightActions?: ReactNode
}

export default function ActionsToolbar({
	leftActions,
	rightActions,
}: ActionsToolbarProps) {
	return (
		<HStack justify="space-between" py={6}>
			<Flex flexGrow={1}>{leftActions}</Flex>
			{rightActions && <div>{rightActions}</div>}
		</HStack>
	)
}
