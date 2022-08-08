import { SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { Publication } from '@prisma/client'
import { LabeledText } from 'components'
import PublicationsShowSkeleton from './PublicationsShowSkeleton'

interface PublicationsShowProps {
	data?: Publication | null | void
}

export default function PublicationsShow({ data }: PublicationsShowProps) {
	return (
		<Stack spacing={12} pt={2}>
			{data ? (
				<>
					<PublicationsShowSkeleton />
					{/* <Text>{data.description}</Text>
					<SimpleGrid columns={{ base: 2, lg: 4 }} spacing={12}>
						<LabeledText label="type" text={data.type} />
						<LabeledText label="writtenInYear" text={data.writtenInYear} />
						<LabeledText label="character" text={data.characterId} />
						<LabeledText label="volumeInPages" text={data.volumeInPages} />
					</SimpleGrid>
					{data.extraData && (
						<LabeledText label="outputData" text={data.extraData} />
					)} */}
				</>
			) : (
				<PublicationsShowSkeleton />
			)}
		</Stack>
	)
}
