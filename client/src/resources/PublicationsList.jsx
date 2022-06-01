import React, { useEffect, useState } from 'react'
import {
	Create,
	ReferenceInput,
	required,
	SelectInput,
	SimpleForm,
	useChoicesContext,
	useDataProvider,
} from 'react-admin'
import { createForm16 } from '../form16'

const PublicationsList = () => {
	const dataProvider = useDataProvider()

	const [author, setAuthor] = useState()

	const generateList = async () => {
		const { data } = await dataProvider.getMany('publications', {
			ids: author.publicationIds,
		})
		console.log(data)
		const authorName = `${author.lastName} ${author.firstName} ${
			author.middleName || ''
		}`
		const dataPiece = { old: [], new: data }
		await createForm16(
			[dataPiece, dataPiece, dataPiece],
			authorName,
			'adf, asdf',
		)
	}

	return (
		<Create title="resources.publicationsList.name">
			<SimpleForm onSubmit={generateList}>
				<ReferenceInput
					source="authorId"
					reference="authors"
					validate={required()}
				>
					<AuthorInput setSelectedChoice={setAuthor} />
				</ReferenceInput>
			</SimpleForm>
		</Create>
	)
}

const AuthorInput = ({ setSelectedChoice }) => {
	const { selectedChoices } = useChoicesContext()
	const choice = selectedChoices?.[0]

	useEffect(() => {
		if (choice) {
			setSelectedChoice(choice)
		}
	}, [choice])

	return (
		<SelectInput
			label="fields.author"
			optionText={(record) =>
				`${record.lastName} ${record.firstName} ${record?.middleName || ''}`
			}
		/>
	)
}

export default PublicationsList
