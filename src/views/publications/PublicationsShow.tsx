import { SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { LabeledText } from 'components'
import { inferQueryOutput } from 'utils'

interface PublicationsShowProps {
	data: inferQueryOutput<'publication.one'>
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
