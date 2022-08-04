import { List, ListItem } from '@chakra-ui/react'
import { range } from 'lodash'
import { GetPublicationsResponse } from 'types'
import { TimelineCard, TimelineCardSkeleton } from 'views/timeline'

interface TimelineProps {
	data?: GetPublicationsResponse
}

export default function Timeline({ data }: TimelineProps) {
	return (
		<List spacing={9}>
			{data
				? data.publications.map((e) => (
						<ListItem key={e.id}>
							<TimelineCard record={e} />
						</ListItem>
				  ))
				: range(5).map((i) => (
						<ListItem key={i}>
							<TimelineCardSkeleton />
						</ListItem>
				  ))}
		</List>
	)
}
