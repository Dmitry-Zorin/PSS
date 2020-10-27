import Button from '@material-ui/core/Button'
import red from '@material-ui/core/colors/red'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import React, { useState } from 'react'
import { Title, useDataProvider, useNotify } from 'react-admin'
import { countPages } from '../utils/fileReader'
import { createForm16 } from '../utils/form16'

const useStyles = makeStyles(theme => ({
	form: {
		maxWidth: 600,
		margin: '0 auto',
		'& > *': {
			width: '100%',
			margin: theme.spacing(1),
		}
	},
	button: {
		color: 'white',
		background: red[500],
		'&:hover': {
			background: red[700]
		}
	}
}))

export const Form16 = () => {
	const styles = useStyles()
	const dataProvider = useDataProvider()
	const notify = useNotify()

	const [lastname, setLastname] = useState('горшков')
	const [name, setName] = useState('горшкова с н')
	const [title, setTitle] = useState('старший оператор 4 научной роты ФГАУ ВИТ "ЭРА"')

	const getPublications = () => (
		dataProvider.getList('publications', {
			filter: {},
			sort: {
				field: 'name',
				order: 'ASC'
			},
			pagination: {
				page: 1,
				perPage: 999
			}
		})
	)

	const getResource = (resource, author) => (
		dataProvider.getList(resource, {
			filter: {
				authors: author
			},
			sort: {
				field: 'firstCreationDate',
				order: 'DESC'
			},
			pagination: {
				page: 1,
				perPage: 999
			}
		})
	)

	const generateForm = () => {
		const resourceData = { old: [], new: [] }
		const author = `${lastname} ${name.split(' ')[1][0]}.${name.split(' ')[2][0]}.`
		const date = new Date()

		date.setFullYear(date.getFullYear() - 3)

		getPublications().then(res => {
			const publications = res.data.reduce((p, e) => {
				p[e.id] = e.name
				return p
			}, {})

			Promise.all([
					'articles',
					//'researches'
				].map(e => (
					getResource(e, author).then(({ data }) => (
						Promise.all(data.map(async e => {
							e.firstCreationDate = new Date(e.firstCreationDate)
							e.numberOfPages = await countPages(e.file.url)
							e.publicationPlace = publications[e.publicationPlace] || ''
						})).then(() => {
							resourceData.old = [
								...resourceData.old,
								...data.filter(e => e.firstCreationDate < date)
							]
							resourceData.new = [
								...resourceData.new,
								...data.filter(e => e.firstCreationDate >= date)
							]
						})
					))
				))
			).then(() => {
				if (Object.values(resourceData).every(e => !e.length)) {
					return notify('Автор не найден!')
				}
				createForm16(resourceData, name, author, title)
			})
		})
	}

	return (
		<>
			<Title title='Справка (форма 16)'/>
			<form className={styles.form} noValidate autoComplete="off">
				<TextField
					label="Автор (фамилия)"
					variant="filled"
					value={lastname}
					onChange={e => setLastname(e.target.value)}
				/>
				<TextField
					label="ФИО (в родительном падеже)"
					variant="filled"
					value={name}
					onChange={e => setName(e.target.value)}
				/>
				<TextField
					label="Звание"
					variant="filled"
					value={title}
					onChange={e => setTitle(e.target.value)}
				/>
				<Button className={styles.button} variant='contained' onClick={generateForm}>
					СОЗДАТЬ СПРАВКУ
				</Button>
			</form>
		</>
	)
}