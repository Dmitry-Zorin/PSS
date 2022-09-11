import { SimpleGrid } from '@chakra-ui/react'
import {
	CancelButton,
	DeleteModalButton,
	Form,
	FormControl,
	MainArea,
} from 'components'
import { usePersistedForm, useUrlParams } from 'hooks'
import useTranslation from 'next-translate/useTranslation'
import { GetPublicationResponse } from 'server/services/publication'
import { publicationFormSchema } from 'validations/publication'
import Authors from './components/Authors'
import Coauthors from './components/Coauthors'
import PublicationForm from './components/PublicationForm'
import { useSubmitPublication } from './useSubmitPublication'

const currentYear = new Date().getFullYear()

interface PublicationsCreateProps {
	error?: Error | null
	data?: GetPublicationResponse
}

export default function PublicationsCreate({
	error,
	data,
}: PublicationsCreateProps) {
	const { t } = useTranslation('resources')
	const { clearForm } = usePersistedForm()
	const { type } = useUrlParams()

	const defaultValues = data
		? {
				...publicationFormSchema
					.strip()
					.partial()
					.omit({ authors: true })
					.parse(data),
				authors: data.authors,
				coauthors: [...data.coauthors, ''],
		  }
		: {
				authors: [],
				coauthors: [''],
				publicationForm: 'Печатная',
		  }

	return (
		<MainArea
			error={error}
			title={`${t(`common:actions.${data ? 'edit' : 'create'}`)} ${t(
				`${type}.name_what`,
				null,
				{ fallback: t(`${type}.name_one`) },
			)}`}
		>
			<Form
				onSubmit={useSubmitPublication(data)}
				schema={publicationFormSchema}
				useFormProps={{ defaultValues }}
				actions={
					data ? (
						<DeleteModalButton
							id={data.id}
							name={data.title}
							resource="publications"
							subresource={type}
						/>
					) : (
						<CancelButton
							href={`/publications/${type}`}
							onClick={() => clearForm()}
						/>
					)
				}
			>
				<FormControl field="title" multiline minH={10} />
				<FormControl field="description" multiline optional />
				<Authors />
				<Coauthors />
				<SimpleGrid columns={{ base: 1, sm: 2 }} spacing={6}>
					<FormControl
						field="typeName"
						placeholder={t(`${type}.name`, { count: 1 })}
						optional
					/>
					<FormControl
						field="publicationYear"
						type="number"
						placeholder={currentYear.toString()}
						optional
					/>
					<PublicationForm />
					<FormControl
						field="pageCount"
						type="number"
						placeholder="1"
						optional
					/>
				</SimpleGrid>
				<FormControl field="publicationPlace" optional />
				<FormControl field="extraData" multiline optional />
			</Form>
		</MainArea>
	)
}
