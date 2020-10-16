import React from 'react'
import { ListController, Title } from 'react-admin'
import Card from '@material-ui/core/Card'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import DescriptionIcon from '@material-ui/icons/Description'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import CardActionArea from '@material-ui/core/CardActionArea'
import Pagination from '@material-ui/lab/Pagination'
import List from '@material-ui/core/List'
import { Typography, useScrollTrigger } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Fab from '@material-ui/core/Fab'
import Zoom from '@material-ui/core/Zoom'
import red from '@material-ui/core/colors/red'

const sort = {
	field: 'firstCreationDate',
	order: 'DESC'
}

const useStyles = makeStyles(theme => ({
	list: {
		maxWidth: 600,
		margin: '0 auto'
	},
	card: {
		marginBottom: 15
	},
	margin: {
		margin: '0 auto'
	},
	fab: {
		color: 'white',
		background: red[500],
		'&:hover': {
			background: red[700]
		}
	},
	fabContainer: {
		position: 'fixed',
		bottom: theme.spacing(3),
		right: theme.spacing(4),
	}
}))

export const Timeline = (props) => {
	const styles = useStyles()

	return (
		<ListController {...{ ...props, sort }}>
			{({ data, ids, page, perPage, total, setPage }) => (
				<>
					<Title title={`События${page > 1 ? (': страница ' + page) : ''}`}/>
					<List className={styles.list}>
						{ids.map(id => (
							<CardView key={id} event={data[id]}/>
						))}
					</List>
					{total > perPage ? (
						<Pagination
							className={styles.margin}
							page={page}
							count={Math.ceil(total / perPage)}
							onChange={(event, value) => setPage(value)}
						/>
					) : (
						<Typography className={styles.margin}>
							Результатов не найдено
						</Typography>
					)}
					<ScrollTopButton/>
				</>
			)}
		</ListController>
	)
}

const CardView = ({ event }) => {
	const styles = useStyles()

	return (
		<Card key={event.id} className={styles.card}>
			<CardActionArea component={Link} to={`/${event.type}/${event.id}/show`}>
				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<DescriptionIcon/>
						</Avatar>
					</ListItemAvatar>
					<ListItemText
						primary={
							<Box display='flex' flexWrap='wrap'>
								<Box flexGrow={1}>
									<strong>
										{event.translation}
									</strong>
									{` добавлена`}
								</Box>
								<Box>
									{new Date(event.creationDate).toLocaleString('ru-RU')}
								</Box>
							</Box>
						}
						secondary={event.title}
					/>
				</ListItem>
			</CardActionArea>
		</Card>
	)
}

const ScrollTopButton = () => {
	const styles = useStyles()
	const trigger = useScrollTrigger()

	const handleClick = (event) => {
		const anchor = (event.target.ownerDocument || document)
			.getElementById('app')

		if (anchor) {
			anchor.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			})
		}
	}

	return (
		<Zoom in={trigger}>
			<div className={styles.fabContainer} onClick={handleClick}>
				<Fab className={styles.fab}>
					<KeyboardArrowUpIcon/>
				</Fab>
			</div>
		</Zoom>
	)
}
