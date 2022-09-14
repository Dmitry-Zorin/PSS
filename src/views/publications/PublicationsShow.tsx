import {
	Badge,
	List,
	ListItem,
	SimpleGrid,
	Stack,
	Text,
} from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { EditButton, LabeledField, MainArea } from 'components'
import { useUrlParams } from 'hooks'
import Link from 'next/link'
import {
	GetPublicationResponse,
	UpdatePublicationResponse,
} from 'server/services/publication'

interface PublicationsShowProps {
	error: unknown
	data?: GetPublicationResponse | UpdatePublicationResponse
}

export default function PublicationsShow({
	error,
	data,
}: PublicationsShowProps) {
	const { type } = useUrlParams()
	const queryClient = useQueryClient()

	if (!data) {
		return <MainArea error={error} />
	}

	const updateData = queryClient.getQueryData<UpdatePublicationResponse>([
		`publications/${data.id}`,
		'update',
	])

	if (updateData) {
		data = updateData
		queryClient.removeQueries([`publications/${data.id}`, 'update'])
	}

	return (
		<MainArea
			capsTitle
			head={{
				title: data.title,
				desc: data.description,
			}}
			error={error}
			title={data.title}
			rightActions={
				<EditButton
					href={`/publications/${type}/edit/${data.id}`}
					onClick={() => {
						queryClient.setQueryData([`publications/${data!.id}`], data)
					}}
				/>
			}
		>
			<Stack spacing={8}>
				{data.description && (
					<LabeledField
						label="description"
						text={<Text whiteSpace="pre-wrap">{data.description}</Text>}
					/>
				)}
				{data.extraData && (
					<LabeledField
						label="extraData"
						text={<Text whiteSpace="pre-wrap">{data.extraData}</Text>}
					/>
				)}
				{data.publicationPlace && (
					<LabeledField label="publicationPlace" text={data.publicationPlace} />
				)}
				<SimpleGrid
					columns={{ base: 1, md: 2 }}
					spacingX={6}
					spacingY={{ base: 8, md: 10 }}
				>
					{!!data.authors.length && (
						<LabeledField
							label="authors"
							text={
								<List spacing={1}>
									{data.authors.map((e) => (
										<ListItem key={e.id}>
											<Link href={`/authors/${e.id}`} passHref>
												<Badge as="a" _hover={{ color: 'primary' }}>
													{e.fullName}
												</Badge>
											</Link>
										</ListItem>
									))}
								</List>
							}
						/>
					)}
					{!!data.coauthors.length ? (
						<LabeledField
							label="coauthors"
							text={
								<List spacing={1}>
									{data.coauthors.map((name, i) => (
										<ListItem key={i}>{name}</ListItem>
									))}
								</List>
							}
						/>
					) : (
						<div />
					)}
					<LabeledField label="typeName" text={data.typeName} />
					<LabeledField label="publicationForm" text={data.publicationForm} />
					<LabeledField
						stat
						label="publicationYear"
						text={data.publicationYear}
					/>
					<LabeledField stat label="pageCount" text={data.pageCount} />
				</SimpleGrid>
			</Stack>
		</MainArea>
	)
}
