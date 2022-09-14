import { useQuery, useRedirect, useUrlQuery } from 'hooks'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { GetAuthorResponse } from 'server/services/author'

interface Tag {
	text: string
	remove: () => void
}

export default function useTags() {
	const router = useRouter()
	const redirect = useRedirect()
	const queryParams = useUrlQuery()
	const pathRef = useRef('')
	const [tags, setTags] = useState<Tag[]>([])

	const { isFetching, data: authorData } = useQuery<GetAuthorResponse>(
		`authors/${queryParams.authorId}`,
		undefined,
		{
			enabled: !!queryParams.authorId,
			staleTime: Infinity,
		},
	)

	useEffect(() => {
		if (pathRef.current === router.asPath || isFetching) return
		pathRef.current = router.asPath
		const newTags: Tag[] = []

		if (authorData) {
			newTags.push({
				text: authorData.fullName,
				remove: async () => {
					await redirect({
						query: {
							...queryParams,
							authorId: undefined,
						},
					})
				},
			})
		}

		if (queryParams.search) {
			const words = queryParams.search.split(' ')
			newTags.push(
				...words.map((word, i) => ({
					text: word,
					remove: async () => {
						await redirect({
							query: {
								...queryParams,
								search: words.filter((_, j) => i !== j).join(' ') || undefined,
								page: undefined,
							},
						})
					},
				})),
			)
		}

		setTags(newTags)
	}, [authorData, isFetching, queryParams, redirect, router.asPath])

	return tags
}
