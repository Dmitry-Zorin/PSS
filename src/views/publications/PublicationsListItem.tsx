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
import { GetAuthorResponse } from 'server/services/author'
import { GetPublicationsResponse } from 'server/services/publication'

export interface PublicationsListItemProps {
	record:
		| GetPublicationsResponse['records'][number]
		| GetAuthorResponse['publications'][number]
	simplified?: boolean
	showIcon?: boolean
}

export default function PublicationsListItem({
	record,
	simplified,
	showIcon,
}: PublicationsListItemProps) {
	const { search } = useUrlQuery()
	const truncate = useTruncate({ length: 200 })

	return (
		<LinkBox as={ListItem}>
			<Stack spacing={3}>
				<HStack spacing={3}>
					{showIcon && (
						<Icon
							color="primary"
							icon={
								resources.publications[
									record.type as keyof typeof resources.publications
								].icon
							}
						/>
					)}
					<Link href={`/publications/${record.type}/${record.id}`} passHref>
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
				{!simplified && (
					<Wrap>
						{record.authors.map((e) => (
							<WrapItem key={e.id}>
								<Badge px={1.5} py={0.5}>
									{e.fullName}
								</Badge>
							</WrapItem>
						))}
						{record.coauthors.map((name) => (
							<WrapItem key={name}>
								<Badge px={1.5} py={0.5}>
									{name}
								</Badge>
							</WrapItem>
						))}
					</Wrap>
				)}
			</Stack>
		</LinkBox>
	)
}
