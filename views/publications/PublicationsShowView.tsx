import { SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { Publication } from '@prisma/client'
import { LabeledText } from 'components'

interface PublicationsShowViewProps {
	data?: Publication
}

export default function PublicationsShowView({
	data,
}: PublicationsShowViewProps) {
	return data ? (
		<Stack spacing={12} pt={2}>
			<Text>{data.description}</Text>
			<SimpleGrid columns={{ base: 2, lg: 4 }} spacing={12}>
				<LabeledText label="type" text={data.type} />
				<LabeledText label="year" text={data.year} />
				<LabeledText label="character" text={data.characterId} />
				<LabeledText label="volume" text={data.pages} />
			</SimpleGrid>
			{data.outputData && (
				<LabeledText label="outputData" text={data.outputData} />
			)}
		</Stack>
	) : null
}
