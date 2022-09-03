import {
	Badge,
	Divider,
	HStack,
	List,
	ListProps,
	Stack,
	Text,
	Wrap,
	WrapItem,
} from '@chakra-ui/react'
import { faBan, faClose } from '@fortawesome/free-solid-svg-icons'
import { Icon, Pagination } from 'components'
import { useQuery, useRedirect, useUrlQuery } from 'hooks'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { GetAuthorResponse } from 'server/services/author'

interface MainListProps extends ListProps {
	total: number
}

export default function MainList({ children, total, ...props }: MainListProps) {
	const { t } = useTranslation()
	const router = useRouter()
	const redirect = useRedirect()
	const queryParams = useUrlQuery()

	const [tags, setTags] = useState<{ text: string; onClick: () => void }[]>([])

	const { data: authorData } = useQuery<GetAuthorResponse>(
		`authors/${queryParams.authorId}`,
		undefined,
		{ enabled: !!queryParams.authorId, staleTime: Infinity },
	)

	useEffect(() => {
		setTags([])
	}, [router.asPath])

	useEffect(() => {
		if (tags.length) return

		if (authorData) {
			const tag = {
				text: authorData.fullName,
				onClick: () => {
					redirect({ ...queryParams, authorId: undefined })
				},
			}
			setTags((tags) => [...tags, tag])
		}

		if (queryParams.search) {
			const tag = {
				text: queryParams.search,
				onClick: () => {
					redirect({ ...queryParams, search: undefined, page: undefined })
				},
			}
			setTags((tags) => [...tags, tag])
		}
	}, [authorData, queryParams, redirect, tags.length])

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
			{total ? (
				<>
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
					<Pagination total={total} />
				</>
			) : (
				<Stack spacing={4} pt={4} align="center">
					<Divider />
					<HStack color="text-secondary" fontSize="2xl">
						<Icon icon={faBan} boxSize={5} />
						<Text fontWeight="medium">{t('messages.notFound')}</Text>
					</HStack>
				</Stack>
			)}
		</>
	)
}
