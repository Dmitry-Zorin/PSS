import { LinkBox, LinkOverlay, ListItem, Stack } from '@chakra-ui/react'
import { Highlight } from 'components'
import { getAuthorFullName } from 'helpers/authors'
import { useUrlQuery } from 'hooks'
import Link from 'next/link'
import { GetAuthorsResponse } from 'server/services/author'

interface AuthorsListItemProps {
	record: GetAuthorsResponse['records'][number]
}

export default function AuthorsListItem({ record }: AuthorsListItemProps) {
	const { search } = useUrlQuery()

	return (
		<LinkBox
			as={ListItem}
			borderTop="1px"
			borderColor="border"
			px={4}
			py={4}
			_hover={{ bg: 'bg-layer-1' }}
		>
			<Stack spacing={2}>
				<div>
					<Link href={`/authors/${record.id}`} passHref>
						<LinkOverlay flexGrow={1}>
							<Highlight text={getAuthorFullName(record)} search={search} />
						</LinkOverlay>
					</Link>
				</div>
			</Stack>
		</LinkBox>
	)
}
