import { useQuery, useRedirect, useUrlQuery } from 'hooks'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { GetAuthorResponse } from 'server/services/author'

export default function useTags() {
	const router = useRouter()
	const redirect = useRedirect()
	const queryParams = useUrlQuery()
	const pathRef = useRef({})
	const [tags, setTags] = useState<{ text: string; onClick: () => void }[]>([])

	const { data: authorData } = useQuery<GetAuthorResponse>(
		`authors/${queryParams.authorId}`,
		undefined,
		{ enabled: !!queryParams.authorId, staleTime: Infinity },
	)

	useEffect(() => {
		if (pathRef.current === router.asPath) return
		pathRef.current = router.asPath

		const newTags = []

		if (authorData) {
			const tag = {
				text: authorData.fullName,
				onClick: async () => {
					await redirect({
						query: {
							...queryParams,
							authorId: undefined,
						},
					})
				},
			}
			newTags.push(tag)
		}

		if (queryParams.search) {
			const words = queryParams.search.split(' ')
			newTags.push(
				...words.map((word, i) => ({
					text: word,
					onClick: async () => {
						await redirect({
							query: {
								...queryParams,
								search: words.filter((_, j) => i !== j).join(' '),
								page: undefined,
							},
						})
					},
				})),
			)
		}

		setTags(newTags)
	}, [authorData, queryParams, redirect, router.asPath])

	return tags
}
