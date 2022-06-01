import { CardContent, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import Pagination from '@mui/material/Pagination'
import pluralize from 'pluralize'
import React from 'react'
import {
	ListBase,
	Title,
	useListContext,
	useLocaleState,
	useTranslate,
} from 'react-admin'
import { Link } from 'react-router-dom'
import ResourceCounter from './ResourceCounter'

const Timeline = () => (
	<ListBase>
		<ResourceCounter />
		<Inside />
	</ListBase>
)

const Inside = () => {
	const { data, page, perPage, total, setPage } = useListContext()
	return (
		<>
			<Title title="resources.timeline.name" />
			<Box alignSelf="center" width="100%" maxWidth={900}>
				{data?.map((e) => (
					<CardView key={e.id} event={e} />
				))}
			</Box>
			{total > perPage && (
				<Pagination
					sx={{ m: 'auto', mt: 3 }}
					page={page}
					count={Math.ceil(total / perPage)}
					onChange={(event, value) => setPage(value)}
				/>
			)}
			{!total && (
				<Typography sx={{ m: 'auto', mt: 3 }}>
					Результатов не найдено
				</Typography>
			)}
		</>
	)
}

const CardView = ({ event }) => {
	const translate = useTranslate()
	const [locale] = useLocaleState()
	const resource = pluralize(event.resource)

	const resourceItem = translate(`resources.${resource}.name`, {
		smart_count: 1,
	})
	const resourceMessage = translate(`resources.${resource}.created`, {
		_: 'created',
	})

	return (
		<Card sx={{ mt: 3 }}>
			<CardActionArea component={Link} to={`/${resource}/${event.id}/show`}>
				<CardContent>
					<Box
						display="flex"
						justifyContent="space-between"
						flexWrap="wrap"
						mb={3}
					>
						<Typography>
							<strong>{resourceItem}</strong> {resourceMessage}
						</Typography>
						<Typography>
							{new Date(event.createdAt).toLocaleString(locale)}
						</Typography>
					</Box>
					<Typography>{event.title}</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	)
}

export default Timeline
