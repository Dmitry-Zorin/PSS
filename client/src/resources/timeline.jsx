import Pagination from '@mui/lab/Pagination'
import { CardContent, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import React from 'react'
import { ListController, Title } from 'react-admin'
import { Link } from 'react-router-dom'

const sort = {
	field: 'createdAt',
	order: -1,
}

export const Timeline = (props) => (
	<ListController {...{ ...props, sort }}>
		{({ data, ids, page, perPage, total, setPage }) => (
			<>
				<Title title={`События${page > 1 ? (': страница ' + page) : ''}`}/>
				<Box
					sx={{
						alignSelf: 'center',
						width: '100%',
						maxWidth: 900,
					}}
				>
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
				</Box>
			</>
		)}
	</ListController>
)

const genderEndings = {
	feminine: 'a',
	neuter: 'o',
	masculine: '',
}

const CardView = ({ event }) => (
	<Card sx={{ mb: 3 }}>
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
