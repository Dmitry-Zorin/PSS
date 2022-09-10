import { Avatar, LinkBox, LinkOverlay, Stack, Text } from '@chakra-ui/react'
import { Card, CardContent, CardHeader, Icon } from 'components'
import resources from 'constants/resources'
import { useTruncate } from 'hooks'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import { GetPublicationsResponse } from 'server/services/publication'

interface TimelineCardProps {
	record: GetPublicationsResponse['records'][number]
}

export default function TimelineCard({ record }: TimelineCardProps) {
	const { t, lang } = useTranslation('resources')
	const truncate = useTruncate()

	return (
		<LinkBox as={Card} role="group" _hover={{ bg: 'bg-layer-1' }}>
			<CardHeader>
				<Avatar
					bg="transparent"
					color="primary"
					icon={
						<Icon
							icon={
								resources.publications[
									record.type as keyof typeof resources['publications']
								].icon
							}
							boxSize={6}
						/>
					}
				/>
				<Stack spacing={0} flexGrow={1}>
					<Text fontSize="md">{t(`${record.type}.name_one`)}</Text>
					<Text fontSize="sm" color="text-secondary">
						{t(`events.created_${t(`${record.type}.gender`)}`, null, {
							fallback: 'created',
						})}{' '}
					</Text>
				</Stack>
				<Text fontSize="sm" color="text-secondary" pr={2}>
					{new Date(record.createdAt).toLocaleString(lang, {
						day: 'numeric',
						month: 'long',
						year: 'numeric',
					})}
				</Text>
			</CardHeader>
			<CardContent>
				<Link href={`/publications/${record.type}/${record.id}`} passHref>
					<LinkOverlay fontWeight="medium">{record.title}</LinkOverlay>
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
