import { LinkBox, LinkOverlay, ListItem, Stack, Text } from '@chakra-ui/react'
import { Highlight } from 'components'
import { useTruncate, useUrlQuery } from 'hooks'
import Link from 'next/link'
import { GetPublicationsResponse } from 'server/services/publication'

interface PublicationsListItemProps {
	record: GetPublicationsResponse['records'][number]
}

export default function PublicationsListItem({
	record,
}: PublicationsListItemProps) {
	const { search } = useUrlQuery()
	const truncate = useTruncate({ length: 200 })

	return (
		<LinkBox
			as={ListItem}
			borderTop="1px"
			borderColor="border"
			px={{ base: 1, sm: 2 }}
			py={3}
			_hover={{ bg: 'bg-layer-1' }}
		>
			<Stack spacing={2}>
				<div>
					<Link href={`/publications/${record.category}/${record.id}`} passHref>
						<LinkOverlay flexGrow={1}>
							<Highlight text={record.title} search={search} />
							{` (${record.writtenInYear})`}
						</LinkOverlay>
					</Link>
				</div>
				{record.description && (
					<Text fontSize="md" color="text-secondary">
						<Highlight text={truncate(record.description)} search={search} />
					</Text>
				)}
			</Stack>
		</LinkBox>
	)
}
