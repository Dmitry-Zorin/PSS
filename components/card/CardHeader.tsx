import { HStack, StackProps } from '@chakra-ui/react'

export default function CardHeader(props: StackProps) {
	return <HStack spacing={4} p={4} bg="bg-100" {...props} />
}
