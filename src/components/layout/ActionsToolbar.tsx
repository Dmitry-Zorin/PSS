import { Flex, HStack, StackProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface ActionsToolbarProps extends StackProps {
	leftActions?: ReactNode
	rightActions?: ReactNode
}

export default function ActionsToolbar({
	leftActions,
	rightActions,
	...props
}: ActionsToolbarProps) {
	return (
		<HStack justify="space-between" py={1} {...props}>
			<Flex flexGrow={1}>{leftActions}</Flex>
			{rightActions && <div>{rightActions}</div>}
		</HStack>
	)
}
