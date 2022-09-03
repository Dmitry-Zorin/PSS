import { Center, Flex, Stack } from '@chakra-ui/react'
import { faCaretRight, faDownload } from '@fortawesome/free-solid-svg-icons'
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
import { GetAuthorResponse } from 'server/services/author'
import PublicationsListItem from '../publications/PublicationsListItem'

interface AuthorsShowProps {
	error: unknown
	data?: GetAuthorResponse
}

export default function AuthorsShow({ error, data }: AuthorsShowProps) {
	const { t } = useTranslation('author')
	const queryClient = useQueryClient()

	return (
		<MainArea
			error={error}
			title={data && data.fullName}
			rightActions={
				data && (
					<EditButton
						href={`/authors/edit/${data.id}`}
						onClick={() => {
							queryClient.setQueryData([`authors/${data.id}`], data)
						}}
					/>
				)
			}
		>
			{data && (
				<>
					<Stack spacing={{ base: 8, sm: 10 }}>
						{data?.info && <LabeledField label="info" text={data.info} />}
						<LabeledField
							label="latestPublications"
							text={
								<>
									<MainList data={{ total: 10 }} pt={2}>
										{data.publications.slice(0, 10).map((e) => (
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
						<Center pt={6}>
							<Button
								variant="solid"
								leftIcon={<Icon icon={faDownload} />}
								onClick={async () => {
									const docx = await import('lib/docx')
									saveAs(
										await docx.createDocx(data),
										`${t('publicationList:name')} (${data.fullName}).docx`,
									)
								}}
								disabled={!data.publications.length}
							>
								{t('publicationList:download')}
							</Button>
						</Center>
					</Stack>
				</>
			)}
		</MainArea>
	)
}
