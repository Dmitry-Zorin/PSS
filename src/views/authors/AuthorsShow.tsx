import { Stack } from '@chakra-ui/react'
import { Author } from '@prisma/client'
import { LabeledText } from 'components'

interface AuthorsShowProps {
	data?: Author
}

export default function AuthorsShow({ data }: AuthorsShowProps) {
	return data ? (
		<Stack spacing={12} pt={2}>
			{data.info && <LabeledText label="info" text={data.info} />}
		</Stack>
	) : null
}
