import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import React, {useState} from 'react'
import {Title, useDataProvider, useNotify} from 'react-admin'
import {createForm16} from '../../utils/form16'

const useStyles = makeStyles(theme => (
    {
        form: {
            maxWidth: 600,
            margin: '0 auto',
            '& > *': {
                width: '100%',
                margin: theme.spacing(1),
            }
        }
    }
))

export const Form16 = () => {
    const styles = useStyles()
    const dataProvider = useDataProvider()
    const notify = useNotify()

    const [lastname, setLastname] = useState('Колузов')
    const [name, setName] = useState('Колузова Андрей Владимирович')
    const [title, setTitle] = useState('Начальник 14 ЛИ')

    const getPublications = () => (
        dataProvider.getList('publications', {
            filter: {},
            sort: {field: 'name', order: 'ASC'},
            pagination: {page: 1, perPage: 999}
        })
    )

    const getCharacters = () => (
        dataProvider.getList('characters', {
            filter: {},
            sort: {field: 'name', order: 'ASC'},
            pagination: {page: 1, perPage: 999}
        })
    )

    const getResource = (resource, author) => (
        dataProvider.getList(resource, {
            filter: {authors: author},
            sort: {field: 'firstCreationDate', order: 'DESC'},
            pagination: {page: 1, perPage: 999}
        })
    )

    const generateForm = async () => {
        const resourceData = new Array(3).fill(null).map(() => ({old: [], new: []}))
        const author = `${lastname} ${name.split(' ')[1][0]}.${name.split(' ')[2][0]}.`
        const date = new Date().getFullYear() - 3

        const publications = await getPublications().then(res => (
            res.data.reduce((p, e) => {
                p[e.id] = e.name
                return p
            }, {})
        ))

        const characters = await getCharacters().then(res => (
            res.data.reduce((p, e) => {
                p[e.id] = e.name
                return p
            }, {})
        ))

        return Promise.all([
                ['articles', 'monographs', 'abstracts', 'dissertations'],
                ['programs', 'patents', 'reports'],
                ['textbooks']
            ].map((docs, i) => (
                Promise.all(docs.map(e => getResource(e, author).then(({data}) => (
                    Promise.all(data.map(e => {
                        e.numberOfPages = e.pages || 3 + 10 * Math.random() | 0
                        e.publicationPlace = publications[e.publicationPlace] || ''
                        e.character = characters[e.character] || '-----'
                    })).then(() => {
                        resourceData[i].old = [
                            ...resourceData[i].old,
                            ...data.filter(e => e.creationDate < date)
                        ]
                        resourceData[i].new = [
                            ...resourceData[i].new,
                            ...data.filter(e => e.creationDate >= date)
                        ]
                        if (!resourceData[i].old.length) {
                            resourceData[i].old = resourceData[i].new
                            resourceData[i].new = []
                        }
                    })
                ))))
            ))
        ).then(() => {
            if (resourceData.every(data => Object.values(data).every(e => !e.length))) {
                return notify('ra.notification.author_not_found')
            }
            createForm16(resourceData, name, author, title)
        })
    }

    return (
        <>
            <Title title='Справка (форма 16)'/>
            <form className={styles.form} autoComplete="off" noValidate>
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
                <Button
                    color='secondary'
                    variant='contained'
                    onClick={generateForm}
                >
                    СОЗДАТЬ СПРАВКУ
                </Button>
            </form>
        </>
    )
}