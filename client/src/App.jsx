import entries from 'just-entries'
import mapValues from 'just-map-values'
import React from 'react'
import { Admin, Resource } from 'react-admin'
import MyLayout from './layout/MyLayout'
import Lazy from './Lazy'
import authProvider, { user } from './providers/authProvider'
import dataProvider from './providers/dataProvider'
import i18nProvider from './providers/i18nProvider'
import * as resources from './resources/index'

const getLazy = (components) => (
	mapValues(components, (value) => (
		(props) => <Lazy component={value} {...props}/>
	))
)

const App = () => {
	const { theme } = user || {}
	
	const themeReducer = (state = theme || 'light', action) => {
		if (action.type === 'CHANGE_THEME') {
			return action.payload
		}
		return state
	}
	
	return (
		<Admin
			title='metadata.title'
			layout={MyLayout}
			i18nProvider={i18nProvider}
			dataProvider={dataProvider}
			authProvider={authProvider}
			customReducers={{ theme: themeReducer }}
			{...getLazy({
				dashboard: () => import('./DashBoard'),
			})}
		>
			{(permissions) => (
				entries({ ...resources }).map(([name, props]) => {
					const { list, show, create, edit, ...otherProps } = props
					return (
						<Resource
							key={name}
							name={name}
							{...getLazy({ list, show })}
							{...permissions && getLazy({ create, edit })}
							{...otherProps}
						/>
					)
				})
			)}
		</Admin>
	)
}

export default App
