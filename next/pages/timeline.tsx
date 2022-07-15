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
import { createElement, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { MainArea } from '~/components'
import resources from '~/resources'

export const handle = {
	i18n: ['common', 'resources'],
}

interface ResourceItem {
	id: string
	createdAt: string
	resource: string
	title: string
	description: string
}

const ListItemCard = ({ record }: { record: ResourceItem }) => {
	const { t, i18n } = useTranslation('resources')
	const resource = record.resource
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
						<Avatar variant="rounded" sx={{ bgcolor: 'primary.main' }}>
							{createElement(resources[resource].icon)}
						</Avatar>
					}
					title={t(`resources.${resource}.name`, { smart_count: 1 })}
					subheader={new Date(record.createdAt).toLocaleString(i18n.language, {
						day: 'numeric',
						month: 'long',
						year: 'numeric',
					})}
					action={
						<Fade in={showViewButton} timeout={300}>
							<Button startIcon={<Visibility />} disabled>
								{t('actions.show')}
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

const Timeline = () => {
	const { t } = useTranslation()

	return (
		<MainArea>
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
				<Typography>{t('navigation.no_results')}</Typography>
			)}
		</MainArea>
	)
}

export default Timeline
