import { debounce } from 'lodash'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'

export default function useSearch() {
	const router = useRouter()
	const [searchValue, setSearchValue] = useState(router.query.search ?? '')

	const debouncedSearch = useMemo(() => {
		return debounce((search: string) => {
			const { pathname, query } = router

			if (search) {
				query.search = search
			} else {
				delete query.search
			}

			router.replace(
				`${pathname}${
					Object.keys(query).length
						? `?${new URLSearchParams(query as any)}`
						: ''
				}`,
			)
		}, 300)
	}, [router])

	useEffect(() => {
		return () => debouncedSearch.cancel()
	}, [debouncedSearch, router.query.search])

	function search({ target: { value } }: ChangeEvent<HTMLInputElement>) {
		setSearchValue(value)
		debouncedSearch(value)
	}

	function clear() {
		setSearchValue('')
		debouncedSearch('')
	}

	return { searchValue, search, clear }
}
