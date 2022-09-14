import { HStack, Input, Stack, Text } from '@chakra-ui/react'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { Icon, IconButton } from 'components'
import { PER_PAGE } from 'constants/app'
import { useRedirect, useUrlQuery } from 'hooks'
import useTranslation from 'next-translate/useTranslation'
import { useEffect, useState } from 'react'

interface PaginationProps {
	perPage?: number
	total: number
}

export default function Pagination({
	perPage = PER_PAGE,
	total,
}: PaginationProps) {
	const { t } = useTranslation()
	const queryParams = useUrlQuery()
	const redirect = useRedirect()
	const { page = '1' } = queryParams
	const maxPage = Math.ceil(total / perPage)
	const [desiredPage, setDesiredPage] = useState(page)

	useEffect(() => {
		setDesiredPage(page)
	}, [page])

	async function changePage(page: string | number) {
		const pageNumber = +page
		if (pageNumber < 1 || pageNumber > maxPage) {
			return
		}
		await redirect({
			query: {
				...queryParams,
				page: pageNumber > 1 ? pageNumber : undefined,
			},
		})
	}

	return total > perPage ? (
		<Stack pt={6}>
			<HStack justify="flex-end">
				<Text>{t('words.page')}</Text>
				<Input
					type="number"
					textAlign="right"
					w={12}
					pl={1}
					pr={3}
					value={desiredPage}
					min={1}
					max={maxPage}
					onChange={(e) => {
						return setDesiredPage(e.target.value.slice(0, 3))
					}}
					onKeyDown={(e) => {
						e.key === 'Enter' && changePage(desiredPage)
					}}
				/>
				<Text>{`${t('words.of')} ${maxPage}`}</Text>
			</HStack>
			<HStack justify="center">
				<IconButton
					aria-label={t('actions.prev')}
					variant="outline"
					w={16}
					icon={<Icon icon={faAngleLeft} />}
					onClick={() => changePage(Math.max(1, +page - 1))}
					disabled={page === '1'}
				/>
				<IconButton
					aria-label={t('actions.next')}
					variant="outline"
					w={16}
					icon={<Icon icon={faAngleRight} />}
					onClick={() => changePage(Math.min(maxPage, +page + 1))}
					disabled={page === maxPage.toString()}
				/>
			</HStack>
		</Stack>
	) : null
}
