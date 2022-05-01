import { Card, CardContent, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import React, { useState } from 'react'
import { Title, useDataProvider, useNotify } from 'react-admin'
import { getResourceData } from '../requests'

// const useStyles = makeStyles(() => (
// 	{
// 		form: {
// 			margin: '0 auto',
// 			'& > div:not(:last-child)': {
// 				width: '100%',
// 				marginBottom: 30,
// 			},
// 			'& h5': {
// 				marginBottom: 45,
// 			},
// 			'& button': {
// 				margin: '0 auto',
// 				marginTop: 15,
// 				height: 45,
// 			},
// 		},
// 	}
// ))

const PublicationsList = () => {
	const dataProvider = useDataProvider()
	const notify = useNotify()

	const [lastname, setLastname] = useState('Зорин')
	const [name, setName] = useState('Зорина Дмитрия Олеговича')
	const [title, setTitle] = useState('Доктор технических наук, профессор')

	const generateForm = async () => {
		const { createForm16 } = await import('../form16')
		const author = `${lastname} ${name.split(' ')[1][0]}.${name.split(' ')[2][0]}.`
		const resourceData = await getResourceData(dataProvider, notify, author)
		await createForm16(resourceData, name, author, title)
	}

	return (
		<Card style={{ margin: '0 auto', width: '100%', maxWidth: 900 }}>
			<CardContent>
				<Title title='Форма №16'/>

				<form autoComplete='off' noValidate>
					<Typography
						variant='h5'
						style={{ fontWeight: 'bold', textAlign: 'center' }}
					>
						Форма №16
					</Typography>
					<TextField
						label='Автор (фамилия)'
						variant='filled'
						value={lastname}
						onChange={e => setLastname(e.target.value)}
					/>
					<TextField
						label='ФИО (в родительном падеже)'
						variant='filled'
						value={name}
						onChange={e => setName(e.target.value)}
					/>
					<TextField
						label='Должность'
						variant='filled'
						value={title}
						onChange={e => setTitle(e.target.value)}
						multiline
					/>
					<Box display='flex'>
						<Button
							color='primary'
							variant='contained'
							onClick={generateForm}
						>
							Создать список научных работ
						</Button>
					</Box>
				</form>
			</CardContent></Card>
	)
}

export default PublicationsList
