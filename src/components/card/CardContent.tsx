import { Stack, StackProps } from '@chakra-ui/react'

export default function CardContent(props: StackProps) {
	return <Stack spacing={2} px={{ base: 4, sm: 5 }} pt={3} pb={4} {...props} />
}
