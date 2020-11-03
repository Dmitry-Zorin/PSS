import { Card, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AccountTreeIcon from '@material-ui/icons/AccountTree'
import React, { useEffect, useState } from 'react'
import { FilterList, FilterListItem } from 'react-admin'
import dataProvider from '../../DataProvider'

const useStyles = makeStyles(theme => ({
	card: {
		[theme.breakpoints.up('sm')]: {
			order: -1,
			width: '25vw',
			minWidth: '20em',
			marginRight: '1em',
		},
		[theme.breakpoints.down('sm')]: {
			display: 'none',
		}
	}
}))

const getSubdivisions = () => (
	dataProvider.getList('subdivisions', {
		filter: {},
		sort: {},
		pagination: {
			page: 1,
			perPage: 999
		}
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
		<Card className={styles.card}>
			<CardContent>
				<FilterList
					label='ra.resources.subdivisions.name'
					icon={<AccountTreeIcon />}
				>
					{subdivisions && subdivisions.map(s => (
						<FilterListItem
							key={s.id}
							label={s.name}
							value={{ subdivisions: s.id }}
						/>
					))}
				</FilterList>
			</CardContent>
		</Card>
	)
}
