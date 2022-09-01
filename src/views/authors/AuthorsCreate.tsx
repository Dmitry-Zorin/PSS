import { useQueryClient } from '@tanstack/react-query'
import { Form, FormControl, MainArea } from 'components'
import { useEventToast, useMutation } from 'hooks'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { CreateAuthorResponse } from 'server/services/author'
import { authorFormSchema, CreateAuthor } from 'validations/author'

export default function AuthorsCreate() {
	const { t } = useTranslation('resources')
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
		<MainArea
			title={`${t('common:actions.create')} ${t('authors.name_what', null, {
				fallback: t('authors.name_one'),
			})}`}
		>
			<Form onSubmit={onSubmit} schema={authorFormSchema} defaultValues={{}}>
				<FormControl field="lastName" />
				<FormControl field="firstName" />
				<FormControl field="middleName" optional />
				<FormControl field="info" multiline optional />
			</Form>
		</MainArea>
	)
}
