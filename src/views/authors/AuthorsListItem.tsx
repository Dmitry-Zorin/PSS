import { LinkBox, LinkOverlay, ListItem } from '@chakra-ui/react'
import { Highlight } from 'components'
import { useUrlQuery } from 'hooks'
import Link from 'next/link'
import { GetAuthorsResponse } from 'server/services/author'

interface AuthorsListItemProps {
	record: GetAuthorsResponse['records'][number]
}

export default function AuthorsListItem({ record }: AuthorsListItemProps) {
	const { search } = useUrlQuery()

	return (
		<LinkBox as={ListItem}>
			<Link href={`/authors/${record.id}`} passHref>
				<LinkOverlay flexGrow={1}>
					<Highlight text={record.fullName} search={search} />
				</LinkOverlay>
			</Link>
		</LinkBox>
	)
}
