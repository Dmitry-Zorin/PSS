import { List, ListItem, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import {
	DeleteModalButton,
	EditButton,
	LabeledText,
	MainArea,
} from 'components'
import { useUrlParams } from 'hooks'
import { GetPublicationResponse } from 'server/services/publication'

interface PublicationsShowProps {
	error: unknown
	data?: GetPublicationResponse
}

export default function PublicationsShow({
	error,
	data,
}: PublicationsShowProps) {
	const { category } = useUrlParams()

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
					<>
						<EditButton
							href={{
								pathname: `/publications/${category}/create`,
								query: { data: JSON.stringify(data) },
							}}
						/>
						<DeleteModalButton
							id={data.id}
							name={data.title}
							resource="publications"
							subresource={category}
						/>
					</>
				)
			}
		>
			{data && (
				<Stack spacing={{ base: 8, sm: 10 }}>
					{data.description && <Text>{data.description}</Text>}
					{data.extraData && (
						<LabeledText label="extraData" text={data.extraData} />
					)}
					<Stack
						direction={{ base: 'column', md: 'row' }}
						spacing={{ base: 8, sm: 10, md: 2 }}
						align="top"
					>
						<LabeledText
							flexGrow={1}
							label="authors"
							text={
								<List spacing={1}>
									{data.authors.map((e) => (
										<ListItem key={e.id}>{e.fullName}</ListItem>
									))}
								</List>
							}
						/>
						{data.coauthors.length && (
							<LabeledText
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
			)}
		</MainArea>
	)
}
