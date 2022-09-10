import { useConst } from '@chakra-ui/react'
import { useState } from 'react'
import { GetPublications } from 'validations/publication'

export type QueryFilters = GetPublications

export default function useQueryFilters(initialValue: QueryFilters) {
	const [queryFilters, setQueryFilters] = useState(initialValue)

	const queryFiltersHelper = useConst({
		switchType(type: string) {
			setQueryFilters((filters) => ({ ...filters, type }))
		},
		search(value: string) {
			setQueryFilters((filters) => ({
				...filters,
				search: value || undefined,
			}))
		},
		sort(field: string, order: 'asc' | 'desc') {
			setQueryFilters((filters) => ({
				...filters,
				sortField: field,
				sortOrder: order,
			}))
		},
		changePage(page: number) {
			setQueryFilters((filters) => ({
				...filters,
				page: page > 1 ? page : undefined,
			}))
		},
	})

	return [queryFilters, queryFiltersHelper] as const
}

export type QueryFiltersHelper = ReturnType<typeof useQueryFilters>[1]
