import { Skeleton, SkeletonText, Stack } from '@chakra-ui/react'
import { Card, CardContent, CardHeader } from 'components'

export default function ListItemCardSkeleton() {
	return (
		<Card>
			<CardHeader>
				<Skeleton boxSize={5} m={3.5} />
				<Stack spacing={3} flexGrow={1}>
					<SkeletonText noOfLines={1} w={12} />
					<SkeletonText noOfLines={1} w={24} />
				</Stack>
			</CardHeader>
			<CardContent>
				<SkeletonText skeletonHeight={3} noOfLines={1} py={2} />
				<SkeletonText noOfLines={5} spacing={3} pt={1} />
			</CardContent>
		</Card>
	)
}
