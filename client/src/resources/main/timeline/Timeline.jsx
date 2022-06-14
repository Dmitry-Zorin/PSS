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
	let { data, page, perPage, total, setPage } = useListContext()
	const translate = useTranslate()

	return (
		<Box className="layout-main" sx={{ mt: 3 }}>
			{total ? (
				data.map((e) => <CardView key={e.id} event={e} />)
			) : (
				<Typography>{translate('ra.navigation.no_results')}</Typography>
			)}
			{total > perPage && (
				<Pagination
					page={page}
					count={Math.ceil(total / perPage)}
					onChange={(_, value) => setPage(value)}
				/>
			)}
		</Box>
	)
}

export const Timeline = () => (
	<ListBase>
		<Title />
		<TimelineUI />
	</ListBase>
)
