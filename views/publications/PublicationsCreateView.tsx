import { Publication } from '@prisma/client'
import { Form, FormControl } from 'components'

export default function PublicationsCreateView() {
	function onSubmit(data: Publication) {
		alert(JSON.stringify(data))
	}

	return (
		<Form onSubmit={onSubmit}>
			<FormControl field="title" />
			<FormControl field="description" optional />
		</Form>
	)
}
