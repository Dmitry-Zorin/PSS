import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	Pagination,
	Typography,
} from '@mui/material'
import { Title } from 'components/Title'
import pluralize from 'pluralize'
import {
	ListBase,
	useListContext,
	useLocaleState,
	useTranslate,
} from 'react-admin'
import { Link } from 'react-router-dom'

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

const TimelineUI = () => {
	const { data, page, perPage, total, setPage } = useListContext()
	const translate = useTranslate()

	return (
		<>
			{total ? (
				<Box alignSelf="center" width="100%" maxWidth={900}>
					{data.map((e) => (
						<CardView key={e.id} event={e} />
					))}
				</Box>
			) : (
				<Typography sx={{ m: 'auto', mt: 3 }}>
					{translate('ra.navigation.no_results')}
				</Typography>
			)}
			{total > perPage && (
				<Pagination
					sx={{ m: 'auto', mt: 3 }}
					page={page}
					count={Math.ceil(total / perPage)}
					onChange={(_, value) => setPage(value)}
				/>
			)}
		</>
	)
}

export const Timeline = () => (
	<ListBase>
		<Title />
		<TimelineUI />
	</ListBase>
)
