import { HStack, Input, Stack, Text } from '@chakra-ui/react'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { Icon, IconButton } from 'components'
import { useRedirect, useUrlQuery } from 'hooks'
import { useEffect, useState } from 'react'

interface PaginationProps {
	perPage?: number
	total: number
}

export default function Pagination({ perPage = 1, total }: PaginationProps) {
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
			...queryParams,
			page: pageNumber > 1 ? pageNumber : undefined,
		})
	}

	return total > perPage ? (
		<Stack pt={6}>
			<HStack justify="flex-end">
				<Text>Страница </Text>
				<Input
					type="number"
					w={14}
					value={desiredPage}
					min={1}
					max={maxPage}
					onKeyDown={(e) => {
						e.key === 'Enter' && changePage(desiredPage)
					}}
					pl={1}
					pr={3}
					textAlign="right"
					onChange={(e) => {
						return setDesiredPage(e.target.value.slice(0, 3))
					}}
				/>
				<Text>из {maxPage}</Text>
			</HStack>
			<HStack justify="center">
				{/* <Button onClick={() => changePage(1)}>1</Button> */}
				<IconButton
					aria-label="prev"
					variant="solid"
					w={16}
					icon={<Icon icon={faAngleLeft} />}
					onClick={() => changePage(Math.max(1, +page - 1))}
					disabled={page === '1'}
				/>
				<IconButton
					aria-label="next"
					variant="solid"
					w={16}
					icon={<Icon icon={faAngleRight} />}
					onClick={() => changePage(Math.min(maxPage, +page + 1))}
					disabled={page === maxPage.toString()}
				/>
				{/* <Button onClick={() => changePage(maxPage)}>{maxPage}</Button> */}
			</HStack>
		</Stack>
	) : null
}
