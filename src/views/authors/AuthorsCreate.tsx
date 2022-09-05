import { DeleteModalButton, Form, FormControl, MainArea } from 'components'
import useTranslation from 'next-translate/useTranslation'
import { GetAuthorResponse } from 'server/services/author'
import { authorFormSchema } from 'validations/author'
import { useSubmitAuthor } from './useSubmitAuthor'

interface AuthorsCreateProps {
	error?: Error | null
	data?: GetAuthorResponse
}

export default function AuthorsCreate({ error, data }: AuthorsCreateProps) {
	const { t } = useTranslation('resources')

	const defaultValues = data
		? { ...authorFormSchema.strip().partial().parse(data) }
		: {}

	return (
		<MainArea
			error={error}
			title={`${t(`common:actions.${data ? 'edit' : 'create'}`)} ${t(
				'authors.name_what',
				null,
				{ fallback: t('authors.name_one') },
			)}`}
		>
			<Form
				onSubmit={useSubmitAuthor(data)}
				schema={authorFormSchema}
				defaultValues={defaultValues}
				actions={
					data && (
						<DeleteModalButton
							id={data.id}
							name={data.fullName}
							resource="authors"
						/>
					)
				}
			>
				<FormControl field="lastName" />
				<FormControl field="firstName" />
				<FormControl field="middleName" optional />
				<FormControl field="info" multiline optional />
			</Form>
		</MainArea>
	)
}
