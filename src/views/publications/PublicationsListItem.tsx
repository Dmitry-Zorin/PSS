import {
	Highlight,
	HStack,
	LinkBox,
	LinkOverlay,
	ListItem,
	Text,
} from '@chakra-ui/react'
import Link from 'next/link'
import { GetPublicationsResponse } from 'server/services/publication'

interface PublicationsListItemProps {
	record: GetPublicationsResponse['records'][number]
	search?: string
}

export default function PublicationsListItem({
	record,
	search,
}: PublicationsListItemProps) {
	return (
		<LinkBox
			as={ListItem}
			borderTop="1px"
			borderColor="border"
			px={4}
			py={4}
			_hover={{ bg: 'bg-layer-1' }}
		>
			<HStack>
				<Link href={`/publications/${record.category}/${record.id}`} passHref>
					<LinkOverlay flexGrow={1}>
						{search ? (
							<Highlight
								query={search?.split(' ')}
								styles={{
									bg: 'primary',
									color: 'bg',
									fontWeight: 'medium',
									borderRadius: 'sm',
								}}
							>
								{record.title}
							</Highlight>
						) : (
							record.title
						)}
					</LinkOverlay>
				</Link>
				<Text>{record.writtenInYear}</Text>
			</HStack>
		</LinkBox>
	)
}
