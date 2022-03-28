import AccountTreeIcon from '@mui/icons-material/AccountTree'
import { Card, CardContent, useTheme } from '@mui/material'
import { Resizable } from 're-resizable'
import React, { useEffect, useState } from 'react'
import { FilterList, FilterListItem } from 'react-admin'
import dataProvider from '../../providers/dataProvider'

const getSubdivisions = () => (
	dataProvider.getList('subdivisions', {
		filter: {},
		sort: { field: 'firstCreationDate', order: 'ASC' },
		pagination: { page: 1, perPage: 999 },
	})
)

export const Aside = () => {
	const theme = useTheme()
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
			defaultSize={{ width: 475 }}
			minWidth={400}
			enable={{ right: true }}
			sx={{
				[theme.breakpoints.up('sm')]: {
					order: -1,
					marginRight: '0.5em',
				},
				[theme.breakpoints.down('sm')]: {
					display: 'none',
				},
			}}
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
								value={{ subdivisions: s.id }}
							/>
						))}
					</FilterList>
				</CardContent>
			</Card>
		</Resizable>
	)
}
