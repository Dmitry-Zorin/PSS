import { Stack } from '@chakra-ui/react'
import { LabeledText } from 'components'
import { GetAuthorResponse } from 'server/services/author'

interface AuthorsShowProps {
	data: GetAuthorResponse
}

export default function AuthorsShow({ data }: AuthorsShowProps) {
	return (
		<Stack spacing={12} pt={2}>
			{data.info && <LabeledText label="info" text={data.info} />}
		</Stack>
	)
}
