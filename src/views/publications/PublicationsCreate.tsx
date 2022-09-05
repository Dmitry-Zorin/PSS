import { Stack } from '@chakra-ui/react'
import {
	Authors,
	Coauthors,
	DeleteModalButton,
	Form,
	FormControl,
	FormControlGroup,
	MainArea,
} from 'components'
import { useUrlParams } from 'hooks'
import useTranslation from 'next-translate/useTranslation'
import { GetPublicationResponse } from 'server/services/publication'
import { publicationFormSchema } from 'validations/publication'
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
	const { category } = useUrlParams()

	const defaultValues = data
		? {
				...publicationFormSchema.strip().partial().parse(data),
				authors: data.authors,
				coauthors: [...data.coauthors, ''],
		  }
		: {
				authors: [],
				coauthors: [''],
		  }

	return (
		<MainArea
			error={error}
			title={`${t(`common:actions.${data ? 'edit' : 'create'}`)} ${t(
				`${category}.name_what`,
				null,
				{ fallback: t(`${category}.name_one`) },
			)}`}
		>
			<Form
				onSubmit={useSubmitPublication(data)}
				schema={publicationFormSchema}
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
				<Authors />
				<Coauthors />
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
				<FormControl field="publicationPlace" optional />
				<FormControl field="character" optional />
				<FormControl field="extraData" multiline optional />
			</Form>
		</MainArea>
	)
}
