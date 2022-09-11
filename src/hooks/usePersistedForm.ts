import { useConst } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { isBrowser } from 'utils/env'

export default function useClearForm<T>() {
	const router = useRouter()
	const key = `form:${router.asPath}`
	const state = isBrowser && sessionStorage.getItem(key)

	return useConst({
		formKey: key,
		formState: state ? (JSON.parse(state) as T) : undefined,
		clearForm: () => sessionStorage.removeItem(key),
	})
}
