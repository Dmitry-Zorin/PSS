import { useQueryClient } from '@tanstack/react-query'
import { useEventToast, useMutation } from 'hooks'
import { useRouter } from 'next/router'
import {
	CreateAuthorResponse,
	GetAuthorResponse,
	UpdateAuthorResponse,
} from 'server/services/author'
import { omitEmptyStrings } from 'utils/form'
import { AuthorFormData } from 'validations/author'

export const useSubmitAuthor = (data?: GetAuthorResponse) => {
	const queryClient = useQueryClient()
	const router = useRouter()

	const showToast = useEventToast('authors', data ? 'updated' : 'created')

	const mutation = useMutation<
		typeof data extends undefined ? CreateAuthorResponse : UpdateAuthorResponse
	>(`authors${data ? `/${data.id}` : ''}`)

	return async function onSubmit(submitData: AuthorFormData) {
		try {
			const { id } = await mutation.mutateAsync({
				method: data ? 'put' : 'post',
				body: omitEmptyStrings(submitData),
			})
			showToast('success')
			await queryClient.invalidateQueries(['authors'])
			await router.push(`/authors/${id}`)
		} catch (error) {
			showToast('error', { error })
		}
	}
}
