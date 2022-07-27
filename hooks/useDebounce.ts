import { debounce } from 'lodash'
import { useEffect, useMemo } from 'react'

export default function useDebounce<T extends (...args: any) => any>(
	fn: T,
	timeout = 500,
) {
	const debouncedFn = useMemo(() => debounce(fn, timeout), [fn, timeout])

	useEffect(() => {
		return () => debouncedFn.cancel()
	}, [debouncedFn])

	return debouncedFn
}
