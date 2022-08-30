import { useQueryClient } from '@tanstack/react-query'
import { useEventToast, useMutation, useUrlParams } from 'hooks'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import {
	CreatePublicationResponse,
	GetPublicationResponse,
	UpdatePublicationResponse,
} from 'server/services/publication'
import { publicationSchema } from 'validations/publication'
import { z } from 'zod'

export const useSubmitPublication = (
	data?: GetPublicationResponse,
	additionalData?: Record<string, any>,
) => {
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

	return async function onSubmit(
		submitData: z.infer<typeof publicationSchema>,
	) {
		const { id } = await mutation.mutateAsync({
			method: data ? 'put' : 'post',
			body: {
				...submitData,
				...additionalData,
				...(!data && {
					category,
					type: submitData.type || t(`${category}.name`, { count: 1 }),
				}),
			},
		})
		showToast('success')
		await queryClient.invalidateQueries(['publications'])
		await router.push(`/publications/${category}/${id}`)
	}
}
