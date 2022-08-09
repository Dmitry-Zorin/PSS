import { List, ListItem } from '@chakra-ui/react'
import { inferQueryOutput } from 'utils/trpc'
import TimelineCard from './TimelineCard'

interface TimelineProps {
	data: inferQueryOutput<'publication.list'>
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
