import { Card, CardContent, Typography } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import React, { useState } from 'react'
import { Title, useDataProvider, useNotify } from 'react-admin'
import { createForm16 } from '../form16'
import { getResourceData } from '../requests.js'

const useStyles = makeStyles(() => (
	{
		form: {
			margin: '0 auto',
			'& > div:not(:last-child)': {
				width: '100%',
				marginBottom: 30,
			},
			'& h5': {
				marginBottom: 45,
			},
			'& button': {
				margin: '0 auto',
				marginTop: 15,
				height: 45,
			},
		},
	}
))

export const Form16 = () => {
	const classes = useStyles()
	const dataProvider = useDataProvider()
	const notify = useNotify()
	
	const [lastname, setLastname] = useState('Зорин')
	const [name, setName] = useState('Зорина Дмитрия Олегович')
	const [title, setTitle] = useState('Доктор технических наук, профессор')
	
	const generateForm = async () => {
		const author = `${lastname} ${name.split(' ')[1][0]}.${name.split(' ')[2][0]}.`
		const resourceData = await getResourceData(dataProvider, notify, author)
		await createForm16(resourceData, name, author, title)
	}
	
	return (
		<Card style={{ margin: '0 auto', width: '100%', maxWidth: 900 }}>
			<CardContent>
				<Title title='Форма №16'/>
				
				<form className={classes.form} autoComplete='off' noValidate>
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
