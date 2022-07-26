import { Avatar, IconButton, Stack, Text } from '@chakra-ui/react'
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons'
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
		<Card>
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
				<Stack flexGrow={1} spacing={0}>
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
					<IconButton
						as="a"
						aria-label="View"
						icon={<FontAwesomeIcon icon={faArrowRightLong} />}
					/>
				</Link>
			</CardHeader>
			<CardContent>
				<Text>{record.title}</Text>
				{record.description && (
					<Text fontSize="md" color="text-secondary">
						{truncate(record.description)}
					</Text>
				)}
			</CardContent>
		</Card>
	)
}
