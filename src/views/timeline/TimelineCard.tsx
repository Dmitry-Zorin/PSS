import { Avatar, LinkBox, LinkOverlay, Stack, Text } from '@chakra-ui/react'
import { Card, CardContent, CardHeader, Icon } from 'components'
import resources from 'constants/resources'
import { useHover, useTruncate } from 'hooks'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { inferQueryOutput } from 'utils/trpc'

interface TimelineCardProps {
	record: inferQueryOutput<'publication.list'>['records'][number]
}

export default function TimelineCard({ record }: TimelineCardProps) {
	const { t, i18n } = useTranslation('resources')
	const { isHovered, listeners } = useHover()
	const truncate = useTruncate()

	return (
		<LinkBox as={Card} _hover={{ bg: 'bg-layer-1' }} {...listeners}>
			<CardHeader bg={isHovered ? 'bg-layer-2' : 'bg-layer-1'}>
				<Avatar
					bg="transparent"
					color="primary"
					icon={
						<Icon
							icon={
								resources.publications[
									record.category as keyof typeof resources['publications']
								].icon
							}
							boxSize={6}
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
				<Link href={`/publications/${record.category}/${record.id}`} passHref>
					<LinkOverlay>{record.title}</LinkOverlay>
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
