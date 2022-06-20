import { Title } from 'components'
import { saveAs } from 'file-saver'
import { useEffect, useState } from 'react'
import {
	Create,
	ReferenceInput,
	required,
	SelectInput,
	SimpleForm,
	useChoicesContext,
} from 'react-admin'
import { createDocx } from './docx'

export interface Author {
	id: string
	lastName: string
	firstName: string
	middleName: string
	info: string
}

export interface Publication {
	id: string
	resourceItemId: string
	title: string
	type?: string
	characterId?: string
	publicationPlace?: string
	year?: number
	outputData?: string
	volume?: number
	authorIds: string[]
	coauthors: string[]
}

export function getAuthorName(author: Author) {
	return `${author.lastName} ${author.firstName} ${author.middleName || ''}`
}

const AuthorInput = ({
	setSelectedChoice,
}: {
	setSelectedChoice: (choice: Author) => void
}) => {
	const { selectedChoices } = useChoicesContext<Author>() as {
		selectedChoices: Author[]
	}
	const choice = selectedChoices?.[0]

	useEffect(() => {
		if (choice) {
			setSelectedChoice(choice)
		}
	}, [choice, setSelectedChoice])

	return (
		<SelectInput
			label="fields.author"
			optionText={(author: Author) => getAuthorName(author)}
		/>
	)
}

const FILENAME = 'Список научных трудов.docx'

const CreatePublicationList = () => {
	const [author, setAuthor] = useState({} as Author)

	const savePublicationList = async () => {
		const docx = await createDocx(author)
		saveAs(docx, FILENAME)
	}

	return (
		<Create title="resources.publicationList.name">
			<>
				<Title />
				<SimpleForm onSubmit={savePublicationList}>
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

export default CreatePublicationList
