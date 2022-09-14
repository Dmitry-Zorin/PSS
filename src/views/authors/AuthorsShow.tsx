import { Center, Flex, Stack } from '@chakra-ui/react'
import { faCaretRight, faFileWord } from '@fortawesome/free-solid-svg-icons'
import { useQueryClient } from '@tanstack/react-query'
import {
	Button,
	EditButton,
	Icon,
	LabeledField,
	Link,
	MainArea,
	MainList,
} from 'components'
import { saveAs } from 'file-saver'
import useTranslation from 'next-translate/useTranslation'
import { useEffect } from 'react'
import { GetAuthorResponse, UpdateAuthorResponse } from 'server/services/author'
import PublicationsListItem from '../publications/PublicationsListItem'

interface AuthorsShowProps {
	error: unknown
	data?: GetAuthorResponse | UpdateAuthorResponse
}

export default function AuthorsShow({ error, data }: AuthorsShowProps) {
	const { t } = useTranslation('author')
	const queryClient = useQueryClient()

	useEffect(() => {
		if (data) {
			queryClient.setQueryData([`authors/${data.id}`], data)
		}
	}, [data, queryClient])

	if (!data) {
		return <MainArea error={error} />
	}

	const updateData = queryClient.getQueryData<UpdateAuthorResponse>([
		`authors/${data.id}`,
		'update',
	])

	if (updateData) {
		data = updateData
		queryClient.removeQueries([`authors/${data.id}`, 'update'])
	}

	return (
		<MainArea
			error={error}
			title={data.fullName}
			rightActions={<EditButton href={`/authors/edit/${data.id}`} />}
		>
			<Stack spacing={8}>
				{data.info && <LabeledField label="info" text={data.info} />}
				{!!data.publications.length && (
					<>
						<LabeledField
							stat
							label="publicationsCount"
							text={data.publications.length}
						/>
						<LabeledField
							label="latestPublications"
							text={
								<>
									<MainList total={5} pt={2}>
										{data.publications.slice(0, 5).map((e) => (
											<PublicationsListItem
												key={e.id}
												record={e}
												simplified
												showIcon
											/>
										))}
									</MainList>
									<Flex justify="flex-end" pt={1.5}>
										<Link href={`/publications?authorId=${data.id}`}>
											{t('viewAllPublications')}
											<Icon icon={faCaretRight} ml="1px" mb="-1px" />
										</Link>
									</Flex>
								</>
							}
						/>
						<Center>
							<Button
								variant="solid"
								leftIcon={<Icon icon={faFileWord} />}
								onClick={async () => {
									const docx = await import('lib/docx')
									saveAs(
										await docx.createDocx(data!),
										`${t('publicationList:name')} (${data!.fullName}).docx`,
									)
								}}
								disabled={!data.publications.length}
							>
								{t('publicationList:download')}
							</Button>
						</Center>
					</>
				)}
			</Stack>
		</MainArea>
	)
}
