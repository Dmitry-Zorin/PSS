import { List, ListItem } from '@chakra-ui/react'
import { GetPublicationsResponse } from 'server/services/publication'
import TimelineCard from './TimelineCard'

interface TimelineProps {
	data: GetPublicationsResponse
}

export default function Timeline({ data }: TimelineProps) {
	return (
		<List spacing={9}>
			{data.records.map((e) => (
				<ListItem key={e.id}>
					<TimelineCard record={e} />
				</ListItem>
			))}
		</List>
	)
}
