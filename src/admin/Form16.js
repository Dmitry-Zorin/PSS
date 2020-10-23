import Button from '@material-ui/core/Button'
import red from '@material-ui/core/colors/red'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import {
	AlignmentType,
	Document,
	HeadingLevel,
	Packer,
	Paragraph,
	Table,
	TableCell,
	TableRow,
	TextRun,
	VerticalAlign,
	WidthType
} from 'docx'
import { saveAs } from 'file-saver'
import React, { useState } from 'react'
import { Title, useDataProvider } from 'react-admin'

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

	const [name, setName] = useState('Зорина Дмитрия Олеговича')
	const [author, setAuthor] = useState('а. горшков')
	const [title, setTitle] = useState('доктор технических наук, профессор')

	const generateForm = () => {
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
		}).then(res => {
			const publications = res.data.reduce((p, e) => {
				p[e.id] = e.name
				return p
			}, {})

			dataProvider.getList('articles', {
				filter: {
					authors: author.split(' ')[1]
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
				.then(async ({ data }) => {
					data.forEach(e => {
						e.firstCreationDate = new Date(e.firstCreationDate)
					})

					const pages = await Promise.all(data.map(e => (
						fetch(`http://${process.env.HOST}:${process.env.PORT}${e.file.url}`)
							.then(r => r.blob())
							.then(blob => (
								new Promise(resolve => {
									const reader = new FileReader()
									reader.readAsBinaryString(blob)
									reader.onloadend = () => (
										resolve(reader.result.match(/\/Type[\s]*\/Page[^s]/g).length)
									)
								})
							))
					)))

					const doc = new Document({
						styles: {
							tableStyles: [
								{
									id: 'tableStyle',
									name: 'Table Style',
									quickFormat: true,
									paragraph: {
										size: 8
									},
									run: {
										size: 8
									}
								}
							]
						}
					})

					doc.addSection({
						properties: {},
						margins: {
							top: 0,
							right: 500,
							bottom: 0,
							left: 500,
						},
						children: [
							new Paragraph({
								text: 'Форма N 16',
								alignment: AlignmentType.RIGHT
							}),
							new Paragraph({
								alignment: AlignmentType.CENTER,
								heading: HeadingLevel.HEADING_2,
								children: [
									new TextRun({
										text: 'СПИСОК',
										color: '000000'
									})
								]
							}),
							new Paragraph({
								alignment: AlignmentType.CENTER,
								heading: HeadingLevel.HEADING_3,
								children: [
									new TextRun({
										text: 'научных и учебно-методических работ',
										color: '000000'
									})
								]
							}),
							new Paragraph({
								alignment: AlignmentType.CENTER,
								heading: HeadingLevel.HEADING_3,
								children: [
									new TextRun({
										text: name.split(' ')[0],
										color: '000000',
										allCaps: true
									}),
									new TextRun({
										text: ` ${name.split(' ').slice(1).join(' ')}`,
										color: '000000'
									})
								]
							}),
							new Table({
								width: {
									size: 100,
									type: WidthType.PERCENTAGE
								},
								rows: [
									new TableRow({
										children: [
											new TableCell({
												verticalAlign: VerticalAlign.CENTER,
												width: {
													size: 1,
													type: WidthType.DXA
												},
												children: [
													new Paragraph({
														text: '№ п/п',
														alignment: AlignmentType.CENTER
													})
												]
											}),
											new TableCell({
												verticalAlign: VerticalAlign.CENTER,
												children: [
													new Paragraph({
														children: [
															new TextRun('Наименование работы,'),
															new TextRun('ее вид').break()
														],
														alignment: AlignmentType.CENTER
													})
												]
											}),
											new TableCell({
												verticalAlign: VerticalAlign.CENTER,
												width: {
													size: 1,
													type: WidthType.DXA
												},
												children: [
													new Paragraph({
														text: 'Характер работы',
														alignment: AlignmentType.CENTER
													})
												]
											}),
											new TableCell({
												verticalAlign: VerticalAlign.CENTER,
												children: [
													new Paragraph({
														text: 'Выходные данные',
														alignment: AlignmentType.CENTER
													})
												]
											}),
											new TableCell({
												width: {
													size: 1,
													type: WidthType.DXA
												},
												children: [
													new Paragraph({
														text: 'Объем в п.л. или с.',
														alignment: AlignmentType.CENTER
													})
												]
											}),
											new TableCell({
												verticalAlign: VerticalAlign.CENTER,
												children: [
													new Paragraph({
														text: 'Соавторы',
														alignment: AlignmentType.CENTER
													})
												]
											})
										]
									}),
									new TableRow({
										children: [1, 2, 3, 4, 5, 6].map(i => (
											new TableCell({
												children: [
													new Paragraph({
														text: i.toString(),
														alignment: AlignmentType.CENTER
													})
												]
											})
										))
									}),
									new TableRow({
										children: [
											new TableCell({
												columnSpan: 6,
												children: [
													new Paragraph({
														text: 'a) научные работы',
														alignment: AlignmentType.CENTER
													})
												]
											})
										]
									}),
									...data.map((e, i) => (
										new TableRow({
											//tableHeader: true,
											children: [
												new TableCell({
													children: [
														new Paragraph({
															text: (i + 1).toString(),
															alignment: AlignmentType.CENTER
														})
													]
												}),
												new TableCell({
													children: [
														new Paragraph(e.headline)
													]
												}),
												new TableCell({
													children: [
														new Paragraph({
															text: 'Печатн.',
															alignment: AlignmentType.CENTER
														})
													]
												}),
												new TableCell({
													children: [
														new Paragraph(
															`${publications[e.publicationPlace]}, ${e.firstCreationDate.getFullYear()}`
														)
													]
												}),
												new TableCell({
													children: [
														new Paragraph({
															text: pages[i].toString(),
															alignment: AlignmentType.CENTER
														})
													]
												}),
												new TableCell({
													children: e.authors.map(a => a.author)
														.filter(a => !a.match(new RegExp(author.split(' ')[1], 'i')))
														.map(a => (new Paragraph(a)))
												})
											]
										})
									))
								]
							}),
							new Paragraph({
								alignment: AlignmentType.LEFT,
								children: [
									new TextRun({
										text: title
									}).break(),
								]
							}),
							new Paragraph({
								text: `${author.slice(0, 4).toUpperCase()}${author.slice(4)}`,
								alignment: AlignmentType.RIGHT,
							})
						]
					})

					Packer.toBlob(doc).then(blob => {
						saveAs(blob, 'Справка (форма 16).docx')
					})
				})
		})
	}

	return (
		<>
			<Title title='Справка (форма 16)'/>
			<form className={styles.form} noValidate autoComplete="off">
				<TextField
					label="ФИО (в родительном падеже)"
					variant="filled"
					value={name}
					onChange={e => setName(e.target.value)}
				/>
				<TextField
					label="Автор (инициал имени, фамилия)"
					variant="filled"
					value={author}
					onChange={e => setAuthor(e.target.value)}
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