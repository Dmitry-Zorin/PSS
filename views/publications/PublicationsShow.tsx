import { SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { Publication } from '@prisma/client'
import { LabeledText } from 'components'

interface PublicationsShowProps {
	data?: Publication
}

export default function PublicationsShow({ data }: PublicationsShowProps) {
	return data ? (
		<Stack spacing={12} pt={2}>
			<Text>{data.description}</Text>
			<SimpleGrid columns={{ base: 2, lg: 4 }} spacing={12}>
				<LabeledText label="type" text={data.type} />
				<LabeledText label="year" text={data.writtenInYear} />
				<LabeledText label="character" text={data.characterId} />
				<LabeledText label="volume" text={data.volumeInPages} />
			</SimpleGrid>
			{data.extraData && (
				<LabeledText label="outputData" text={data.extraData} />
			)}
		</Stack>
	) : null
}
