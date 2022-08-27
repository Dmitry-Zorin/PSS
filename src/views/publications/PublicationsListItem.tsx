import {
	Badge,
	HStack,
	LinkBox,
	LinkOverlay,
	ListItem,
	Stack,
	Text,
	Wrap,
	WrapItem,
} from '@chakra-ui/react'
import { Highlight, Icon } from 'components'
import resources from 'constants/resources'
import { useTruncate, useUrlQuery } from 'hooks'
import Link from 'next/link'
import { GetPublicationsResponse } from 'server/services/publication'

export interface PublicationsListItemProps {
	record: GetPublicationsResponse['records'][number]
	showIcon?: boolean
}

export default function PublicationsListItem({
	record,
	showIcon,
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
			<Stack spacing={3}>
				<HStack spacing={3}>
					{showIcon && (
						<Icon
							color="primary"
							icon={
								resources.publications[
									record.category as keyof typeof resources.publications
								].icon
							}
						/>
					)}
					<Link href={`/publications/${record.category}/${record.id}`} passHref>
						<LinkOverlay flexGrow={1} lineHeight="none" fontWeight="medium">
							<Highlight text={record.title} search={search} />
						</LinkOverlay>
					</Link>
				</HStack>
				{record.description && (
					<Text fontSize="md" color="text-secondary">
						<Highlight text={truncate(record.description)} search={search} />
					</Text>
				)}
				{record.authors && (
					<Wrap>
						{record.authors.map((e) => (
							<WrapItem key={e.id}>
								<Badge px={1.5} py={0.5}>
									{e.fullName}
								</Badge>
							</WrapItem>
						))}
					</Wrap>
				)}
			</Stack>
		</LinkBox>
	)
}
