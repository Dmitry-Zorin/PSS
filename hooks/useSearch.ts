import { Publication } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { useDebounce } from 'hooks'
import { useState } from 'react'

export default function useSearch() {
	// const search = useDebounce((search: string) => {
	// 	setQuery({
	// 		...query,
	// 		search: search ?? undefined,
	// 	})
	// }, 500)
}
