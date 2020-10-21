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
	const [author, setAuthor] = useState('горшков')

	const generateForm = () => {
		dataProvider.getList('articles', {
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
			.then(({ data }) => {
				const doc = new Document()

				doc.addSection({
					properties: {},
					children: [
						new Paragraph({
							text: 'СПИСОК',
							heading: HeadingLevel.HEADING_2,
							alignment: AlignmentType.CENTER
						}),
						new Paragraph({
							text: 'научных и учебно-методических работ',
							heading: HeadingLevel.HEADING_3,
							alignment: AlignmentType.CENTER
						}),
						new Paragraph({
							children: [
								new TextRun({
									text: name.split(' ')[0],
									allCaps: true
								}),
								new TextRun({
									text: ` ${name.split(' ').slice(1).join(' ')}`
								})
							],
							heading: HeadingLevel.HEADING_3,
							alignment: AlignmentType.CENTER
						}),
						new Table({
							rows: [
								new TableRow({
									children: [
										new TableCell({
											children: [new Paragraph('№ п/п')],
											width: {
												size: 1,
												type: WidthType.DXA
											}
										}),
										new TableCell({
											children: [new Paragraph('Наименование работы, ее вид')]
										}),
										new TableCell({
											children: [new Paragraph('Характер работы')],
											width: {
												size: 1,
												type: WidthType.DXA
											}
										}),
										new TableCell({
											children: [new Paragraph('Выходные данные')]
										}),
										new TableCell({
											children: [new Paragraph('Объем в п.л. или с.')],
											width: {
												size: 1,
												type: WidthType.DXA
											}
										}),
										new TableCell({
											children: [new Paragraph('Соавторы')]
										})
									]
								}),
								new TableRow({
									children: [
										new TableCell({
											children: [new Paragraph('1')]
										}),
										new TableCell({
											children: [new Paragraph('2')]
										}),
										new TableCell({
											children: [new Paragraph('3')]
										}),
										new TableCell({
											children: [new Paragraph('4')]
										}),
										new TableCell({
											children: [new Paragraph('5')]
										}),
										new TableCell({
											children: [new Paragraph('6')]
										})
									]
								}),
								...data.map((e, i) => (
									new TableRow({
										children: [
											new TableCell({
												children: [new Paragraph(i.toString())]
											}),
											new TableCell({
												children: [new Paragraph(e.headline)]
											}),
											new TableCell({
												children: [new Paragraph('Печатн.')]
											}),
											new TableCell({
												children: [new Paragraph('')]
											}),
											new TableCell({
												children: [new Paragraph('')]
											}),
											new TableCell({
												children: [new Paragraph(e.authors.map(a => a.author).join('\n'))]
											})
										]
									})
								))
							],
							width: {
								size: 100,
								type: WidthType.PERCENTAGE
							}
						})
					]
				})

				Packer.toBlob(doc).then(blob => {
					saveAs(blob, 'Справка (форма 16).docx')
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
					label="Автор"
					variant="filled"
					value={author}
					onChange={e => setAuthor(e.target.value)}
				/>
				<Button className={styles.button} variant='contained' onClick={generateForm}>
					СОЗДАТЬ СПРАВКУ
				</Button>
			</form>
		</>
	)
}