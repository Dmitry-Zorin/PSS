import {
	Avatar,
	LinkBox,
	LinkOverlay,
	Stack,
	Text,
	useDisclosure,
} from '@chakra-ui/react'
import { faEye } from '@fortawesome/free-solid-svg-icons'
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
	const { isOpen, onOpen, onClose } = useDisclosure()
	const truncate = useTruncate()

	return (
		<LinkBox as={Card} onMouseEnter={onOpen} onMouseLeave={onClose}>
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
				<Icon
					icon={faEye}
					boxSize={6}
					justifySelf="flex-end"
					color="text-primary"
					opacity={isOpen ? 0.75 : 0}
					pr={2}
				/>
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
					<LinkOverlay _hover={{ color: 'text-primary' }}>
						{record.title}
						{/* <Box
							as="span"
							justifySelf="flex-end"
							pl={1.5}
							fontWeight="medium"
							color={isOpen ? 'text-primary' : 'transparent'}
						>
							&rarr;
						</Box> */}
					</LinkOverlay>
				</Link>
				{record.description && (
					<Text
						fontSize="md"
						color="text-secondary"
						opacity={isOpen ? 0.75 : 1}
					>
						{truncate(record.description)}
					</Text>
				)}
			</CardContent>
		</LinkBox>
	)
}
