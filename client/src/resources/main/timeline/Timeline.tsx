import { Visibility } from '@mui/icons-material'
import {
	Avatar,
	Button,
	Card,
	CardActionArea,
	CardContent,
	CardHeader,
	Fade,
	List,
	ListItem,
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

const ListItemCard = ({ record }: { record: ResourceItem }) => {
	const translate = useTranslate()
	const [locale] = useLocaleState()
	const resource = record.resource
	const resources = useResourceDefinitions()
	const [showViewButton, setShowViewButton] = useState(false)

	return (
		<Card sx={{ width: 1 }}>
			<CardActionArea
				component={Link}
				to={`/${resource}/${record.id}/show`}
				onMouseOver={() => setShowViewButton(true)}
				onMouseLeave={() => setShowViewButton(false)}
			>
				<CardHeader
					avatar={
						<Avatar
							variant="rounded"
							sx={{
								// color: 'common.white',
								bgcolor: 'primary.main',
							}}
						>
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
						<Fade in={showViewButton} timeout={300}>
							<Button startIcon={<Visibility />} disabled>
								{translate('ra.action.show')}
							</Button>
						</Fade>
					}
				/>
				<CardContent sx={{ pt: 0 }}>
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
		<>
			{total ? (
				<>
					<List disablePadding sx={{ pt: 2 }}>
						{data.map((e) => (
							<ListItem
								key={e.id}
								disablePadding
								sx={{
									py: {
										sm: 1,
										md: 1.5,
									},
								}}
							>
								<ListItemCard record={e} />
							</ListItem>
						))}
					</List>
					{total > perPage && (
						<Pagination
							variant="outlined"
							color="primary"
							page={page}
							count={Math.ceil(total / perPage)}
							sx={{
								mt: 4,
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
		</>
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
