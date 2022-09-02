import {
	Badge,
	HStack,
	List,
	ListProps,
	Text,
	Wrap,
	WrapItem,
} from '@chakra-ui/react'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { Icon, Pagination } from 'components'
import { useRedirect, useUrlQuery } from 'hooks'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { GetPublicationsResponse } from 'server/services/publication'

interface MainListProps extends ListProps {
	data: { records?: any[]; total: number }
}

export default function MainList({ children, data, ...props }: MainListProps) {
	const router = useRouter()
	const redirect = useRedirect()
	const queryParams = useUrlQuery()

	const [tags, setTags] = useState<{ text: string; onClick: () => void }[]>([])

	useEffect(() => {
		setTags([])
	}, [router.asPath])

	useEffect(() => {
		if (tags.length || !data.records?.length) return

		if (queryParams.authorId) {
			const records = data.records as GetPublicationsResponse['records']
			const author = records[0].authors.find(
				(e) => e.id.toString() === queryParams.authorId,
			)!
			const tag = {
				text: author.fullName,
				onClick: () => {
					redirect({ ...queryParams, authorId: undefined })
				},
			}
			setTags((tags) => [...tags, tag])
		}
	}, [data.records, queryParams, redirect, tags.length])

	return (
		<>
			{!!tags.length && (
				<Wrap spacing={3} px={2} pt={2}>
					{tags.map((tag) => (
						<WrapItem key={tag.text}>
							<Badge
								fontSize="sm"
								cursor="pointer"
								_hover={{ bg: 'bg-layer-1' }}
								onClick={tag.onClick}
							>
								<HStack spacing={1}>
									<Text>{tag.text}</Text>
									<Icon icon={faClose} />
								</HStack>
							</Badge>
						</WrapItem>
					))}
				</Wrap>
			)}
			<List
				borderBottom="1px"
				borderColor="border"
				pt={4}
				sx={{
					'> li': {
						borderTop: '1px',
						borderColor: 'border',
						px: { base: 1, sm: 2 },
						py: 3,
						_hover: { bg: 'bg-layer-1' },
					},
				}}
				{...props}
			>
				{children}
			</List>
			<Pagination total={data.total} />
		</>
	)
}
