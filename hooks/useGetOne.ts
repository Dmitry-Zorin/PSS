import queryClientConfig from 'constants/queryClientConfig'
import { maxBy, transform } from 'lodash'
import { useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import { inferQueryOutput, trpc } from 'utils/trpc'

interface Data<Record> {
	record: Record
	updatedAt: number
}

export default function useGetOne(
	resource: 'author' | 'publication',
	id?: string,
) {
	const queryClient = useQueryClient()
	const [hasCheckedCache, setHasCheckedCache] = useState(false)

	useEffect(() => {
		if (!id) return

		const cachedRecords = transform(
			queryClient.getQueriesData<inferQueryOutput<`${typeof resource}.list`>>([
				`${resource}.list`,
			]),
			(
				result: Data<inferQueryOutput<`${typeof resource}.one`>>[],
				[queryKey, queryValue],
			) => {
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
			queryClientConfig.defaultOptions.queries.staleTime

		if (!isStale) {
			queryClient.setQueryData(
				[`${resource}.one`, { id }],
				latestRecord.record,
				{ updatedAt: latestRecord.updatedAt },
			)
		}

		setHasCheckedCache(true)
	}, [id, queryClient, resource])

	return trpc.useQuery([`${resource}.one`, { id }], {
		enabled: hasCheckedCache,
	})
}
