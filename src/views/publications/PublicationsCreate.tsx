import { Stack } from '@chakra-ui/react'
import {
	AuthorSelect,
	Coauthors,
	DeleteModalButton,
	FileUpload,
	Form,
	FormControl,
	FormControlGroup,
	MainArea,
} from 'components'
import { useUrlParams } from 'hooks'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'
import { GetPublicationResponse } from 'server/services/publication'
import { Id } from 'validations/common'
import {
	createPublicationSchema,
	publicationSchema,
} from 'validations/publication'
import { useSubmitPublication } from './useSubmitPublication'

const currentYear = new Date().getFullYear()

interface PublicationsCreateProps {
	error: Error | null
	data?: GetPublicationResponse
}

export default function PublicationsCreate({
	error,
	data,
}: PublicationsCreateProps) {
	const { t } = useTranslation('resources')
	const { category } = useUrlParams()

	const [authorIds, setAuthorIds] = useState<Id[]>(
		data?.authors.map((e) => e.id) ?? [],
	)

	const [coauthors, setCoauthors] = useState<string[]>([
		...(data?.coauthors ?? []),
		'',
	])

	const defaultValues = data
		? createPublicationSchema
				.strip()
				.omit({
					category: true,
					authorIds: true,
					coauthors: true,
				})
				.partial()
				.parse(data)
		: undefined

	return (
		<MainArea
			error={error}
			title={`${t('common:actions.create')} ${t(`${category}.name_what`, null, {
				fallback: t(`${category}.name_one`),
			})}`}
		>
			<Form
				onSubmit={useSubmitPublication(data, {
					authorIds,
					coauthors: coauthors.slice(0, -1),
				})}
				schema={publicationSchema}
				defaultValues={defaultValues}
				actions={
					data && (
						<DeleteModalButton
							id={data.id}
							name={data.title}
							resource="publications"
							subresource={category}
						/>
					)
				}
			>
				<FormControl field="title" multiline minH={10} />
				<FormControl field="description" multiline optional />
				<Stack
					as={FormControlGroup}
					direction={{ base: 'column', md: 'row' }}
					spacing={6}
					align="flex-start"
				>
					<FormControl
						field="type"
						placeholder={t(`${category}.name`, { count: 1 })}
						optional
					/>
					<FormControl
						field="writtenInYear"
						type="number"
						placeholder={currentYear.toString()}
						optional
					/>
					<FormControl
						field="volumeInPages"
						type="number"
						placeholder="1"
						optional
					/>
				</Stack>
				<AuthorSelect authors={data?.authors} setAuthorIds={setAuthorIds} />
				<Coauthors {...{ coauthors, setCoauthors }} />
				<FormControl field="extraData" multiline optional />
				<FileUpload />
			</Form>
		</MainArea>
	)
}
