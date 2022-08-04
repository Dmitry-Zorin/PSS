import { Author } from '@prisma/client'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { queryClientConfig } from 'lib/common'
import { maxBy, transform } from 'lodash'
import { useEffect, useState } from 'react'
import { GetListResponse } from '../types'

interface Data<Record> {
	record: Record
	updatedAt: number
}

export default function useGetOne<Record extends { id: number }>(
	resource: string,
	id?: string,
) {
	const queryClient = useQueryClient()
	const [hasCheckedCache, setHasCheckedCache] = useState(false)

	useEffect(() => {
		if (!id) {
			return setHasCheckedCache(true)
		}

		const cachedRecords = transform(
			queryClient.getQueriesData<GetListResponse<Record>>([resource]),
			(result: Data<Record>[], [queryKey, queryValue]) => {
				const record = queryValue?.records?.find((e) => e.id === +id)
				if (record) {
					result.push({
						record,
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
			queryClient.setQueryData([resource, { id }], latestRecord.record)
		}

		setHasCheckedCache(true)
	}, [id, queryClient, resource])

	return useQuery<Record, Error>([resource, { id }], {
		enabled: hasCheckedCache,
	})
}
