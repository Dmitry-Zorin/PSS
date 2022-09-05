import { List, ListItem, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { EditButton, LabeledField, Link, MainArea } from 'components'
import { useUrlParams } from 'hooks'
import { GetPublicationResponse } from '../../server/services/publication'

interface PublicationsShowProps {
	error: unknown
	data?: GetPublicationResponse
}

export default function PublicationsShow({
	error,
	data,
}: PublicationsShowProps) {
	const { category } = useUrlParams()
	const queryClient = useQueryClient()

	return (
		<MainArea
			head={{
				title: data?.title,
				desc: data?.description,
			}}
			error={error}
			title={data?.title}
			rightActions={
				data && (
					<EditButton
						href={`/publications/${category}/edit/${data.id}`}
						onClick={() => {
							queryClient.setQueryData([`publications/${data.id}`], data)
						}}
					/>
				)
			}
		>
			{data && (
				<Stack spacing={{ base: 8, sm: 10 }}>
					{data.description && <Text>{data.description}</Text>}
					<SimpleGrid
						columns={{ base: 2, sm: 3 }}
						spacingX={6}
						spacingY={{ base: 8, sm: 10 }}
					>
						<LabeledField stat label="type" text={data.type} />
						<LabeledField
							stat
							label="writtenInYear"
							text={data.writtenInYear}
						/>
						<LabeledField
							stat
							label="volumeInPages"
							text={data.volumeInPages}
						/>
					</SimpleGrid>
					<Stack
						direction={{ base: 'column', md: 'row' }}
						spacing={{ base: 8, sm: 10, md: 2 }}
						align="top"
					>
						<LabeledField
							flexGrow={1}
							label="authors"
							text={
								<List spacing={1}>
									{data.authors.map((e) => (
										<ListItem key={e.id}>
											<Link href={`/authors/${e.id}`}>{e.fullName}</Link>
										</ListItem>
									))}
								</List>
							}
						/>
						{data.coauthors.length && (
							<LabeledField
								flexGrow={1}
								label="coauthors"
								text={
									<List spacing={1}>
										{data.coauthors.map((name, i) => (
											<ListItem key={i}>{name}</ListItem>
										))}
									</List>
								}
							/>
						)}
					</Stack>
					{data.publicationPlace && (
						<LabeledField
							label="publicationPlace"
							text={data.publicationPlace}
						/>
					)}
					{data.character && (
						<LabeledField label="character" text={data.character} />
					)}
					{data.extraData && (
						<LabeledField label="extraData" text={data.extraData} />
					)}
				</Stack>
			)}
		</MainArea>
	)
}
