import { Loading } from 'components'
import { useQuery, useUrlParams } from 'hooks'
import { GetAuthorResponse } from 'server/services/author'
import AuthorsCreate from './AuthorsCreate'

export default function AuthorsEdit() {
	const { id } = useUrlParams()

	const { error, data, isLoading } = useQuery<GetAuthorResponse>(
		`authors/${id}`,
		undefined,
		{
			enabled: !!id,
			staleTime: Infinity,
		},
	)

	return (
		<Loading isLoading={isLoading}>
			<AuthorsCreate error={error} data={data} />
		</Loading>
	)
}
