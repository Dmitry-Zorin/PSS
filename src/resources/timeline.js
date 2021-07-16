import { CardContent, Typography } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import { makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'
import React from 'react'
import { ListController, Title } from 'react-admin'
import { Link } from 'react-router-dom'

const sort = {
	field: 'firstCreationDate',
	order: 'DESC',
}

const useStyles = makeStyles(theme => (
	{
		container: {
			alignSelf: 'center',
			width: '100%',
			maxWidth: 900,
		},
		card: {
			marginBottom: theme.spacing(3),
		},
	}
))

export const Timeline = (props) => {
	const classes = useStyles()
	
	return (
		<ListController {...{ ...props, sort }}>
			{({ data, ids, page, perPage, total, setPage }) => (
				<>
					<Title title={`События${page > 1 ? (': страница ' + page) : ''}`}/>
					<div className={classes.container}>
						{ids.map(id => (
							<CardView key={id} event={data[id]}/>
						))}
						{total > perPage && (
							<Pagination
								page={page}
								count={Math.ceil(total / perPage)}
								onChange={(event, value) => setPage(value)}
							/>
						)}
						{!total && (
							<Typography>
								Результатов не найдено
							</Typography>
						)}
					</div>
				</>
			)}
		</ListController>
	)
}

const genderEndings = {
	feminine: 'a',
	neuter: 'o',
	masculine: '',
}

const CardView = ({ event }) => {
	const classes = useStyles()
	
	return (
		<Card className={classes.card}>
			<CardActionArea component={Link} to={`/${event.type}/${event.id}/show`}>
				<CardContent>
					<Box
						display='flex'
						justifyContent='space-between'
						flexWrap='wrap'
						mb={3}
					>
						<Typography>
							<b>{event.translation}</b> добавлен
							{genderEndings[event.wordGender]}
						</Typography>
						<Typography>
							{new Date(event.creationDate).toLocaleString('ru-RU')}
						</Typography>
					</Box>
					<Typography>
						{event.title}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	)
}
