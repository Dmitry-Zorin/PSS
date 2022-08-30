import { useQuery, useUrlParams } from 'hooks'
import { GetPublicationResponse } from 'server/services/publication'
import PublicationsCreate from './PublicationsCreate'

export default function PublicationsEdit() {
	const { id } = useUrlParams()

	const { error, data, isLoading } = useQuery<GetPublicationResponse>(
		`publications/${id}`,
		undefined,
		{
			enabled: !!id,
			staleTime: Infinity,
		},
	)

	return isLoading ? null : <PublicationsCreate error={error} data={data} />
}
