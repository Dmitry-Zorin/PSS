import { Visibility } from '@mui/icons-material'
import {
	Avatar,
	Box,
	Button,
	Card,
	CardActionArea,
	CardContent,
	CardHeader,
	Fade,
	Pagination,
	Typography,
} from '@mui/material'
import { MainArea, Title } from 'components'
import { createElement, useState } from 'react'
import {
	ListBase,
	ResourceDefinitions,
	useListContext,
	useLocaleState,
	useResourceDefinitions,
	useTranslate,
} from 'react-admin'
import { Link } from 'react-router-dom'

interface ResourceItem {
	id: string
	createdAt: string
	resource: keyof ResourceDefinitions
	title: string
	description: string
}

const ListCard = ({ record }: { record: ResourceItem }) => {
	const translate = useTranslate()
	const [locale] = useLocaleState()
	const resource = record.resource
	const resources = useResourceDefinitions()
	const [showViewButton, setShowViewButton] = useState(false)

	return (
		<Card sx={{ mt: 3 }}>
			<CardActionArea
				component={Link}
				to={`/${resource}/${record.id}/show`}
				onMouseOver={() => setShowViewButton(true)}
				onMouseLeave={() => setShowViewButton(false)}
			>
				<CardHeader
					avatar={
						<Avatar sx={{ bgcolor: 'primary.main' }}>
							{createElement(resources[resource].icon)}
						</Avatar>
					}
					title={translate(`resources.${resource}.name`, { smart_count: 1 })}
					subheader={new Date(record.createdAt).toLocaleString(locale, {
						day: 'numeric',
						month: 'long',
						year: 'numeric',
					})}
					action={
						<Fade in={showViewButton}>
							<Button startIcon={<Visibility />} disabled>
								{translate('ra.action.show')}
							</Button>
						</Fade>
					}
				/>
				<CardContent>
					<Typography>{record.title}</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	)
}

const TimelineList = () => {
	const { data, page, perPage, total, setPage } = useListContext<ResourceItem>()
	const translate = useTranslate()

	return (
		<Box sx={{ pt: 3 }}>
			{total ? (
				<>
					{data.map((e) => (
						<ListCard key={e.id} record={e} />
					))}
					{total > perPage && (
						<Pagination
							variant="outlined"
							color="primary"
							page={page}
							count={Math.ceil(total / perPage)}
							sx={{
								mt: 6,
								ul: {
									justifyContent: 'center',
								},
							}}
							onChange={(_, value) => setPage(value)}
						/>
					)}
				</>
			) : (
				<Typography>{translate('ra.navigation.no_results')}</Typography>
			)}
		</Box>
	)
}

const Timeline = () => (
	<ListBase perPage={10} disableAuthentication>
		<MainArea>
			<Title />
			<TimelineList />
		</MainArea>
	</ListBase>
)

export default Timeline
