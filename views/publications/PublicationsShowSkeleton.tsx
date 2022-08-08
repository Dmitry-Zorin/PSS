import { SimpleGrid, SkeletonText } from '@chakra-ui/react'

export default function PublicationsShowSkeleton() {
	return (
		<>
			<SkeletonText noOfLines={8} skeletonHeight={3} spacing={4} py={2} />
			<SimpleGrid columns={{ base: 2, lg: 4 }} spacing={12}>
				<SkeletonText noOfLines={2} />
				<SkeletonText noOfLines={2} />
				<SkeletonText noOfLines={2} />
				<SkeletonText noOfLines={2} />
			</SimpleGrid>
		</>
	)
}
