import {Card, CardContent} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import AccountTreeIcon from '@material-ui/icons/AccountTree'
import {Resizable} from 're-resizable'
import React, {useEffect, useState} from 'react'
import {FilterList, FilterListItem} from 'react-admin'
import dataProvider from '../../DataProvider'

const useStyles = makeStyles(theme => (
    {
        container: {
            [theme.breakpoints.up('sm')]: {
                order: -1,
                marginRight: '0.5em',
            },
            [theme.breakpoints.down('sm')]: {
                display: 'none',
            }
        }
    }
))

const getSubdivisions = () => (
    dataProvider.getList('subdivisions', {
        filter: {},
        sort: {},
        pagination: {page: 1, perPage: 999}
    })
)

export const Aside = () => {
    const styles = useStyles()

    const [subdivisions, setSubdivisions] = useState()

    useEffect(() => {
        if (!subdivisions) {
            setSubdivisions([])
            getSubdivisions().then(res => {
                setSubdivisions(res.data)
            })
        }
    })

    return (
        <Resizable
            className={styles.container}
            defaultSize={{width: 360}}
            minWidth={230}
            enable={{right: true}}
        >
            <Card>
                <CardContent>
                    <FilterList
                        label='ra.resources.subdivisions.name'
                        icon={<AccountTreeIcon/>}
                    >
                        {subdivisions && subdivisions.map(s => (
                            <FilterListItem
                                key={s.id}
                                label={s.name}
                                value={{subdivisions: s.id}}
                            />
                        ))}
                    </FilterList>
                </CardContent>
            </Card>
        </Resizable>
    )
}
