import { Avatar, LinkBox, LinkOverlay, Stack, Text } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Publication } from '@prisma/client'
import { Card, CardContent, CardHeader } from 'components'
import resources from 'constants/resources'
import { useTruncate } from 'hooks'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

interface ListItemCardProps {
	record: Publication
}

export default function ListItemCard({ record }: ListItemCardProps) {
	const { t, i18n } = useTranslation('resources')
	const truncate = useTruncate()

	return (
		<LinkBox as={Card}>
			<CardHeader>
				<Avatar
					bg="bg-layer-1"
					color="primary"
					icon={
						<FontAwesomeIcon
							icon={
								resources.publications[
									record.category as keyof typeof resources['publications']
								].icon
							}
							size="lg"
						/>
					}
				/>
				<Stack spacing={0} flexGrow={1}>
					<Text fontSize="md">
						{t(`${record.category}.name`, { count: 1 })}
					</Text>
					<Text fontSize="sm" color="text-secondary">
						{new Date(record.createdAt).toLocaleString(i18n.language, {
							day: 'numeric',
							month: 'long',
							year: 'numeric',
						})}
					</Text>
				</Stack>
			</CardHeader>
			<CardContent>
				<Link
					href={{
						pathname: `/publications/[category]/[id]`,
						query: {
							category: record.category,
							id: record.id,
						},
					}}
					passHref
				>
					<LinkOverlay>
						<Text>{record.title}</Text>
					</LinkOverlay>
				</Link>
				{record.description && (
					<Text fontSize="md" color="text-secondary">
						{truncate(record.description)}
					</Text>
				)}
			</CardContent>
		</LinkBox>
	)
}
