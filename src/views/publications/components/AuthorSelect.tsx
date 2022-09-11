import { Stack } from '@chakra-ui/react'
import { SelectedItemsList, SelectManyMenu } from 'components'
import { useQuery } from 'hooks'
import { filter } from 'lodash'
import { useState } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import { GetAuthorsResponse } from 'server/services/author'
import { GetPublicationResponse } from 'server/services/publication'

export default function AuthorSelect() {
	const [search, setSearch] = useState<string | undefined>()

	const { control } = useFormContext<GetPublicationResponse>()

	const {
		field: { value: authors, onChange: setAuthors },
	} = useController({
		name: 'authors',
		control,
	})

	const { isLoading, isPreviousData, error, data } =
		useQuery<GetAuthorsResponse>(
			'authors',
			{
				perPage: 100,
				search: search,
			},
			{ keepPreviousData: true },
		)

	return (
		<Stack direction="column-reverse" align="flex-start">
			<SelectManyMenu
				isLoading={isLoading}
				isPreviousData={isPreviousData}
				error={error}
				items={data?.records}
				selectedItems={authors}
				search={setSearch}
				getText={(e) => e.fullName}
				onAdd={(id) => {
					setAuthors([...authors, data!.records.find((e) => e.id === id)!])
				}}
				onRemove={(ids) => {
					setAuthors(filter(authors, ({ id }) => ids.includes(id)))
				}}
			/>
			<SelectedItemsList
				items={authors}
				getKey={(e) => e.id}
				getText={(e) => e.fullName}
				onRemove={({ id }) => {
					setAuthors(authors.filter((e) => e.id !== id))
				}}
			/>
		</Stack>
	)
}
