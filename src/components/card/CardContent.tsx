import { Stack, StackProps } from '@chakra-ui/react'

export default function CardContent(props: StackProps) {
	return <Stack px={{ base: 4, sm: 5 }} pt={3} pb={4} {...props} />
}
