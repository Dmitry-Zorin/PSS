import {
	Avatar,
	chakra,
	LinkBox,
	LinkOverlay,
	Stack,
	Text,
} from '@chakra-ui/react'
import { Publication } from '@prisma/client'
import { Card, CardContent, CardHeader, Icon } from 'components'
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
			<LinkBox as={CardContent}>
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
					<LinkOverlay _hover={{ color: 'text-primary' }}>
						{record.title}
						<chakra.span pl={1.5} fontWeight="medium">
							&rarr;
						</chakra.span>
					</LinkOverlay>
				</Link>
				{record.description && (
					<Text fontSize="md" color="text-secondary">
						{truncate(record.description)}
					</Text>
				)}
			</LinkBox>
		</Card>
	)
}
