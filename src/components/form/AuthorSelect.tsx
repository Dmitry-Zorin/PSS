import { chakra, FormControl, FormLabel, Stack } from '@chakra-ui/react'
import { SelectedItemsList, SelectManyMenu } from 'components'
import { useQuery } from 'hooks'
import { filter } from 'lodash'
import useTranslation from 'next-translate/useTranslation'
import { Dispatch, SetStateAction, useState } from 'react'
import { GetAuthorsResponse } from 'server/services/author'
import { GetPublicationResponse } from 'server/services/publication'
import { Id } from 'validations/common'

interface AuthorSelectProps {
	authors?: GetPublicationResponse['authors']
	setAuthorIds: Dispatch<SetStateAction<Id[]>>
}

export default function AuthorSelect({
	authors = [],
	setAuthorIds,
}: AuthorSelectProps) {
	const { t } = useTranslation('resources')
	const [search, setSearch] = useState<string | undefined>()
	const [selectedAuthors, setSelectedAuthors] = useState(authors)

	const { error, data } = useQuery<GetAuthorsResponse>(
		'authors',
		{
			perPage: 100,
			search: search,
		},
		{ keepPreviousData: true },
	)

	return (
		<FormControl>
			<FormLabel>{t('authors.name_other')}</FormLabel>
			<Stack direction="row-reverse" align="flex-start">
				<SelectManyMenu
					error={error}
					items={data?.records}
					selectedItems={selectedAuthors}
					search={setSearch}
					getText={(e) => e.fullName}
					onAdd={(id) => {
						setAuthorIds((authorIds) => [...authorIds, id])
						setSelectedAuthors((authors) => [
							...authors,
							data!.records.find((e) => e.id === id)!,
						])
					}}
					onRemove={(ids) => {
						setAuthorIds((authorIds) => {
							const selectedIds = authorIds.filter((id) => ids.includes(id))
							setSelectedAuthors((authors) => {
								return filter(authors, ({ id }) => selectedIds.includes(id))
							})
							return selectedIds
						})
					}}
				/>
				<SelectedItemsList
					items={selectedAuthors}
					placeholder={
						<>
							Нажмите кнопку &quot;Добавить&quot;
							<chakra.span fontWeight="semibold"> &rarr;</chakra.span>
						</>
					}
					getKey={(e) => e.id}
					getText={(e) => e.fullName}
					onRemove={({ id }) => {
						setAuthorIds((authorIds) => {
							return authorIds.filter((authorId) => authorId !== id)
						})
						setSelectedAuthors(selectedAuthors.filter((e) => e.id !== id))
					}}
				/>
			</Stack>
		</FormControl>
	)
}
