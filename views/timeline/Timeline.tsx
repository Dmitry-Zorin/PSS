import { List, ListItem } from '@chakra-ui/react'
import { range } from 'lodash'
import { inferQueryOutput } from 'utils/trpc'
import { TimelineCard, TimelineCardSkeleton } from 'views/timeline'

interface TimelineProps {
	data?: inferQueryOutput<'publication.list'>
}

export default function Timeline({ data }: TimelineProps) {
	return (
		<List spacing={9}>
			{data
				? data.records.map((e) => (
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
