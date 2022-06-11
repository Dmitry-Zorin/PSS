import { Title } from 'components/Title'
import { useEffect, useState } from 'react'
import {
	Create,
	ReferenceInput,
	required,
	SelectInput,
	SimpleForm,
	useChoicesContext,
	useDataProvider,
} from 'react-admin'
import { createPublicationList } from './docx/publication-list'

const AuthorInput = ({ setSelectedChoice }) => {
	const { selectedChoices } = useChoicesContext()
	const choice = selectedChoices?.[0]

	useEffect(() => {
		if (choice) {
			setSelectedChoice(choice)
		}
	}, [choice, setSelectedChoice])

	return (
		<SelectInput
			label="fields.author"
			optionText={(record) => {
				return `${record.lastName} ${record.firstName} ${
					record?.middleName || ''
				}`
			}}
		/>
	)
}

export const CreatePublicationList = () => {
	const dataProvider = useDataProvider()

	const [author, setAuthor] = useState()

	const generateList = async () => {
		const { data } = await dataProvider.getMany('publications', {
			ids: author.publicationIds,
		})
		const authorName = `${author.lastName} ${author.firstName} ${
			author.middleName || ''
		}`
		const dataPiece = { old: [], new: data }
		await createPublicationList(
			[dataPiece, dataPiece, dataPiece],
			authorName,
			'adf, asdf',
		)
	}

	return (
		<Create title="resources.publicationList.name">
			<>
				<Title />
				<SimpleForm onSubmit={generateList}>
					<ReferenceInput
						source="authorId"
						reference="authors"
						validate={required()}
					>
						<AuthorInput setSelectedChoice={setAuthor} />
					</ReferenceInput>
				</SimpleForm>
			</>
		</Create>
	)
}
