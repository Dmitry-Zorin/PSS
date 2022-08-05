import { List, ListItem } from '@chakra-ui/react'
import { Publication } from '@prisma/client'
import { range } from 'lodash'
import { GetListResponse } from 'types'
import { TimelineCard, TimelineCardSkeleton } from 'views/timeline'

interface TimelineProps {
	data?: GetListResponse<Publication>
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
