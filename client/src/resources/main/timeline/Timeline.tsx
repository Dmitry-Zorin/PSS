import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	Pagination,
	Typography,
} from '@mui/material'
import { Title } from 'components'
import { truncate } from 'lodash'
import {
	List,
	ListBase,
	ListProps,
	SimpleList,
	useListContext,
	useLocaleState,
	useTranslate,
} from 'react-admin'
import { Link } from 'react-router-dom'

interface ResourceItem {
	id: string
	createdAt: string
	resource: string
	title: string
	description: string
}

const CardView = ({ item }: { item: ResourceItem }) => {
	const translate = useTranslate()
	const [locale] = useLocaleState()

	const { id, createdAt, resource, title, description } = item

	return (
		<Card sx={{ mt: 3 }}>
			<CardActionArea component={Link} to={`/${resource}/${id}/show`}>
				<CardContent>
					<Box
						display="flex"
						justifyContent="space-between"
						flexWrap="wrap"
						mb={3}
					>
						<Typography>
							<strong>
								{translate(`resources.${resource}.name`, {
									smart_count: 1,
								})}
							</strong>
							{description}
						</Typography>
						<Typography>
							{new Date(createdAt).toLocaleString(locale)}
						</Typography>
					</Box>
					<Typography>{title}</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	)
}

const TimelineUI = () => {
	const { data, page, perPage, total, setPage } = useListContext()
	const translate = useTranslate()

	return (
		<Box className="layout-main" sx={{ mt: 3 }}>
			{total ? (
				data.map((e) => <CardView key={e.id} item={e} />)
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

export const Timeline1 = () => (
	<ListBase>
		<Title />
		<TimelineUI />
	</ListBase>
)

const Timeline = (props: ListProps<ResourceItem>) => (
	<List {...props}>
		<>
			<Title />
			<SimpleList
				linkType={(record, id) => {
					return `/${record.resource}/${id}/show`
				}}
				primaryText={(record: ResourceItem) => record.title}
				secondaryText={(record) => {
					return truncate(record.description, { length: 200 })
				}}
				tertiaryText={(record) => record.createdAt}
			/>
		</>
	</List>
)

export default Timeline
