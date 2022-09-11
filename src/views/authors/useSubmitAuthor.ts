import { useQueryClient } from '@tanstack/react-query'
import {
	useEventToast,
	useMutation,
	usePersistedForm,
	useRedirect,
} from 'hooks'
import {
	CreateAuthorResponse,
	GetAuthorResponse,
	UpdateAuthorResponse,
} from 'server/services/author'
import { omitEmptyStrings } from 'utils/form'
import { AuthorFormData } from 'validations/author'

export const useSubmitAuthor = (data?: GetAuthorResponse) => {
	const queryClient = useQueryClient()
	const redirect = useRedirect()
	const { clearForm } = usePersistedForm()
	const showToast = useEventToast('authors', data ? 'updated' : 'created')

	const mutation = useMutation<
		typeof data extends undefined ? CreateAuthorResponse : UpdateAuthorResponse
	>(`authors${data ? `/${data.id}` : ''}`)

	return async function onSubmit(submitData: AuthorFormData) {
		try {
			const record = await mutation.mutateAsync({
				method: data ? 'put' : 'post',
				body: omitEmptyStrings(submitData),
			})
			showToast('success')
			await queryClient.invalidateQueries(['authors'])
			if (data) {
				await queryClient.setQueryData(
					[`authors/${record.id}`, 'update'],
					record,
				)
			}
			await redirect({ url: `/authors/${record.id}` })
			clearForm()
		} catch (error) {
			showToast('error', { error })
		}
	}
}
