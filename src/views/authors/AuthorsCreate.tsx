import { useQueryClient } from '@tanstack/react-query'
import { Form, FormControl } from 'components'
import { useEventToast, useMutation } from 'hooks'
import { useRouter } from 'next/router'
import { CreateAuthorResponse } from 'server/services/author'
import { authorSchema, CreateAuthor } from 'validations/author'

export default function AuthorsCreate() {
	const router = useRouter()
	const mutation = useMutation<CreateAuthorResponse>('authors')
	const showToast = useEventToast('authors', 'created')
	const queryClient = useQueryClient()

	async function onSubmit(data: CreateAuthor) {
		const { id } = await mutation.mutateAsync({
			method: 'post',
			body: data,
		})
		showToast('success')
		await queryClient.invalidateQueries(['authors'])
		await router.push(`/authors/${id}`)
	}

	return (
		<Form onSubmit={onSubmit} schema={authorSchema}>
			<FormControl field="lastName" />
			<FormControl field="firstName" />
			<FormControl field="middleName" optional />
			<FormControl field="info" multiline optional />
		</Form>
	)
}
