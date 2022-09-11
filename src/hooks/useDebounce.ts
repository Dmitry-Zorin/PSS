import { useConst } from '@chakra-ui/react'
import { debounce } from 'lodash'
import { useEffect } from 'react'

export default function useDebounce<T extends (...args: any) => any>(
	fn: T,
	timeout = 500,
) {
	const debouncedFn = useConst(() => debounce(fn, timeout))

	useEffect(() => {
		return () => debouncedFn.cancel()
	}, [debouncedFn])

	return debouncedFn
}
