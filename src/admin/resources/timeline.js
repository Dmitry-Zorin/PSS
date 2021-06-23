import {Typography} from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import {makeStyles} from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'
import React from 'react'
import {ListController, Title} from 'react-admin'
import {Link} from 'react-router-dom'

const sort = {
    field: 'firstCreationDate',
    order: 'DESC'
}

const useStyles = makeStyles(theme => (
    {
        list: {
            maxWidth: 900,
            margin: '0 auto'
        },
        card: {
            marginLeft: 0,
            marginBottom: 20
        },
        padding: {
            padding: theme.spacing(3)
        },
        margin: {
            margin: '0 auto'
        }
    }
))

export const Timeline = (props) => {
    const styles = useStyles()

    return (
        <ListController {...{...props, sort}}>
            {({data, ids, page, perPage, total, setPage}) => (
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
                </>
            )}
        </ListController>
    )
}

const genderEndings = {
    feminine: 'a',
    neuter: 'o',
    masculine: ''
}

const CardView = ({event}) => {
    const styles = useStyles()

    return (
        <Card key={event.id} className={styles.card}>
            <CardActionArea component={Link} to={`/${event.type}/${event.id}/show`}>
                <ListItem className={styles.padding}>
                    <ListItemText
                        primary={
                            <Box display='flex' flexWrap='wrap' mb={2}>
                                <Box flexGrow={1}>
                                    <b>{event.translation}</b> добавлен
                                    {genderEndings[event.wordGender]}
                                </Box>
                                {new Date(event.creationDate).toLocaleString('ru-RU')}
                            </Box>
                        }
                        secondary={event.title}
                    />
                </ListItem>
            </CardActionArea>
        </Card>
    )
}
