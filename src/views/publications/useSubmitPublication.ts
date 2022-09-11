import { useQueryClient } from '@tanstack/react-query'
import {
	useEventToast,
	useMutation,
	usePersistedForm,
	useRedirect,
	useUrlParams,
} from 'hooks'
import useTranslation from 'next-translate/useTranslation'
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
	const redirect = useRedirect()
	const { clearForm } = usePersistedForm()

	const { type } = useUrlParams()

	const showToast = useEventToast(type, data ? 'updated' : 'created')

	const mutation = useMutation<
		typeof data extends undefined
			? CreatePublicationResponse
			: UpdatePublicationResponse
	>(`publications${data ? `/${data.id}` : ''}`)

	return async function onSubmit({
		typeName,
		authors,
		coauthors,
		...submitData
	}: PublicationFormData) {
		try {
			const record = await mutation.mutateAsync({
				method: data ? 'put' : 'post',
				body: omitEmptyStrings({
					...submitData,
					typeName: typeName ?? t(`${type}.name`, { count: 1 }),
					authorIds: authors.map(({ id }) => id),
					coauthors: coauthors.length > 1 ? coauthors.slice(0, -1) : undefined,
					...(!data && { type }),
				}),
			})
			showToast('success')
			await queryClient.invalidateQueries(['publications'])
			if (data) {
				await queryClient.setQueryData(
					[`publications/${record.id}`, 'update'],
					record,
				)
			}
			await redirect({ url: `/publications/${type}/${record.id}` })
			clearForm()
		} catch (error) {
			showToast('error', { error })
		}
	}
}
