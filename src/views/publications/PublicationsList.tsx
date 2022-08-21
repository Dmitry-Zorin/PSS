import { List } from '@chakra-ui/react'
import { Pagination } from 'components'
import { GetPublicationsResponse } from 'server/services/publication'
import PublicationsListItem from './PublicationsListItem'

interface PublicationsListProps {
	data: GetPublicationsResponse
}

export default function PublicationsList({ data }: PublicationsListProps) {
	return (
		<>
			<List borderBottom="1px" borderColor="border" pt={4}>
				{data.records.map((e) => (
					<PublicationsListItem key={e.id} record={e} />
				))}
			</List>
			<Pagination total={data?.total} />
		</>
	)
}
