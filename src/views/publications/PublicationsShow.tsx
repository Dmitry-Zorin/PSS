import { SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { LabeledText } from 'components'
import { GetPublicationResponse } from 'server/services/publication'

interface PublicationsShowProps {
	data: GetPublicationResponse
}

export default function PublicationsShow({ data }: PublicationsShowProps) {
	return (
		<Stack spacing={{ base: 8, sm: 10 }}>
			{data.description && <Text>{data.description}</Text>}
			{data.extraData && (
				<LabeledText label="extraData" text={data.extraData} />
			)}
			<SimpleGrid
				columns={{ base: 2, lg: 4 }}
				spacingX={6}
				spacingY={{ base: 8, sm: 10 }}
			>
				<LabeledText stat label="type" text={data.type} />
				<LabeledText stat label="writtenInYear" text={data.writtenInYear} />
				<LabeledText stat label="character" text={data.characterId} />
				<LabeledText stat label="volumeInPages" text={data.volumeInPages} />
			</SimpleGrid>
		</Stack>
	)
}
