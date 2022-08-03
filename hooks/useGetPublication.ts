import { Publication } from '@prisma/client'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { queryClientConfig } from 'lib/common'
import { maxBy, transform } from 'lodash'
import { useEffect, useState } from 'react'
import { GetPublicationsResponse } from 'types'

interface Record {
	data: Publication
	updatedAt: number
}

export default function useGetPublication(id?: string) {
	const queryClient = useQueryClient()
	const [hasCheckedCache, setHasCheckedCache] = useState(false)

	useEffect(() => {
		if (!id) {
			return setHasCheckedCache(true)
		}

		const cachedRecords = transform(
			queryClient.getQueriesData<GetPublicationsResponse>(['publications']),
			(result: Record[], [queryKey, queryValue]) => {
				const publication = queryValue?.publications?.find((e) => e.id === +id)
				if (publication) {
					result.push({
						data: publication,
						updatedAt: queryClient.getQueryState(queryKey)!.dataUpdatedAt,
					})
				}
			},
		)

		const latestRecord = maxBy(cachedRecords, (value) => value.updatedAt)

		if (!latestRecord) {
			return setHasCheckedCache(true)
		}

		const isStale =
			Date.now() - latestRecord.updatedAt >
			queryClientConfig.defaultOptions!.queries!.staleTime!

		if (!isStale) {
			queryClient.setQueryData(['publications', { id }], latestRecord.data)
		}

		setHasCheckedCache(true)
	}, [id, queryClient])

	return useQuery<Publication, Error>(['publications', { id }], {
		enabled: hasCheckedCache,
	})
}
