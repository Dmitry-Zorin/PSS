import { useQueryClient } from '@tanstack/react-query'
import { useEventToast, useMutation, useUrlParams } from 'hooks'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import {
	CreatePublicationResponse,
	GetPublicationResponse,
	UpdatePublicationResponse,
} from 'server/services/publication'
import { omitEmptyStrings } from 'utils/form'
import { PublicationFormData } from 'validations/publication'

export const useSubmitPublication = (data?: GetPublicationResponse) => {
	const { t } = useTranslation('resources')
	const queryClient = useQueryClient()
	const router = useRouter()

	const { category } = useUrlParams()

	const showToast = useEventToast(category, data ? 'updated' : 'created')

	const mutation = useMutation<
		typeof data extends undefined
			? CreatePublicationResponse
			: UpdatePublicationResponse
	>(`publications${data ? `/${data.id}` : ''}`)

	return async function onSubmit({
		type,
		authors,
		coauthors,
		...submitData
	}: PublicationFormData) {
		try {
			const { id } = await mutation.mutateAsync({
				method: data ? 'put' : 'post',
				body: omitEmptyStrings({
					...submitData,
					type: type || t(`${category}.name`, { count: 1 }),
					authorIds: authors.map(({ id }) => id),
					coauthors: coauthors.length > 1 ? coauthors.slice(0, -1) : undefined,
					...(!data && { category }),
				}),
			})
			showToast('success')
			await queryClient.invalidateQueries(['publications'])
			await router.push(`/publications/${category}/${id}`)
		} catch (error) {
			showToast('error', { error })
		}
	}
}
