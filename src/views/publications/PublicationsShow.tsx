import { SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { LabeledText } from 'components'
import { GetPublicationResponse } from 'server/services/publication'

interface PublicationsShowProps {
	data: Exclude<GetPublicationResponse, null>
}

export default function PublicationsShow({ data }: PublicationsShowProps) {
	return (
		<Stack spacing={12}>
			<Text>{data.description}</Text>
			<SimpleGrid columns={{ base: 2, lg: 4 }} spacing={12}>
				<LabeledText label="type" text={data.type} />
				<LabeledText label="writtenInYear" text={data.writtenInYear} />
				<LabeledText label="character" text={data.characterId} />
				<LabeledText label="volumeInPages" text={data.volumeInPages} />
			</SimpleGrid>
			{data.extraData && (
				<LabeledText label="outputData" text={data.extraData} />
			)}
		</Stack>
	)
}
